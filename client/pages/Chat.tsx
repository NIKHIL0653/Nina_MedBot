import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import { generateMedicalResponse } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/MainLayout";
import SymptomSelector from "@/components/SymptomSelector";
import {
  Send,
  User,
  Bot,
  Loader2,
  AlertTriangle,
  Copy,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  options?: string[];
}

export default function Chat() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Nina, your personal healthcare assistant. I'm here to help analyze your symptoms and provide health insights. You can either describe your symptoms in text or use the symptom selector for quick input.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSymptomSelector, setShowSymptomSelector] = useState(false);
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
        input +
          " If appropriate, provide 2-3 follow-up questions as multiple choice options. Format your response normally, but if you want to provide options, end your message with 'OPTIONS:' followed by each option on a new line starting with '- '.",
        conversationHistory,
      );

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);

        // Parse response for options
        let content = response;
        let options: string[] | undefined;

        if (response.includes("OPTIONS:")) {
          const parts = response.split("OPTIONS:");
          content = parts[0].trim();
          const optionText = parts[1];
          options = optionText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.startsWith("- "))
            .map((line) => line.substring(2).trim())
            .filter((line) => line.length > 0);
        }

        return [
          ...newMessages,
          {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: content,
            timestamp: new Date(),
            options: options,
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

  const handleSymptomSelect = (symptoms: string[]) => {
    const symptomText = `I'm experiencing the following symptoms: ${symptoms.join(", ")}. Can you help me understand what this might indicate?`;
    setInput(symptomText);
  };

  const handleOptionSelect = (option: string) => {
    // Send the selected option as a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: option,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
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

    // Generate follow-up response based on selected option
    handleFollowUpResponse(option);
  };

  const handleFollowUpResponse = async (selectedOption: string) => {
    try {
      const prompt = `User selected: "${selectedOption}". Provide a helpful follow-up response and if needed, ask a specific follow-up question with 2-3 multiple choice options. Format your response normally, but if you want to provide options, end your message with "OPTIONS:" followed by each option on a new line starting with "- ".`;

      const response = await generateMedicalResponse(prompt, []);

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);

        // Parse response for options
        let content = response;
        let options: string[] | undefined;

        if (response.includes("OPTIONS:")) {
          const parts = response.split("OPTIONS:");
          content = parts[0].trim();
          const optionText = parts[1];
          options = optionText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.startsWith("- "))
            .map((line) => line.substring(2).trim())
            .filter((line) => line.length > 0);
        }

        return [
          ...newMessages,
          {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: content,
            timestamp: new Date(),
            options: options,
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

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col pb-16 md:pb-0">
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
                  "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
                  message.type === "user"
                    ? "bg-blue-400 text-white dark:bg-blue-500 dark:text-white"
                    : "bg-muted text-muted-foreground",
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

                    {/* Options buttons for bot messages */}
                    {message.type === "bot" &&
                      message.options &&
                      message.options.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">
                            Choose an option:
                          </p>
                          <div className="flex flex-col space-y-2">
                            {message.options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleOptionSelect(option)}
                                className="text-left justify-start h-auto py-2 px-3 text-sm whitespace-normal"
                                disabled={isTyping}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="flex items-center justify-between mt-3">
                      <p
                        className={cn(
                          "text-xs",
                          message.type === "user"
                            ? "text-white/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {message.timestamp.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                        })}{" "}
                        {message.timestamp.toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
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

        {/* Symptom Selector Overlay */}
        {showSymptomSelector && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <SymptomSelector
              onSymptomSelect={handleSymptomSelect}
              onClose={() => setShowSymptomSelector(false)}
            />
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-card p-6">
          <div className="mb-3 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSymptomSelector(true)}
              className="flex items-center space-x-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Quick Symptom Selector</span>
            </Button>
          </div>
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms or ask a health question..."
                className="min-h-[44px] resize-none rounded-xl border-2 focus:border-primary transition-all duration-300"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="h-[44px] w-[44px] p-0 rounded-xl bg-gray-500 hover:bg-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
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
