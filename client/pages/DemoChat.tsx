import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  riskLevel?: "low" | "medium" | "high";
  showQuickResponses?: boolean;
}

interface QuickResponse {
  text: string;
  value: string;
  category: string;
}

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm Mother.ai, your personal healthcare assistant. I'm here to help analyze your symptoms and provide health insights. Please describe what symptoms you're experiencing.",
      timestamp: new Date(),
      riskLevel: "low",
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
        "I understand you're experiencing headaches and fatigue. Let me ask some follow-up questions to better understand your situation:",
      timestamp: new Date(),
      riskLevel: "low",
      showQuickResponses: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickResponses: QuickResponse[] = [
    {
      text: "Mild pain (1-3)",
      value: "The pain intensity is mild, around 2-3 on a scale of 1-10.",
      category: "intensity",
    },
    {
      text: "Moderate pain (4-6)",
      value: "The pain intensity is moderate, around 4-6 on a scale of 1-10.",
      category: "intensity",
    },
    {
      text: "Severe pain (7-10)",
      value: "The pain intensity is severe, around 7-10 on a scale of 1-10.",
      category: "intensity",
    },
    {
      text: "Forehead",
      value: "The headache is primarily in my forehead area.",
      category: "location",
    },
    {
      text: "Temples",
      value: "The headache is mainly in my temples.",
      category: "location",
    },
    {
      text: "Back of head",
      value: "The headache is at the back of my head.",
      category: "location",
    },
    {
      text: "Getting enough sleep",
      value: "I've been getting enough sleep, around 7-8 hours per night.",
      category: "sleep",
    },
    {
      text: "Not sleeping well",
      value:
        "I haven't been sleeping well lately, getting less than 6 hours per night.",
      category: "sleep",
    },
    {
      text: "Drinking enough water",
      value: "I've been drinking plenty of water throughout the day.",
      category: "hydration",
    },
    {
      text: "Not drinking enough",
      value: "I probably haven't been drinking enough water lately.",
      category: "hydration",
    },
    {
      text: "No other symptoms",
      value: "No, I don't have any other symptoms.",
      category: "additional",
    },
    {
      text: "Nausea",
      value: "Yes, I've also been experiencing some nausea.",
      category: "additional",
    },
    {
      text: "Light sensitivity",
      value: "Yes, I've been sensitive to bright lights.",
      category: "additional",
    },
  ];

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

  const handleQuickResponse = (response: QuickResponse) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: response.value,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowQuickResponses(false);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Thank you for that information. Based on your symptoms, I recommend ensuring you're getting adequate rest and staying well-hydrated. If symptoms persist or worsen, please consult with a healthcare professional.",
        timestamp: new Date(),
        riskLevel: "low",
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
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
    setShowQuickResponses(false);

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
      let showResponses = false;

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
          "Thank you for sharing your symptoms. Based on what you've described, I recommend scheduling an appointment with your healthcare provider within the next few days. Let me ask some follow-up questions:";
        showResponses = true;
      } else {
        riskLevel = "low";
        response =
          "I understand your concerns. Let me ask some follow-up questions to better assess your symptoms:";
        showResponses = true;
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
            showQuickResponses: showResponses,
          },
        ];
      });
      setIsTyping(false);
      setShowQuickResponses(showResponses);
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

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  const groupedResponses = quickResponses.reduce(
    (acc, response) => {
      if (!acc[response.category]) {
        acc[response.category] = [];
      }
      acc[response.category].push(response);
      return acc;
    },
    {} as Record<string, QuickResponse[]>,
  );

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <nav className="bg-sky-50 border-b border-sky-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
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

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {/* Desktop User Controls */}
              <div className="hidden md:flex items-center space-x-3">
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

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl border border-gray-200"
                    >
                      <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        demo_user
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-sky-200 bg-white">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Records
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full justify-start text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Chat Container */}
        <div className="h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 mx-4 sm:mx-6 mt-4 sm:mt-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    Mother.ai Assistant
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-sky-500" />
                    Powered by Gemini AI
                  </p>
                </div>
              </div>
              <Badge className="bg-green-50 text-green-800 border-green-200 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 mx-4 sm:mx-6 bg-gray-50 space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-3 sm:space-x-4 group",
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg",
                    message.type === "user" ? "bg-sky-500" : "bg-gray-600",
                  )}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>

                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[75%] rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm",
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
                        AI is analyzing...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-900 text-sm sm:text-base">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
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
                          <div className="hidden sm:flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

            {/* Quick Response Buttons */}
            {showQuickResponses && !isTyping && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  Quick Responses:
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(groupedResponses).map(
                    ([category, responses]) => (
                      <div key={category}>
                        <h5 className="text-xs font-medium text-gray-700 mb-2 capitalize">
                          {category === "additional"
                            ? "Additional Symptoms"
                            : category}
                          :
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {responses.map((response, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickResponse(response)}
                              className="text-xs rounded-lg border-gray-200 hover:bg-sky-50 hover:border-sky-300"
                            >
                              {response.text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="bg-white border-t border-gray-200 p-4 sm:p-6 mx-4 sm:mx-6 mb-4 sm:mb-6 rounded-b-2xl">
            <div className="flex items-end space-x-3 sm:space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms..."
                  className="pr-12 sm:pr-16 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-sky-500 bg-white text-gray-900 placeholder:text-gray-500"
                  disabled={isTyping}
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-4 h-4 text-sky-500" />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] p-0 rounded-xl sm:rounded-2xl bg-sky-500 hover:bg-sky-600 shadow-lg disabled:opacity-50"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </Button>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-center">
                For informational purposes only • Always consult healthcare
                professionals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
