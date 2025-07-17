import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Send,
  User,
  Bot,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  category: string;
  medications: string[];
  advice: string;
}

export default function Chat() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Mother.ai, your personal medical assistant. I'm here to help analyze your symptoms and provide health insights. Please describe what symptoms you're experiencing.",
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
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple rule-based responses for demonstration
    if (lowerMessage.includes("headache") || lowerMessage.includes("head")) {
      return "I understand you're experiencing headaches. Can you tell me more about: 1) When did the headaches start? 2) How severe are they on a scale of 1-10? 3) Are they accompanied by any other symptoms like nausea, light sensitivity, or vision changes? 4) Have you taken any medications recently?";
    }

    if (
      lowerMessage.includes("fever") ||
      lowerMessage.includes("temperature")
    ) {
      return "Fever can indicate an infection or other condition. Please tell me: 1) What's your current temperature? 2) How long have you had the fever? 3) Are you experiencing chills, sweating, or other symptoms? 4) Any recent travel or exposure to illness?";
    }

    if (lowerMessage.includes("cough") || lowerMessage.includes("throat")) {
      return "I'm sorry to hear about your cough/throat issues. To better understand: 1) Is it a dry cough or are you producing phlegm? 2) How long have you had these symptoms? 3) Any chest pain, shortness of breath, or fever? 4) Are you a smoker or have any allergies?";
    }

    if (
      lowerMessage.includes("stomach") ||
      lowerMessage.includes("nausea") ||
      lowerMessage.includes("abdominal")
    ) {
      return "Digestive issues can have various causes. Please provide more details: 1) Where exactly is the pain/discomfort? 2) When did it start? 3) Is it constant or comes in waves? 4) Any changes in bowel movements, appetite, or recent dietary changes?";
    }

    if (
      lowerMessage.includes("started") ||
      lowerMessage.includes("ago") ||
      lowerMessage.includes("since")
    ) {
      return "Thank you for that information. Based on your symptoms, here are some initial thoughts:\n\n**Possible Considerations:**\n• Stay hydrated and get adequate rest\n• Monitor your symptoms for any worsening\n• Consider over-the-counter options like acetaminophen for pain/fever\n\n**When to seek immediate care:**\n• Severe or worsening symptoms\n• High fever (>101.3°F)\n• Difficulty breathing\n• Severe pain\n\n**General Recommendations:**\n• Maintain good hygiene\n• Avoid strenuous activities\n• Consider scheduling a consultation with your healthcare provider\n\n⚠️ **Important:** This is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.";
    }

    return "I understand. Could you provide more specific details about your symptoms? For example, when they started, their severity, and any other associated symptoms you might be experiencing. The more information you share, the better I can assist you.";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(input),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Symptom Analysis</span>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online
          </Badge>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-medical-blue/10 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-medical-blue-dark" />
              </div>
              <div>
                <h3 className="font-semibold">Mother.ai Assistant</h3>
                <p className="text-sm text-gray-600">
                  AI-powered symptom analysis
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" ? "bg-medical-blue" : "bg-gray-100"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-medical-blue text-white"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gray-600" />
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-medical-blue hover:bg-medical-blue-dark"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-4 h-4" />
              <span>
                This is for informational purposes only. Always consult
                healthcare professionals for medical advice.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
