import { useState, useRef, useEffect } from "react";
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
  Moon,
  Sun,
  MessageCircle,
  FileText,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Mother.ai, your personal healthcare assistant powered by Google's Gemini AI. I'm here to help analyze your symptoms and provide health insights. Please describe what symptoms you're experiencing, and I'll ask follow-up questions to better understand your situation.",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "user",
      content:
        "I've been having headaches for the past 3 days, and I'm feeling quite fatigued. The headaches seem to get worse in the afternoon.",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "bot",
      content:
        "I understand you're experiencing headaches and fatigue over the past 3 days, with the headaches worsening in the afternoon. Let me ask some follow-up questions to better understand your situation:\n\n1. **Headache intensity**: On a scale of 1-10, how would you rate the pain?\n\n2. **Location**: Where exactly do you feel the headache? (forehead, temples, back of head, etc.)\n\n3. **Sleep patterns**: How has your sleep been lately? Are you getting enough rest?\n\n4. **Hydration**: Have you been drinking enough water throughout the day?\n\n5. **Stress levels**: Have you been under any unusual stress recently?\n\n6. **Other symptoms**: Any nausea, vision changes, or sensitivity to light?\n\nThese details will help me provide more targeted insights about potential causes and recommendations.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Set light mode on initial load
    document.documentElement.classList.remove("dark");
  }, []);

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

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thank you for providing that information. Based on what you've described, this could be related to several factors such as dehydration, stress, or changes in sleep patterns. I recommend monitoring your symptoms and staying well-hydrated. If symptoms persist or worsen, please consult with a healthcare professional.",
        "I understand your concerns. These symptoms could be related to various factors. Let me provide some general recommendations: ensure you're getting adequate sleep, stay hydrated, and consider stress management techniques. However, if your symptoms persist or you experience severe pain, please seek medical attention promptly.",
        "Based on your description, I'd recommend keeping track of when these symptoms occur and any potential triggers. In the meantime, ensure you're drinking plenty of water, getting regular sleep, and managing stress levels. Always consult with a healthcare provider for persistent or concerning symptoms.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);
        return [
          ...newMessages,
          {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: randomResponse,
            timestamp: new Date(),
          },
        ];
      });
      setIsTyping(false);
    }, 2000);
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Mother.ai
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI Healthcare Assistant
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Button
                variant="default"
                size="sm"
                className="relative group transition-all duration-300 bg-primary text-primary-foreground shadow-md"
              >
                <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                Chat
                <div className="absolute inset-0 bg-primary rounded-md opacity-20 blur-sm"></div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative group transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                Records
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="group transition-all duration-300 hover:bg-accent"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                )}
              </Button>

              <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">demo_user</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
                <h3 className="font-semibold text-foreground">Mother.ai</h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Powered by Gemini AI
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
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border",
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
                      Analyzing with Gemini AI...
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
              className="h-[44px] w-[44px] p-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300 group"
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
              Powered by Google Gemini AI. This is for informational purposes
              only. Always consult healthcare professionals for medical advice.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
