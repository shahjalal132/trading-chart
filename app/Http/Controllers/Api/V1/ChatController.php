<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Handle chat requests and forward to ChatGPT API.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'conversation_history' => 'nullable|array',
        ]);

        $apiKey = config('services.openai.api_key');
        
        if (!$apiKey) {
            return response()->json([
                'message' => 'ChatGPT API key is not configured. Please set OPENAI_API_KEY in your .env file.',
            ], 500);
        }

        try {
            // Prepare conversation history
            $messages = [];
            
            // Add system message
            $messages[] = [
                'role' => 'system',
                'content' => 'You are a helpful AI assistant for a trading and course platform. Be friendly, concise, and helpful.',
            ];

            // Add conversation history if provided
            if ($request->has('conversation_history') && is_array($request->conversation_history)) {
                foreach ($request->conversation_history as $history) {
                    if (isset($history['role']) && isset($history['content'])) {
                        $messages[] = [
                            'role' => $history['role'],
                            'content' => $history['content'],
                        ];
                    }
                }
            }

            // Add current user message
            $messages[] = [
                'role' => 'user',
                'content' => $request->message,
            ];

            // Make request to OpenAI API
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model' => config('services.openai.model', 'gpt-3.5-turbo'),
                'messages' => $messages,
                'max_tokens' => 500,
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                $assistantMessage = $data['choices'][0]['message']['content'] ?? 'Sorry, I could not process your request.';

                return response()->json([
                    'message' => trim($assistantMessage),
                ]);
            }

            Log::error('OpenAI API Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'message' => 'Sorry, I encountered an error processing your request. Please try again.',
            ], 500);

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

