import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  BarChart3,
  Brain,
  Activity,
  Settings,
  Menu,
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
        "I understand you're experiencing headaches and fatigue over the past 3 days, with the headaches worsening in the afternoon. Let me ask some follow-up questions to better understand your situation:\n\n**Headache Assessment:**\n🔍 On a scale of 1-10, how would you rate the pain intensity?\n📍 Where exactly do you feel the headache? (forehead, temples, back of head)\n💤 How has your sleep quality been lately?\n💧 Are you staying adequately hydrated throughout the day?\n\n**Additional Symptoms:**\n🤢 Any nausea or sensitivity to light?\n👁️ Any vision changes or dizziness?\n\nThese details will help me provide more targeted health insights and recommendations.",
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
        "Thank you for providing that additional information. Based on your symptoms, I recommend ensuring you're getting 7-9 hours of quality sleep and staying well-hydrated. The afternoon timing of your headaches could suggest several factors - perhaps screen time, stress, or meal timing. 💡 **Immediate Care:** Try applying a cool compress and ensure you're in a dimly lit environment. If symptoms persist beyond a week or worsen significantly, please consult with a healthcare professional promptly.",
        "I appreciate you sharing those details with me. Headaches with fatigue can be related to various factors including stress, dehydration, or sleep patterns. 🌟 **My Recommendations:** Consider keeping a headache diary to track triggers, maintain regular meal times, and practice stress-reduction techniques. However, given the persistence of your symptoms, I'd strongly recommend scheduling an appointment with your healthcare provider for a proper evaluation.",
        "Based on your symptom pattern, this could be related to several common causes. The afternoon timing suggests it might be tension-related or connected to daily stress patterns. 🎯 **Action Steps:** Try gentle neck stretches, ensure proper ergonomics if you work at a desk, and consider mindfulness techniques. Monitor your caffeine intake as well. Please seek medical attention if you experience severe pain, vision changes, or if symptoms don't improve within the next few days.",
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
      <div className="min-h-screen bg-gradient-to-br from-white via-medical-primary/5 to-medical-blush/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/3 via-medical-accent/3 to-medical-blush/3"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-medical-accent/5 rounded-full blur-3xl"></div>

        {/* Top Navigation */}
        <nav className="relative z-50 glass backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-accent rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-accent rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold font-plex bg-gradient-to-r from-medical-navy to-medical-primary bg-clip-text text-transparent">
                    Mother.ai
                  </h1>
                  <p className="text-xs text-gray-600 font-inter">
                    AI Healthcare Assistant
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="medical-glass-card border-medical-primary/20 text-medical-navy hover:bg-medical-primary/10 font-inter font-medium transition-all duration-300 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass hover:bg-white/20 text-medical-navy font-inter font-medium transition-all duration-300"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Records
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass hover:bg-white/20 text-medical-navy font-inter font-medium transition-all duration-300"
                >
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
                  className="glass hover:bg-white/20 text-medical-navy transition-all duration-300 group"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  ) : (
                    <Moon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  )}
                </Button>

                <div className="medical-glass-card px-3 py-2 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-medical-primary to-medical-accent rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium font-inter text-medical-navy">
                      demo_user
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Chat Container */}
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          {/* Chat Header */}
          <div className="medical-glass-card border-b border-medical-primary/10 px-6 py-4 mx-6 mt-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-medical-accent to-medical-primary rounded-2xl flex items-center justify-center shadow-xl">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-medical-accent border-2 border-white rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-medical-navy font-plex text-lg">
                    Mother.ai Assistant
                  </h3>
                  <p className="text-sm text-gray-600 font-inter flex items-center">
                    <Sparkles className="w-3 h-3 mr-1 text-medical-accent" />
                    Powered by Gemini AI • Analyzing symptoms
                  </p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-medical-accent/20 to-medical-primary/20 text-medical-navy border-medical-accent/30 font-inter">
                <div className="w-2 h-2 bg-medical-accent rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 mx-6 medical-glass-card rounded-b-3xl">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-4 group animate-in slide-in-from-bottom-2 duration-500",
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg",
                    message.type === "user"
                      ? "bg-gradient-to-br from-medical-primary to-medical-accent"
                      : "bg-gradient-to-br from-medical-accent to-medical-primary",
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
                    "max-w-[75%] rounded-3xl px-6 py-4 shadow-lg transition-all duration-300 hover:shadow-xl",
                    message.type === "user"
                      ? "bg-gradient-to-br from-medical-primary to-medical-accent text-white"
                      : "medical-glass-card border border-medical-primary/20",
                  )}
                >
                  {message.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-medical-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-medical-accent rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-medical-accent rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-gray-600 font-inter">
                        AI is analyzing your symptoms...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap leading-relaxed font-inter text-medical-navy">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p
                          className={cn(
                            "text-xs font-inter",
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
                              className="h-6 w-6 p-0 hover:bg-medical-primary/10 rounded-lg"
                            >
                              <Copy className="w-3 h-3 text-medical-navy" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-medical-accent/10 rounded-lg"
                            >
                              <ThumbsUp className="w-3 h-3 text-medical-navy" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-red-100 rounded-lg"
                            >
                              <ThumbsDown className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {message.type === "bot" && (
                        <div className="flex items-center mt-3 space-x-2">
                          <Heart className="w-3 h-3 text-medical-accent" />
                          <span className="text-xs text-gray-500 font-inter">
                            Empathetic AI Response
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="medical-glass-card border-t border-medical-primary/10 p-6 mx-6 mb-6 rounded-3xl">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms or ask a health question..."
                  className="pr-16 min-h-[56px] text-base rounded-2xl border-2 border-medical-primary/20 focus:border-medical-primary bg-white/50 backdrop-blur-sm font-inter placeholder:text-gray-500 transition-all duration-300"
                  disabled={isTyping}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-medical-accent" />
                  <Heart className="w-4 h-4 text-medical-primary animate-pulse" />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-[56px] w-[56px] p-0 rounded-2xl bg-gradient-to-br from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 group disabled:opacity-50"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                )}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500 font-inter">
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
