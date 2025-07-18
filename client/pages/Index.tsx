import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Heart,
  Stethoscope,
  Activity,
  BarChart3,
  TrendingUp,
  Shield,
  ChevronRight,
  Star,
  Users,
  Brain,
  Zap,
} from "lucide-react";

export default function Index() {
  const stats = [
    { value: "99.2%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "2.3M+", label: "Users Helped", icon: Users },
    { value: "< 30s", label: "Response Time", icon: Zap },
    { value: "24/7", label: "Available", icon: Heart },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Symptom Analysis",
      description:
        "Advanced machine learning algorithms analyze your symptoms with medical-grade precision",
    },
    {
      icon: BarChart3,
      title: "Smart Health Records",
      description:
        "Intelligent tracking and analysis of your medical records with automated insights",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description:
        "Bank-level encryption ensures your health data remains completely private and secure",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Nina</h1>
              <p className="text-xs text-muted-foreground">
                AI Healthcare Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <Badge className="bg-sky-50 text-sky-700 border-sky-200">
              AI-Powered Healthcare Revolution
            </Badge>
            <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Your Personal Medical AI Companion
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Instant symptom analysis. Track records. Get personalized health
              insights powered by cutting-edge AI technology that understands
              your health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl"
                >
                  Start Free Analysis
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center"
                >
                  <Icon className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chat Interface Preview */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See Mother.ai in Action
            </h2>
            <p className="text-lg text-gray-600">
              Experience intelligent symptom analysis with our AI assistant
            </p>
          </div>

          {/* Chat Preview */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Mother.ai Assistant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Powered by Gemini AI • Online
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 min-h-[400px]">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="bg-sky-50 rounded-2xl p-4 max-w-sm">
                  <p className="text-sm text-gray-700">
                    I've been experiencing headaches and fatigue lately. The
                    headaches seem to get worse in the afternoon.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 max-w-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    I understand your concerns about headaches and fatigue. Let
                    me ask some follow-up questions to better assess your
                    symptoms:
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• On a scale of 1-10, how would you rate the pain?</p>
                    <p>• Where exactly do you feel the headache?</p>
                    <p>• How has your sleep quality been lately?</p>
                    <p>• Are you staying adequately hydrated?</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-3 h-3 text-sky-500" />
                      <span className="text-xs text-gray-500">
                        Powered by Gemini AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-gray-500">
                    Describe your symptoms or ask a health question...
                  </span>
                </div>
                <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Healthcare Technology
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for comprehensive health management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border border-gray-200 rounded-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-sky-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Trusted by Healthcare Professionals
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
              "Got accurate insights about my symptoms before my appointment.
              Saved me time and anxiety."
            </blockquote>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Michael Rodriguez</p>
              <p className="text-gray-600">Patient</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-sky-50 rounded-xl p-12 border border-sky-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users who trust Mother.ai for their health
              insights
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Mother.ai</span>
          </div>
          <p className="text-gray-600 mb-8">
            Your trusted AI companion for better health management
          </p>
          <div className="border-t border-gray-200 pt-8">
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
