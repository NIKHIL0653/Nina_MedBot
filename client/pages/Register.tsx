import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Password validation functions
  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strength = (metRequirements / 4) * 100;

    return { requirements, strength, isValid: metRequirements === 4 };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate password before submission
    if (!passwordValidation.isValid) {
      setError("Please ensure your password meets all requirements");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/chat"), 2000);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to NINA!</h2>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully. Please check your
                email to verify your account.
              </p>
              <Button
                onClick={() => navigate("/chat")}
                className="bg-medical-blue hover:bg-medical-blue-dark"
              >
                Start Chatting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F80852419a0194244b22ef22578b3e48b?format=webp&width=800"
                alt="Nina AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              NINA
            </span>
          </div>
          <p className="text-gray-600">
            Join thousands using AI for better health
          </p>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className={cn(
                    "transition-colors",
                    password && !passwordValidation.isValid && "border-red-300 focus:border-red-500",
                    password && passwordValidation.isValid && "border-green-300 focus:border-green-500"
                  )}
                />

                {/* Password Strength Bar */}
                {password && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Password Strength</span>
                        <span className={cn(
                          "text-sm font-medium",
                          passwordValidation.strength < 50 && "text-red-600",
                          passwordValidation.strength >= 50 && passwordValidation.strength < 100 && "text-yellow-600",
                          passwordValidation.strength === 100 && "text-green-600"
                        )}>
                          {passwordValidation.strength < 50 && "Weak"}
                          {passwordValidation.strength >= 50 && passwordValidation.strength < 100 && "Medium"}
                          {passwordValidation.strength === 100 && "Strong"}
                        </span>
                      </div>
                      <Progress
                        value={passwordValidation.strength}
                        className={cn(
                          "h-2",
                          passwordValidation.strength < 50 && "[&>div]:bg-red-500",
                          passwordValidation.strength >= 50 && passwordValidation.strength < 100 && "[&>div]:bg-yellow-500",
                          passwordValidation.strength === 100 && "[&>div]:bg-green-500"
                        )}
                      />
                    </div>

                    {/* Requirements Checklist */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={cn(
                        "flex items-center space-x-2",
                        passwordValidation.requirements.length ? "text-green-600" : "text-gray-500"
                      )}>
                        {passwordValidation.requirements.length ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div className={cn(
                        "flex items-center space-x-2",
                        passwordValidation.requirements.uppercase ? "text-green-600" : "text-gray-500"
                      )}>
                        {passwordValidation.requirements.uppercase ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Uppercase letter</span>
                      </div>
                      <div className={cn(
                        "flex items-center space-x-2",
                        passwordValidation.requirements.lowercase ? "text-green-600" : "text-gray-500"
                      )}>
                        {passwordValidation.requirements.lowercase ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Lowercase letter</span>
                      </div>
                      <div className={cn(
                        "flex items-center space-x-2",
                        passwordValidation.requirements.special ? "text-green-600" : "text-gray-500"
                      )}>
                        {passwordValidation.requirements.special ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || (password && !passwordValidation.isValid)}
                className="w-full bg-medical-blue hover:bg-medical-blue-dark disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-medical-blue-dark hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-medical-blue-dark"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
