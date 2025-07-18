import { useState, useEffect } from "react";
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
  Sparkles,
  ChevronRight,
  Play,
  Star,
  Users,
  Brain,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Internal Medicine",
      content:
        "Mother.ai has revolutionized how I interact with patients. The symptom analysis is incredibly detailed.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Patient",
      content:
        "Got accurate insights about my symptoms before my appointment. Saved me time and anxiety.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Family Physician",
      content:
        "The medical records tracking feature is exactly what modern healthcare needs.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "99.2%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "2.3M+", label: "Users Helped", icon: Users },
    { value: "< 30s", label: "Response Time", icon: Zap },
    { value: "24/7", label: "Available", icon: Heart },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-medical-primary/10 to-medical-blush/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-medical-accent/5 to-medical-blush/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-medical-accent/10 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="relative z-50 glass-card border-0 border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-accent rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-accent rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-plex bg-gradient-to-r from-medical-navy to-medical-primary bg-clip-text text-transparent">
                  Mother.ai
                </h1>
                <p className="text-xs text-gray-600 font-inter">
                  AI Healthcare Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-inter font-medium text-medical-navy hover:bg-medical-primary/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 text-white font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={cn(
          "relative px-6 py-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="medical-glass-card text-medical-navy border-medical-primary/20 font-inter font-medium px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Healthcare Revolution
                </Badge>
                <h1 className="text-6xl lg:text-7xl font-bold font-serif leading-tight text-medical-navy">
                  Your Personal{" "}
                  <span className="bg-gradient-to-r from-medical-primary via-medical-accent to-medical-primary bg-clip-text text-transparent">
                    Medical AI
                  </span>{" "}
                  Companion
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed font-inter font-light">
                  Instant symptom analysis. Track records. Get personalized
                  health insights powered by cutting-edge AI technology that
                  understands your health journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 text-white font-inter font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-medical-primary/25 transition-all duration-300 group"
                  >
                    Start Free Analysis
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass border-medical-primary/30 text-medical-navy hover:bg-medical-primary/10 font-inter font-medium px-8 py-4 rounded-2xl group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="medical-glass-card rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105"
                    >
                      <Icon className="w-6 h-6 text-medical-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold font-plex text-medical-navy">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-inter">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Chat Preview */}
            <div className="relative">
              <div className="medical-glass-card rounded-3xl p-8 shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-medical-accent to-medical-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-navy font-plex">
                      Mother.ai Assistant
                    </h3>
                    <p className="text-sm text-gray-500 font-inter">
                      AI is analyzing your symptoms...
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-medical-accent rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass rounded-2xl p-4 max-w-xs">
                      <p className="text-sm text-medical-navy font-inter">
                        I've been experiencing headaches and fatigue lately...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-medical-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4 text-white" />
                    </div>
                    <div className="medical-glass-card rounded-2xl p-4 max-w-sm">
                      <p className="text-sm text-medical-navy font-inter">
                        I understand your concerns. Let me ask some follow-up
                        questions to better assess your symptoms and provide
                        personalized recommendations.
                      </p>
                      <div className="flex items-center mt-3 space-x-2">
                        <Heart className="w-4 h-4 text-medical-accent" />
                        <span className="text-xs text-gray-600 font-inter">
                          Powered by Gemini AI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-medical-primary/20 to-medical-accent/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-medical-blush/30 to-medical-primary/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-serif text-medical-navy mb-16">
            Trusted by Healthcare Professionals
          </h2>
          <div className="medical-glass-card rounded-3xl p-8 transition-all duration-500">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-xl font-inter text-medical-navy mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="text-center">
              <p className="font-semibold text-medical-navy font-plex">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-gray-600 font-inter">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-gradient-to-r from-medical-primary/5 to-medical-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-medical-navy mb-4">
              Advanced Healthcare Technology
            </h2>
            <p className="text-xl text-gray-600 font-inter font-light">
              Everything you need for comprehensive health management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Symptom Analysis",
                description:
                  "Advanced machine learning algorithms analyze your symptoms with medical-grade precision",
                color: "from-medical-primary to-medical-accent",
              },
              {
                icon: BarChart3,
                title: "Smart Health Records",
                description:
                  "Intelligent tracking and analysis of your medical records with automated insights",
                color: "from-medical-accent to-medical-blush",
              },
              {
                icon: Shield,
                title: "Privacy & Security",
                description:
                  "Bank-level encryption ensures your health data remains completely private and secure",
                color: "from-medical-navy to-medical-primary",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="medical-glass-card border-0 rounded-3xl transition-all duration-500 hover:scale-105 group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={cn(
                        "w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300",
                        feature.color,
                      )}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold font-plex text-medical-navy mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="medical-glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold font-serif text-medical-navy mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-xl text-gray-600 font-inter mb-8">
              Join thousands of users who trust Mother.ai for their health
              insights
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 text-white font-inter font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-medical-primary/25 transition-all duration-300"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-accent rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-plex text-medical-navy">
              Mother.ai
            </span>
          </div>
          <p className="text-gray-600 font-inter mb-8">
            Your trusted AI companion for better health management
          </p>
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 font-inter">
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
