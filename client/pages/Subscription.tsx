import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Check,
  Star,
  Crown,
  CreditCard,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PricingPlan {
  name: string;
  price: {
    usd: number;
    inr: number;
  };
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
  recordLimit: number;
  gradient: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: { usd: 0, inr: 0 },
    period: "Forever",
    description: "Perfect for getting started with basic health tracking",
    features: [
      "5 medical records storage",
      "Basic symptom analysis",
      "AI chat support",
      "Mobile app access",
      "Email support"
    ],
    icon: <Star className="w-7 h-7" />,
    color: "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100",
    recordLimit: 5,
    gradient: "from-gray-500 to-gray-600"
  },
  {
    name: "Basic",
    price: { usd: 4.49, inr: 380 },
    period: "per month",
    description: "Enhanced features for active health monitoring",
    features: [
      "20 medical records storage",
      "Advanced symptom analysis",
      "Priority AI responses",
      "Health trend insights",
      "Email & chat support",
      "Export health reports"
    ],
    icon: <Check className="w-7 h-7" />,
    popular: true,
    color: "border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50",
    recordLimit: 20,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Pro",
    price: { usd: 9.99, inr: 845 },
    period: "per month",
    description: "Complete health management for serious users",
    features: [
      "100 medical records storage",
      "AI-powered health insights",
      "Instant priority support",
      "Advanced analytics",
      "Custom health reports",
      "Telemedicine integration",
      "Family account sharing"
    ],
    icon: <Crown className="w-7 h-7" />,
    color: "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50",
    recordLimit: 100,
    gradient: "from-purple-500 to-pink-500"
  }
];

export default function Subscription() {
  const { user, loading } = useAuth();
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const formatPrice = (plan: PricingPlan) => {
    if (plan.price.usd === 0) return "Free";
    
    const price = currency === 'usd' ? plan.price.usd : plan.price.inr;
    const symbol = currency === 'usd' ? '$' : '₹';
    
    return `${symbol}${price}`;
  };

  const handleBuyNow = (plan: PricingPlan) => {
    if (plan.price.usd === 0) {
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pb-20">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 py-12">
            <Link 
              to="/settings" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-8 h-8 text-blue-500" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                  Choose Your Plan
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Unlock the full potential of NINA with our flexible subscription plans designed for your healthcare needs
              </p>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setCurrency('usd')}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                  currency === 'usd' 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('inr')}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                  currency === 'inr' 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                INR (₹)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "relative transition-all duration-300 hover:shadow-2xl border-2",
                  plan.color,
                  plan.popular && "ring-4 ring-blue-500/30 shadow-2xl transform scale-105 z-10"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 pt-8">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg",
                    plan.name === "Free" && "bg-gradient-to-br from-gray-400 to-gray-500 text-white",
                    plan.name === "Basic" && "bg-gradient-to-br from-blue-500 to-cyan-400 text-white",
                    plan.name === "Pro" && "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                  )}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold">
                      {formatPrice(plan)}
                      {plan.price.usd > 0 && (
                        <span className="text-lg font-normal text-gray-600 dark:text-gray-400 block">
                          per {plan.period.split(' ')[1] || plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 px-6 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleBuyNow(plan)}
                    className={cn(
                      "w-full h-12 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl",
                      plan.name === "Free" && "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
                      plan.name === "Basic" && "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
                      plan.name === "Pro" && "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    )}
                    disabled={plan.name === "Free"}
                  >
                    {plan.price.usd === 0 ? "Current Plan" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="text-center space-y-4 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              All plans include
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>24/7 AI Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Secure Data Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Regular Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cross-Platform Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-lg border-0 shadow-2xl">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold text-center">
                Complete Your Purchase
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-8">
              {selectedPlan && (
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">{selectedPlan.name} Plan</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(selectedPlan)}
                    {selectedPlan.price.usd > 0 && (
                      <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                        /{selectedPlan.period}
                      </span>
                    )}
                  </p>
                </div>
              )}
              
              {/* QR Code */}
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-blue-100">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F7a5b5ae412284dcf8819c5b981c3f9e0?format=webp&width=800"
                    alt="Payment QR Code"
                    className="w-80 h-80 object-contain"
                  />
                </div>
                
                <div className="text-center space-y-3">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Scan QR code to pay with any UPI app
                  </p>
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className="font-mono text-sm font-medium">UPI ID: nikhil0653@okhdfcbank</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Important:</strong> After payment, please allow 5-10 minutes for your account to be upgraded automatically.
                  Contact our support team if you face any issues.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
