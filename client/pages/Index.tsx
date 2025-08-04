import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDarkMode } from "@/hooks/use-dark-mode";
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
  Moon,
  Sun,
  CheckCircle,
  Clock,
  UserCheck,
} from "lucide-react";

export default function Index() {
  const { isDark, toggle } = useDarkMode();

  const stats = [
    { value: "99.2%", label: "Accuracy Rate", icon: TrendingUp, color: "text-emerald-500" },
    { value: "2.3M+", label: "Users Helped", icon: Users, color: "text-blue-500" },
    { value: "< 30s", label: "Response Time", icon: Zap, color: "text-amber-500" },
    { value: "24/7", label: "Available", icon: Heart, color: "text-rose-500" },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Nina</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">AI Healthcare Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggle}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-10">
            <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 px-4 py-2 text-sm font-medium">
              ✨ AI-Powered Healthcare Revolution
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-600 dark:from-white dark:via-blue-200 dark:to-cyan-300 bg-clip-text text-transparent leading-tight">
              Your Personal Medical AI Companion
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Get instant symptom analysis, track medical records, and receive personalized health
              insights powered by cutting-edge AI technology designed for your wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Start Free Analysis
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chat Interface Preview */}
      <section className="px-6 py-24 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              See Nina in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience intelligent symptom analysis with our AI-powered medical assistant
            </p>
          </div>

          {/* Chat Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    Nina AI Assistant
                  </h3>
                  <p className="text-sm text-blue-100">
                    Powered by Gemini AI • Online
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-8 space-y-8 min-h-[450px] bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl rounded-tl-sm p-4 max-w-sm shadow-lg">
                  <p className="text-sm">
                    I've been experiencing headaches and fatigue lately. The
                    headaches seem to get worse in the afternoon.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-tl-sm p-4 max-w-lg shadow-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    I understand your concerns about headaches and fatigue. Based on your symptoms, this could indicate tension headaches or stress-related fatigue. Let me gather more details:
                  </p>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-gray-600 rounded-lg p-3">
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Rate your pain (1-10)?</p>
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Location of the headache?</p>
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Sleep quality recently?</p>
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Hydration levels?</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Powered by Gemini AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3">
                  <span className="text-gray-500 dark:text-gray-400">
                    Describe your symptoms or ask a health question...
                  </span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
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
              Join thousands of users who trust NINA for their health
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
            <span className="text-xl font-bold text-gray-900 dark:text-white">NINA</span>
          </div>
          <p className="text-gray-600 mb-8">
            Your trusted AI companion for better health management
          </p>
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              © 2024 NINA. All rights reserved. This tool provides general
              health information and should not replace professional medical
              advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
