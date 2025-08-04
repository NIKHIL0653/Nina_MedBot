import { useState } from "react";
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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const EXCHANGE_RATE_USD_TO_INR = 84.5; // Current approximate rate

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
    icon: <Star className="w-6 h-6" />,
    color: "border-gray-200 bg-white",
    recordLimit: 5
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
    icon: <Check className="w-6 h-6" />,
    popular: true,
    color: "border-blue-200 bg-blue-50",
    recordLimit: 20
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
    icon: <Crown className="w-6 h-6" />,
    color: "border-purple-200 bg-purple-50",
    recordLimit: 100
  }
];

export default function PricingPlans() {
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const formatPrice = (plan: PricingPlan) => {
    if (plan.price.usd === 0) return "Free";
    
    const price = currency === 'usd' ? plan.price.usd : plan.price.inr;
    const symbol = currency === 'usd' ? '$' : '₹';
    
    return `${symbol}${price}`;
  };

  const handleBuyNow = (plan: PricingPlan) => {
    if (plan.price.usd === 0) {
      // Free plan - just show success message or activate
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Currency Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setCurrency('usd')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                currency === 'usd' 
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('inr')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                currency === 'inr' 
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              INR (₹)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative transition-all duration-300 hover:shadow-lg",
                plan.color,
                plan.popular && "ring-2 ring-blue-500 shadow-xl scale-105"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                  plan.name === "Free" && "bg-gray-100 text-gray-600",
                  plan.name === "Basic" && "bg-blue-100 text-blue-600",
                  plan.name === "Pro" && "bg-purple-100 text-purple-600"
                )}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {formatPrice(plan)}
                  {plan.price.usd > 0 && (
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleBuyNow(plan)}
                  className={cn(
                    "w-full font-semibold transition-all duration-300",
                    plan.name === "Free" && "bg-gray-600 hover:bg-gray-700",
                    plan.name === "Basic" && "bg-blue-600 hover:bg-blue-700",
                    plan.name === "Pro" && "bg-purple-600 hover:bg-purple-700"
                  )}
                  disabled={plan.name === "Free"}
                >
                  {plan.price.usd === 0 ? "Current Plan" : "Buy Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Dialog with QR Code */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Complete Payment</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPayment(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {selectedPlan && (
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedPlan.name} Plan</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(selectedPlan)} {selectedPlan.price.usd > 0 && `/${selectedPlan.period}`}
                </p>
              </div>
            )}
            
            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F7a5b5ae412284dcf8819c5b981c3f9e0?format=webp&width=800"
                  alt="Payment QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scan QR code to pay with any UPI app
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500">UPI ID: nikhil0653@okhdfcbank</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> After payment, please allow 5-10 minutes for your account to be upgraded.
                Contact support if you face any issues.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
