import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Send,
  User,
  Bot,
  Loader2,
  AlertTriangle,
  Heart,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Moon,
  Sun,
  MessageCircle,
  FileText,
  Stethoscope,
  BarChart3,
  Brain,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  riskLevel?: "low" | "medium" | "high";
}

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Mother.ai, your personal healthcare assistant powered by Google's Gemini AI. I'm here to help analyze your symptoms and provide health insights. Please describe what symptoms you're experiencing, and I'll ask follow-up questions to better understand your situation.",
      timestamp: new Date(),
      riskLevel: "low",
    },
    {
      id: "2",
      type: "user",
      content:
        "I've been having severe chest pain for the past hour, along with shortness of breath and dizziness. It came on suddenly while I was at rest.",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "bot",
      content:
        "⚠️ **URGENT MEDICAL ATTENTION REQUIRED** ⚠️\n\nBased on your symptoms of severe chest pain, shortness of breath, and dizziness that came on suddenly, this could indicate a serious cardiac event or other emergency condition.\n\n**IMMEDIATE ACTION REQUIRED:**\n🚨 Call emergency services (911) immediately\n🚨 Do not drive yourself to the hospital\n🚨 If you have aspirin and no allergies, consider taking one while waiting for help\n\n**These symptoms require immediate professional medical evaluation and cannot wait for a regular appointment.**\n\nPlease seek emergency medical care right now. Your safety is the priority.",
      timestamp: new Date(),
      riskLevel: "high",
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

  const getRiskAlert = (riskLevel?: "low" | "medium" | "high") => {
    if (!riskLevel) return null;

    const riskConfigs = {
      low: {
        icon: CheckCircle,
        color: "bg-green-50 border-green-200 text-green-800",
        title: "Low Risk",
        message: "Symptoms appear manageable. Continue monitoring.",
      },
      medium: {
        icon: AlertTriangle,
        color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        title: "Medium Risk",
        message:
          "Consider scheduling an appointment with your healthcare provider.",
      },
      high: {
        icon: XCircle,
        color: "bg-red-50 border-red-200 text-red-800",
        title: "High Risk",
        message:
          "Seek immediate medical attention. These symptoms require urgent care.",
      },
    };

    const config = riskConfigs[riskLevel];
    const Icon = config.icon;

    return (
      <Alert className={`mt-3 ${config.color}`}>
        <Icon className="h-4 w-4" />
        <AlertDescription>
          <span className="font-semibold">{config.title}:</span>{" "}
          {config.message}
        </AlertDescription>
      </Alert>
    );
  };

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

    // Simulate AI response with risk assessment
    setTimeout(() => {
      let riskLevel: "low" | "medium" | "high" = "low";
      let response = "";

      // Simple risk assessment based on keywords
      const inputLower = input.toLowerCase();
      if (
        inputLower.includes("chest pain") ||
        inputLower.includes("difficulty breathing") ||
        inputLower.includes("severe") ||
        inputLower.includes("emergency")
      ) {
        riskLevel = "high";
        response =
          "⚠️ **URGENT: These symptoms require immediate medical attention.** Based on your description, please call emergency services (911) or go to the nearest emergency room immediately. Do not wait or delay seeking medical care.";
      } else if (
        inputLower.includes("pain") ||
        inputLower.includes("fever") ||
        inputLower.includes("persistent") ||
        inputLower.includes("worsening")
      ) {
        riskLevel = "medium";
        response =
          "Thank you for sharing your symptoms. Based on what you've described, I recommend scheduling an appointment with your healthcare provider within the next few days. In the meantime, monitor your symptoms and seek immediate care if they worsen significantly.";
      } else {
        riskLevel = "low";
        response =
          "I understand your concerns. These symptoms appear to be manageable, but it's always good to monitor how you're feeling. Consider general wellness measures like staying hydrated, getting adequate rest, and maintaining a healthy routine. If symptoms persist or worsen, don't hesitate to consult with a healthcare professional.";
      }

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isTyping);
        return [
          ...newMessages,
          {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: response,
            timestamp: new Date(),
            riskLevel: riskLevel,
          },
        ];
      });
      setIsTyping(false);
    }, 2500);
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
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mother.ai
                  </h1>
                  <p className="text-xs text-gray-600">
                    AI Healthcare Assistant
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Records
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </div>

              {/* User Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-700"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl">
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    demo_user
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Chat Container */}
        <div className="h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 mx-6 mt-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Mother.ai Assistant
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-sky-500" />
                    Powered by Gemini AI • Analyzing symptoms
                  </p>
                </div>
              </div>
              <Badge className="bg-green-50 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-6 py-6 mx-6 bg-gray-50 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-4 group",
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg",
                    message.type === "user" ? "bg-sky-500" : "bg-gray-600",
                  )}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Stethoscope className="w-5 h-5 text-white" />
                  )}
                </div>

                <div
                  className={cn(
                    "max-w-[75%] rounded-3xl px-6 py-4 shadow-sm",
                    message.type === "user"
                      ? "bg-sky-500 text-white"
                      : "bg-white border border-gray-200",
                  )}
                >
                  {message.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        AI is analyzing your symptoms...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-900">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p
                          className={cn(
                            "text-xs",
                            message.type === "user"
                              ? "text-white/70"
                              : "text-gray-500",
                          )}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        {message.type === "bot" && (
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg"
                            >
                              <Copy className="w-3 h-3 text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg"
                            >
                              <ThumbsUp className="w-3 h-3 text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg"
                            >
                              <ThumbsDown className="w-3 h-3 text-gray-600" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {message.type === "bot" &&
                        getRiskAlert(message.riskLevel)}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="bg-white border-t border-gray-200 p-6 mx-6 mb-6 rounded-b-3xl">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms or ask a health question..."
                  className="pr-16 min-h-[56px] text-base rounded-2xl border-2 border-gray-200 focus:border-sky-500 bg-white text-gray-900 placeholder:text-gray-500"
                  disabled={isTyping}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-4 h-4 text-sky-500" />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-[56px] w-[56px] p-0 rounded-2xl bg-sky-500 hover:bg-sky-600 shadow-lg disabled:opacity-50"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3" />
              <span>
                Powered by Google Gemini AI • For informational purposes only •
                Always consult healthcare professionals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
