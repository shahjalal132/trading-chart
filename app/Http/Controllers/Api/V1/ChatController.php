<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\AdminChatNotification;
use App\Services\AIChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    protected AIChatService $aiService;

    public function __construct(AIChatService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Handle chat requests using AI analysis and database queries.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'conversation_history' => 'nullable|array',
        ]);

        try {
            $conversationHistory = $request->input('conversation_history', []);
            $userMessage = $request->input('message');

            // Step 1: Analyze the query to understand user intent
            $analysis = $this->aiService->analyzeQuery($userMessage, $conversationHistory);

            $answer = '';
            $answerFound = false;

            // Step 2: Query database if needed
            if ($analysis['needs_database'] ?? false) {
                $databaseResult = $this->aiService->queryDatabase($analysis);
                
                if ($databaseResult) {
                    // Step 3: Format the response using AI for natural language
                    $answer = $this->aiService->formatResponse($userMessage, $databaseResult, $conversationHistory);
                    $answerFound = !empty(trim($answer));
                }
            } else {
                // For general queries without database needs, use AI directly
                $apiKey = config('services.deepinfra.api_key');
                if ($apiKey) {
                    try {
                        $messages = [
                            ['role' => 'system', 'content' => 'You are a helpful AI assistant for a trading course platform. Be friendly and concise. Format your responses using Markdown (bold, code blocks, tables, quotes) for better readability.'],
                        ];

                        if (!empty($conversationHistory)) {
                            foreach (array_slice($conversationHistory, -5) as $history) {
                                if (isset($history['role']) && isset($history['content'])) {
                                    $messages[] = [
                                        'role' => $history['role'],
                                        'content' => $history['content'],
                                    ];
                                }
                            }
                        }

                        $messages[] = ['role' => 'user', 'content' => $userMessage];

                        $response = \Illuminate\Support\Facades\Http::withHeaders([
                            'Authorization' => 'Bearer ' . $apiKey,
                            'Content-Type' => 'application/json',
                        ])->timeout(30)->post(config('services.deepinfra.url'), [
                            'model' => config('services.deepinfra.model', 'meta-llama/Meta-Llama-3.1-8B-Instruct'),
                            'messages' => $messages,
                            'temperature' => 0.7,
                            'max_tokens' => 300,
                        ]);

                        if ($response->successful()) {
                            $answer = trim($response->json('choices.0.message.content', ''));
                            $answerFound = !empty($answer);
                        }
                    } catch (\Exception $e) {
                        Log::error('AI Direct Response Error', ['message' => $e->getMessage()]);
                    }
                }
            }

            // Step 4: If answer not found, send notification to admin
            if (!$answerFound) {
                $answer = "Sorry we couldn't find Contact with a consultant";
                
                // Send notification to admin users
                $adminUsers = User::where('role', 'admin')->get();
                
                // Prepare chat history for notification
                $chatHistory = array_merge($conversationHistory, [
                    [
                        'role' => 'user',
                        'content' => $userMessage,
                    ],
                    [
                        'role' => 'assistant',
                        'content' => $answer,
                    ],
                ]);

                foreach ($adminUsers as $admin) {
                    try {
                        $admin->notify(new AdminChatNotification($chatHistory));
                    } catch (\Exception $e) {
                        Log::error('Failed to send admin notification', [
                            'admin_id' => $admin->id,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }
            }

            return response()->json([
                'message' => $answer,
            ]);
        } catch (\Exception $e) {
            Log::error('Chat Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Sorry, I encountered an error. Please try again later.',
            ], 500);
        }
    }
}
