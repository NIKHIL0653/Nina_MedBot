import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Shield,
  Stethoscope,
  FileText,
  ChevronRight,
  Activity,
  Plus,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Symptom Analysis",
      description:
        "Get personalized health insights through intelligent conversation",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Medical Records",
      description:
        "Track and analyze your lab results with automated evaluations",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your health data is encrypted and secure",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-medical-blue rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-medical-blue rotate-45" />
            </div>
            <span className="text-xl font-medium text-gray-900">Mother.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="bg-medical-blue hover:bg-medical-blue-dark font-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gray-50 text-gray-700 border border-gray-200 font-medium">
                  AI-Powered Health Assistant
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
                  Your Personal{" "}
                  <span className="text-medical-blue-dark font-medium">
                    Medical AI
                  </span>{" "}
                  Companion
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  Get instant symptom analysis, track your medical records, and
                  receive personalized health insights powered by advanced AI
                  technology.
                </p>
              </div>
              <div>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-medical-blue hover:bg-medical-blue-dark text-white font-medium"
                  >
                    Start Free Analysis
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 border border-medical-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Plus className="w-3 h-3 text-medical-blue rotate-45" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 font-light">
                          I've been experiencing headaches and fatigue lately...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700 font-light">
                          I understand. Can you tell me more about when these
                          symptoms started and their intensity?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Activity className="w-3 h-3" />
                    <span className="font-light">
                      AI is analyzing your symptoms...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Complete Health Management Platform
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Everything you need to monitor and understand your health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-none hover:shadow-sm transition-shadow duration-200"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <div className="text-gray-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Records Preview */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-gray-900">
                Track Your{" "}
                <span className="text-medical-blue-dark font-medium">
                  Medical Records
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Easily input and track your lab results with automatic range
                checking for 10+ common medical tests including CBC, Liver
                Function, Kidney Function, and more.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700 font-light">
                    Automatic normal/abnormal detection
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700 font-light">
                    Color-coded results for quick understanding
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700 font-light">
                    Historical tracking and trends
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">
                    Complete Blood Count (CBC)
                  </h3>
                  <span className="text-sm text-gray-500 font-light">
                    Today
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                    <span className="text-sm text-gray-700 font-light">
                      Hemoglobin
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        14.2 g/dL
                      </span>
                      <Badge className="bg-green-100 text-green-800 border border-green-200 font-medium">
                        Normal
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <span className="text-sm text-gray-700 font-light">
                      WBC Count
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        11.2 cells/mcL
                      </span>
                      <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 font-medium">
                        High
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                    <span className="text-sm text-gray-700 font-light">
                      Platelet Count
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        250K /mcL
                      </span>
                      <Badge className="bg-green-100 text-green-800 border border-green-200 font-medium">
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
      <footer className="border-t border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-gray-400 rounded-lg flex items-center justify-center">
              <Plus className="w-3 h-3 text-gray-400 rotate-45" />
            </div>
            <span className="text-lg font-medium text-gray-900">Mother.ai</span>
          </div>
          <p className="text-gray-600 font-light mb-8">
            Your trusted AI companion for better health management
          </p>
          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-light">
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
