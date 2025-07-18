import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import { generateMedicalResponse } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/MainLayout";
import {
  Send,
  User,
  Bot,
  Loader2,
  AlertTriangle,
  Sparkles,
  Heart,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function Chat() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Nina, your personal healthcare assistant. I'm here to help analyze your symptoms and provide health insights. Please describe what symptoms you're experiencing, and I'll ask follow-up questions to better understand your situation.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // Get conversation history for context
      const conversationHistory = messages
        .slice(-6) // Last 6 messages for context
        .map(
          (msg) => `${msg.type === "user" ? "User" : "Nina"}: ${msg.content}`,
        );

      const response = await generateMedicalResponse(
        input,
        conversationHistory,
      );

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);
        return [
          ...newMessages,
          {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: response,
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);
        return [
          ...newMessages,
          {
            id: (Date.now() + 3).toString(),
            type: "bot",
            content:
              "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Nina</h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Healthcare Assistant
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-muted/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3 group",
                message.type === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : "",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md",
                  message.type === "user"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                    : "bg-gradient-to-br from-green-500 to-emerald-400",
                )}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md",
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                )}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      Analyzing...
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p
                        className={cn(
                          "text-xs",
                          message.type === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      {message.type === "bot" && (
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card p-6">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms or ask a health question..."
                className="pr-12 min-h-[44px] resize-none rounded-xl border-2 focus:border-primary transition-all duration-300"
                disabled={isTyping}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Heart className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="h-[44px] w-[44px] p-0 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              )}
            </Button>
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs text-muted-foreground">
            <AlertTriangle className="w-3 h-3" />
            <span>
              This is for informational purposes only. Always consult healthcare
              professionals for medical advice.
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
