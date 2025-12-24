import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! How can I help you today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversation_history: messages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message || 'Sorry, I could not process your request.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                    isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{
                    animation: isOpen
                        ? 'none'
                        : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, flash 3s ease-in-out infinite',
                }}
            >
                <Bot className="h-6 w-6" />
            </button>

            {/* Flash Animation Styles */}
            <style>{`
                @keyframes flash {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(237, 0, 0, 0.7);
                    }
                    50% {
                        box-shadow: 0 0 0 10px rgba(237, 0, 0, 0);
                    }
                }
            `}</style>

            {/* Chat Interface */}
            <div
                className={`fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl bg-[#121212] border-2 border-[#ffffff36] shadow-2xl transition-all duration-300 ${
                    isOpen
                        ? 'scale-100 opacity-100'
                        : 'scale-0 opacity-0 pointer-events-none'
                }`}
                style={{
                    transformOrigin: 'bottom right',
                }}
            >
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-[#363636] bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">AI Assistant</h3>
                            <p className="text-xs text-white/80">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full p-1.5 text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.role === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                    message.role === 'user'
                                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                                        : 'bg-[#2a2a2a] text-white'
                                }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">
                                    {message.content}
                                </p>
                                <p className="text-xs mt-1 opacity-70">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#2a2a2a] rounded-2xl px-4 py-2">
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-[#363636] p-4">
                    <div className="flex gap-2">
                        <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="flex-1 bg-[#2a2a2a] border-[#363636] text-white placeholder:text-gray-500 focus:border-red-500"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

