import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Loader2, Check, X, Mail, User } from "lucide-react";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to NINA!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your account has been created successfully. Please check your
                email to verify your account.
              </p>
              <Button
                onClick={() => navigate("/chat")}
                className="w-full h-12 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl"
              >
                Start Your Health Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc8ab0ccd1c1f4c0983053a74f900b6ee%2F80852419a0194244b22ef22578b3e48b?format=webp&width=800"
                alt="Nina AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-4xl font-bold text-foreground">
              NINA
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Join thousands using AI for better health
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create your account to get personalized health insights
          </p>
        </div>

        {/* Register Form */}
        <Card className="shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-center text-2xl font-bold text-foreground">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="h-14 pl-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="h-14 pl-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className={cn(
                    "h-14 border-2 transition-all duration-300 rounded-xl",
                    password && !passwordValidation.isValid && "border-red-300 focus:border-red-500",
                    password && passwordValidation.isValid && "border-green-300 focus:border-green-500",
                    !password && "border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                  )}
                />

                {/* Password Strength Bar */}
                {password && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Strength</span>
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
                    <div className="grid grid-cols-2 gap-3 text-xs">
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
                className="w-full h-14 bg-blue-400 hover:bg-blue-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl text-lg disabled:opacity-50"
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

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-semibold transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
