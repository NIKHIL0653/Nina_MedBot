import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Save,
  Palette,
  UserCircle,
  Scale,
  Ruler,
  Calendar,
  LogOut,
  Edit,
} from "lucide-react";

export default function Settings() {
  const { user, loading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // User profile state
  const [profile, setProfile] = useState({
    name: user?.email?.split("@")[0] || "",
    age: "",
    height: "",
    weight: "",
  });

  const [savedProfile, setSavedProfile] = useState<typeof profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Save profile to state (in production, this would save to database)
    setSavedProfile({ ...profile });
    setIsEditing(false);

    // Store in localStorage for persistence
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Load saved profile on component mount
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsedProfile = JSON.parse(saved);
      setSavedProfile(parsedProfile);
      setProfile(parsedProfile);
    }
  }, []);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/20 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your profile and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Profile Information</span>
                </div>
                {savedProfile && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditProfile}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {savedProfile && !isEditing ? (
                // Display saved profile as cards
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </span>
                    </div>
                    <p className="font-semibold">
                      {savedProfile.name || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Age
                      </span>
                    </div>
                    <p className="font-semibold">
                      {savedProfile.age
                        ? `${savedProfile.age} years`
                        : "Not provided"}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Height
                      </span>
                    </div>
                    <p className="font-semibold">
                      {savedProfile.height
                        ? `${savedProfile.height} cm`
                        : "Not provided"}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Scale className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Weight
                      </span>
                    </div>
                    <p className="font-semibold">
                      {savedProfile.weight
                        ? `${savedProfile.weight} kg`
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              ) : (
                // Show edit form
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center space-x-2"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileUpdate("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="age"
                        className="flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Age</span>
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={profile.age}
                        onChange={(e) =>
                          handleProfileUpdate("age", e.target.value)
                        }
                        placeholder="Enter your age"
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="height"
                        className="flex items-center space-x-2"
                      >
                        <Ruler className="w-4 h-4" />
                        <span>Height (cm)</span>
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={profile.height}
                        onChange={(e) =>
                          handleProfileUpdate("height", e.target.value)
                        }
                        placeholder="Enter your height in cm"
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="weight"
                        className="flex items-center space-x-2"
                      >
                        <Scale className="w-4 h-4" />
                        <span>Weight (kg)</span>
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={profile.weight}
                        onChange={(e) =>
                          handleProfileUpdate("weight", e.target.value)
                        }
                        placeholder="Enter your weight in kg"
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    {savedProfile && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-blue-400 hover:bg-blue-500 transition-all duration-300"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-primary" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme or use system setting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  For security reasons, email changes require verification
                  through our support team.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signout Section */}
          <Card className="shadow-sm border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Sign Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sign out</p>
                    <p className="text-sm text-muted-foreground">
                      End your current session and return to login
                    </p>
                  </div>
                  <Button
                    onClick={signOut}
                    variant="destructive"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
