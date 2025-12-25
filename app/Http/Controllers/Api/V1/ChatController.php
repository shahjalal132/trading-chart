<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mcp\Tools\QueryDatabaseTool;
use App\Models\User;
use App\Notifications\AdminChatNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Mcp\Request as McpRequest;

class ChatController extends Controller
{
    /**
     * Handle chat requests using MCP server.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'conversation_history' => 'nullable|array',
        ]);

        try {
            // Prepare conversation history
            $conversationHistory = $request->input('conversation_history', []);

            // Create MCP request and call the tool directly
            $mcpRequest = new McpRequest(['query' => $request->message]);
            $tool = new QueryDatabaseTool();
            $response = $tool->handle($mcpRequest);

            $answer = '';
            $answerFound = false;

            // Get the content from the response
            $content = $response->content();
            
            // The content is a Text object, convert it to string
            if ($content instanceof \Laravel\Mcp\Server\Content\Text) {
                $answer = (string) $content;
                $answerFound = !empty(trim($answer));
            }

            // If answer not found, send notification to admin
            if (!$answerFound) {
                $answer = "Information not found. For help, please contact support.";
                
                // Send notification to admin users
                $adminUsers = User::where('role', 'admin')->get();
                
                // Prepare chat history for notification
                $chatHistory = array_merge($conversationHistory, [
                    [
                        'role' => 'user',
                        'content' => $request->message,
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
