# AI Chat Component Setup

## Overview
An AI Chat component has been added to the web layout with a floating button in the bottom right corner and a chat interface that opens with animation.

## Features

### 1. Floating Chat Button
- Located in bottom right corner
- Uses Bot icon from lucide-react
- Has a color flash animation (pulse + flash effect)
- Smooth scale animation when opening/closing

### 2. Chat Interface
- Opens with a round animation from bottom right corner
- Dark theme matching the application design
- Chat header with AI Assistant branding
- Message history with timestamps
- Input field with send button
- Loading states during API calls
- Auto-scroll to latest message

### 3. ChatGPT Integration
- Backend API endpoint: `/api/chat`
- Uses OpenAI API (GPT-3.5-turbo by default)
- Maintains conversation history
- Error handling and user feedback

## Files Created/Modified

### Frontend
- `resources/js/components/AIChat.tsx` - Main chat component
- `resources/js/layouts/web-layout.tsx` - Added AIChat component
- `resources/views/app.blade.php` - Added CSRF token meta tag

### Backend
- `app/Http/Controllers/Api/ChatController.php` - Chat API controller
- `routes/web.php` - Added API route
- `config/services.php` - Added OpenAI configuration

## Configuration

### Environment Variables
Add these to your `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

You can get an API key from: https://platform.openai.com/api-keys

### Optional Configuration
- Change the model in `.env` (e.g., `gpt-4`, `gpt-4-turbo`)
- Adjust `max_tokens` in `ChatController.php` (currently 500)
- Modify `temperature` in `ChatController.php` (currently 0.7)

## Usage

1. The chat button appears automatically on all pages using `WebLayout`
2. Click the Bot icon to open the chat interface
3. Type a message and press Enter or click Send
4. The AI will respond based on the conversation history
5. Click the X button to close the chat

## Customization

### Styling
- Button colors: Modify `from-red-600 to-red-700` classes
- Chat window size: Change `h-[600px] w-[400px]` classes
- Animation speed: Adjust `duration-300` values

### System Prompt
Edit the system message in `ChatController.php`:
```php
'content' => 'You are a helpful AI assistant for a trading and course platform. Be friendly, concise, and helpful.',
```

## API Endpoint

**POST** `/api/chat`

**Request Body:**
```json
{
    "message": "User message here",
    "conversation_history": [
        {
            "role": "user",
            "content": "Previous message"
        },
        {
            "role": "assistant",
            "content": "Previous response"
        }
    ]
}
```

**Response:**
```json
{
    "message": "AI response here"
}
```

## Notes

- The chat maintains conversation history for context
- CSRF protection is enabled
- API calls timeout after 30 seconds
- Errors are logged for debugging
- The component is responsive and works on mobile devices

