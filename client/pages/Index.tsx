import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Heart,
  Shield,
  Stethoscope,
  FileText,
  ChevronRight,
  Sparkles,
  Brain,
  Activity,
} from "lucide-react";

export default function Index() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Symptom Analysis",
      description:
        "Get personalized health insights through intelligent conversation",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Medical Records",
      description:
        "Track and analyze your lab results with automated evaluations",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your health data is encrypted and secure",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Mother.ai
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="bg-medical-blue hover:bg-medical-blue-dark"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-medical-blue/10 text-medical-blue-dark hover:bg-medical-blue/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Health Assistant
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Personal{" "}
                  <span className="bg-gradient-to-r from-medical-blue to-medical-blue-dark bg-clip-text text-transparent">
                    Medical AI
                  </span>{" "}
                  Companion
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get instant symptom analysis, track your medical records, and
                  receive personalized health insights powered by advanced AI
                  technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-medical-blue hover:bg-medical-blue-dark text-white"
                  >
                    Start Free Analysis
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>

            {/* Animated Feature Showcase */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-medical-blue/10 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          I've been experiencing headaches and fatigue lately...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          I understand. Can you tell me more about when these
                          symptoms started and their intensity?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Activity className="w-4 h-4" />
                    <span>AI is analyzing your symptoms...</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-medical-blue/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-medical-blue-dark/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Complete Health Management Platform
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to monitor and understand your health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 hover:shadow-xl cursor-pointer ${
                  currentFeature === index
                    ? "ring-2 ring-medical-blue shadow-lg"
                    : ""
                }`}
                onClick={() => setCurrentFeature(index)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-medical-blue-dark">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Records Preview */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Track Your{" "}
                <span className="text-medical-blue-dark">Medical Records</span>
              </h2>
              <p className="text-xl text-gray-600">
                Easily input and track your lab results with automatic range
                checking for 10+ common medical tests including CBC, Liver
                Function, Kidney Function, and more.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-medical-success rounded-full"></div>
                  <span>Automatic normal/abnormal detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-medical-success rounded-full"></div>
                  <span>Color-coded results for quick understanding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-medical-success rounded-full"></div>
                  <span>Historical tracking and trends</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Complete Blood Count (CBC)</h3>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Hemoglobin</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">14.2 g/dL</span>
                      <Badge className="bg-medical-success text-white">
                        Normal
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm">WBC Count</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">11.2 cells/mcL</span>
                      <Badge className="bg-medical-warning text-white">
                        High
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Platelet Count</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">250K /mcL</span>
                      <Badge className="bg-medical-success text-white">
                        Normal
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Mother.ai</span>
          </div>
          <p className="text-gray-400">
            Your trusted AI companion for better health management
          </p>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2024 Mother.ai. All rights reserved. This tool provides general
              health information and should not replace professional medical
              advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
