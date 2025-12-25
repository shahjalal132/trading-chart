<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIChatService
{
    /**
     * Analyze user query and determine intent
     */
    public function analyzeQuery(string $query, array $conversationHistory = []): array
    {
        $apiKey = config('services.deepinfra.api_key');

        if (!$apiKey) {
            // Use fallback pattern matching when API key is not set
            return $this->fallbackAnalysis($query);
        }

        $systemPrompt = <<<'PROMPT'
You are an AI assistant that analyzes user queries about a trading course platform. 
Your job is to determine what information the user is asking for.

Analyze the query and respond with a JSON object containing:
- "intent": One of: "course_count", "course_details", "course_list", "course_price", "course_reviews", "course_search", "general"
- "needs_database": true/false - whether database query is needed
- "search_term": (optional) any specific course name or term to search for
- "query_type": One of: "count", "details", "list", "price", "reviews", "search", "general"

Examples:
- "How many courses?" -> {"intent": "course_count", "needs_database": true, "query_type": "count"}
- "Give me details" -> {"intent": "course_details", "needs_database": true, "query_type": "details"}
- "How was the course?" -> {"intent": "course_reviews", "needs_database": true, "query_type": "reviews"}
- "What courses do you have?" -> {"intent": "course_list", "needs_database": true, "query_type": "list"}
- "What is the price?" -> {"intent": "course_price", "needs_database": true, "query_type": "price"}

Only respond with valid JSON, no other text.
PROMPT;

        try {
            $messages = [
                ['role' => 'system', 'content' => $systemPrompt],
            ];

            // Add conversation history for context
            if (!empty($conversationHistory)) {
                foreach ($conversationHistory as $history) {
                    if (isset($history['role']) && isset($history['content'])) {
                        $messages[] = [
                            'role' => $history['role'],
                            'content' => $history['content'],
                        ];
                    }
                }
            }

            $messages[] = ['role' => 'user', 'content' => $query];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post(config('services.deepinfra.url'), [
                'model' => config('services.deepinfra.model', 'meta-llama/Meta-Llama-3.1-8B-Instruct'),
                'messages' => $messages,
                'temperature' => 0.3,
                'max_tokens' => 200,
            ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                $content = trim($content);

                // Remove markdown code blocks if present
                $content = preg_replace('/```json\s*/', '', $content);
                $content = preg_replace('/```\s*/', '', $content);
                $content = trim($content);

                $analysis = json_decode($content, true);

                if (json_last_error() === JSON_ERROR_NONE && is_array($analysis)) {
                    return $analysis;
                }
            }
        } catch (\Exception $e) {
            Log::error('AI Query Analysis Error', [
                'message' => $e->getMessage(),
                'query' => $query,
            ]);
        }

        // Fallback to pattern matching if AI analysis fails or API key not set
        return $this->fallbackAnalysis($query);
    }

    /**
     * Fallback pattern matching when AI is not available
     */
    protected function fallbackAnalysis(string $query): array
    {
        $queryLower = strtolower($query);

        // Course count
        if (preg_match('/how many.*course/i', $queryLower)) {
            return ['intent' => 'course_count', 'needs_database' => true, 'query_type' => 'count'];
        }

        // Course details
        if (preg_match('/(?:give|show|tell|provide).*(?:me|us).*(?:detail|info|information)|detail|information/i', $queryLower)) {
            return ['intent' => 'course_details', 'needs_database' => true, 'query_type' => 'details'];
        }

        // Course list
        if (preg_match('/(?:list|show|what).*course|course.*(?:list|available)/i', $queryLower)) {
            return ['intent' => 'course_list', 'needs_database' => true, 'query_type' => 'list'];
        }

        // Price questions
        if (preg_match('/price|pricing|cost/i', $queryLower)) {
            return ['intent' => 'course_price', 'needs_database' => true, 'query_type' => 'price'];
        }

        // Reviews/ratings
        if (preg_match('/(?:how|what).*(?:was|is).*(?:course|it)|review|rating/i', $queryLower)) {
            return ['intent' => 'course_reviews', 'needs_database' => true, 'query_type' => 'reviews'];
        }

        // Default to details if asking about courses generally
        if (preg_match('/course/i', $queryLower)) {
            return ['intent' => 'course_details', 'needs_database' => true, 'query_type' => 'details'];
        }

        return ['intent' => 'general', 'needs_database' => false, 'query_type' => 'general'];
    }

    /**
     * Query database based on intent
     */
    public function queryDatabase(array $analysis): ?string
    {
        $queryType = $analysis['query_type'] ?? 'general';
        $searchTerm = $analysis['search_term'] ?? null;

        try {
            switch ($queryType) {
                case 'count':
                    $count = Course::whereNotNull('published_at')->count();
                    return "We currently have {$count} published course(s) available.";

                case 'list':
                    $courses = Course::whereNotNull('published_at')
                        ->orderBy('title')
                        ->limit(20)
                        ->get(['id', 'title', 'price', 'rating', 'total_reviews']);

                    if ($courses->isEmpty()) {
                        return 'No published courses available at the moment.';
                    }

                    // Format as markdown table
                    $table = "| Course Title | Price | Rating | Reviews |\n";
                    $table .= "|--------------|-------|--------|----------|\n";
                    $courseList = $courses->map(function ($course) {
                        return "| {$course->title} | **$" . number_format($course->price, 2) . "** | `{$course->rating}/5.0` | {$course->total_reviews} |";
                    })->implode("\n");

                    return "Here are our available courses:\n\n{$table}\n{$courseList}";

                case 'details':
                    // Get a few courses with full details
                    $courses = Course::whereNotNull('published_at')
                        ->with('author')
                        ->limit(5)
                        ->get();

                    if ($courses->isEmpty()) {
                        return 'No published courses available at the moment.';
                    }

                    $details = $courses->map(function ($course) {
                        $info = "**{$course->title}**\n";
                        $info .= "Price: $" . number_format($course->price, 2) . "\n";
                        $info .= "Rating: {$course->rating}/5.0 ({$course->total_reviews} reviews)\n";
                        if ($course->description) {
                            $info .= "Description: " . substr($course->description, 0, 300) . "...\n";
                        }
                        if ($course->start_date) {
                            $info .= "Start Date: " . $course->start_date->format('M d, Y') . "\n";
                        }
                        if ($course->author) {
                            $info .= "Instructor: {$course->author->name}\n";
                        }
                        return $info;
                    })->implode("\n\n");

                    return "Here are some course details:\n\n{$details}";

                case 'price':
                    $courses = Course::whereNotNull('published_at')
                        ->orderBy('price', 'asc')
                        ->get(['id', 'title', 'price']);

                    if ($courses->isEmpty()) {
                        return 'No published courses with prices available at the moment.';
                    }

                    $lowestPrice = $courses->min('price');
                    $highestPrice = $courses->max('price');
                    $avgPrice = $courses->avg('price');

                    $priceInfo = "## 💰 Pricing Information\n\n";
                    $priceInfo .= "| Metric | Price |\n";
                    $priceInfo .= "|--------|-------|\n";
                    $priceInfo .= "| **Lowest** | `$" . number_format($lowestPrice, 2) . "` |\n";
                    $priceInfo .= "| **Highest** | `$" . number_format($highestPrice, 2) . "` |\n";
                    $priceInfo .= "| **Average** | `$" . number_format($avgPrice, 2) . "` |\n\n";
                    $priceInfo .= "### All Course Prices\n\n";
                    $priceInfo .= "| Course | Price |\n";
                    $priceInfo .= "|--------|-------|\n";
                    $priceList = $courses->map(function ($course) {
                        return "| {$course->title} | **$" . number_format($course->price, 2) . "** |";
                    })->implode("\n");

                    return $priceInfo . $priceList;

                case 'reviews':
                    $courses = Course::whereNotNull('published_at')
                        ->orderBy('total_reviews', 'desc')
                        ->limit(10)
                        ->get(['id', 'title', 'rating', 'total_reviews']);

                    if ($courses->isEmpty()) {
                        return 'No course reviews available at the moment.';
                    }

                    $reviewInfo = "Here's information about our course reviews:\n\n";
                    $reviewList = $courses->map(function ($course) {
                        return "- {$course->title}: {$course->rating}/5.0 rating with {$course->total_reviews} reviews";
                    })->implode("\n");

                    return $reviewInfo . $reviewList;

                case 'search':
                    if ($searchTerm) {
                        $courses = Course::whereNotNull('published_at')
                            ->where(function ($q) use ($searchTerm) {
                                $q->where('title', 'like', "%{$searchTerm}%")
                                    ->orWhere('description', 'like', "%{$searchTerm}%");
                            })
                            ->get();

                        if ($courses->isEmpty()) {
                            return "No courses found matching '{$searchTerm}'.";
                        }

                        $courseInfo = $courses->map(function ($course) {
                            $info = "**{$course->title}**\n";
                            $info .= "Price: $" . number_format($course->price, 2) . "\n";
                            $info .= "Rating: {$course->rating}/5.0 ({$course->total_reviews} reviews)\n";
                            if ($course->description) {
                                $info .= "Description: " . substr($course->description, 0, 200) . "...\n";
                            }
                            return $info;
                        })->implode("\n\n");

                        return $courseInfo;
                    }
                    break;
            }
        } catch (\Exception $e) {
            Log::error('Database Query Error', [
                'message' => $e->getMessage(),
                'analysis' => $analysis,
            ]);
        }

        return null;
    }

    /**
     * Format response using AI for natural language
     */
    public function formatResponse(string $query, ?string $databaseResult, array $conversationHistory = []): string
    {
        $apiKey = config('services.deepinfra.api_key');

        if (!$apiKey || !$databaseResult) {
            return $databaseResult ?? 'I apologize, but I could not find that information.';
        }

        $systemPrompt = <<<'PROMPT'
You are a helpful AI assistant for a trading course platform. 
Your job is to provide friendly, natural responses to user questions based on database information.

IMPORTANT: Format your responses using Markdown for better readability:
- Use **bold** for emphasis and important information
- Use `backticks` for code, technical terms, or specific values
- Use > for quotes or highlighted information
- Use tables (| column | column |) for structured data like course lists
- Use bullet points (- or *) for lists
- Use ## for section headings when appropriate
- Use --- for horizontal dividers when needed

Rules:
- Be conversational and friendly
- Use the database information provided to answer the question
- Format course information in tables when listing multiple courses
- Use bold for prices, ratings, and key metrics
- Use code backticks for technical terms
- If the database result is empty or null, politely say you couldn't find that information
- Keep responses concise but informative
- Don't make up information that isn't in the database result
PROMPT;

        try {
            $messages = [
                ['role' => 'system', 'content' => $systemPrompt],
            ];

            // Add conversation history for context
            if (!empty($conversationHistory)) {
                foreach (array_slice($conversationHistory, -3) as $history) { // Last 3 messages for context
                    if (isset($history['role']) && isset($history['content'])) {
                        $messages[] = [
                            'role' => $history['role'],
                            'content' => $history['content'],
                        ];
                    }
                }
            }

            $userMessage = "User question: {$query}\n\nDatabase information: {$databaseResult}\n\nProvide a natural, friendly response to the user's question based on this information. Format your response using Markdown (bold, tables, code blocks, quotes) to make it visually appealing and easy to read.";
            $messages[] = ['role' => 'user', 'content' => $userMessage];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post(config('services.deepinfra.url'), [
                'model' => config('services.deepinfra.model', 'meta-llama/Meta-Llama-3.1-8B-Instruct'),
                'messages' => $messages,
                'temperature' => 0.7,
                'max_tokens' => 300,
            ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                return trim($content) ?: $databaseResult;
            }
        } catch (\Exception $e) {
            Log::error('AI Response Formatting Error', [
                'message' => $e->getMessage(),
            ]);
        }

        return $databaseResult;
    }
}
