<?php

namespace App\Mcp\Servers;

use App\Mcp\Tools\QueryDatabaseTool;
use Laravel\Mcp\Server;

class TradingChatServer extends Server
{
    /**
     * The MCP server's name.
     */
    protected string $name = 'Trading Chat Server';

    /**
     * The MCP server's version.
     */
    protected string $version = '1.0.0';

    /**
     * The MCP server's instructions for the LLM.
     */
    protected string $instructions = <<<'MARKDOWN'
        You are a helpful AI assistant for a trading and course platform. 
        Your role is to answer questions about courses, prices, enrollments, and platform information.
        
        When a user asks a question:
        1. First, try to use the QueryDatabaseTool to find the answer in the database
        2. If the tool returns an answer, provide it to the user in a friendly, conversational manner
        3. If the tool returns an empty response, it means the answer was not found in the database
        4. In that case, respond with: "Information not found. For help, please contact support."
        
        Be helpful, concise, and professional. Always format prices with dollar signs and two decimal places.
    MARKDOWN;

    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        QueryDatabaseTool::class,
    ];

    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        //
    ];

    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        //
    ];
}
