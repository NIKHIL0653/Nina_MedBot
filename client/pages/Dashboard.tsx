import { useAuth } from "@/lib/auth-context";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  MessageCircle,
  FileText,
  Settings,
  LogOut,
  Activity,
  User,
} from "lucide-react";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
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
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {user.email?.split("@")[0]}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className="text-medical-blue-dark">
              {user.email?.split("@")[0]}
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Your personal health management dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Symptom Analysis */}
          <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-medical-blue/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-medical-blue-dark" />
              </div>
              <CardTitle>Symptom Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our AI to analyze your symptoms and get personalized
                health insights.
              </p>
              <Link to="/chat">
                <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
                  Start Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Medical Records */}
          <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-medical-blue/20 transition-colors">
                <FileText className="w-8 h-8 text-medical-blue-dark" />
              </div>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Track and manage your lab results with automatic range checking
                and analysis.
              </p>
              <Link to="/records">
                <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
                  View Records
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Health Overview */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-medical-blue-dark" />
              </div>
              <CardTitle>Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Recent Consultations
                  </span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Saved Test Results
                  </span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Profile Complete
                  </span>
                  <span className="font-semibold text-medical-blue-dark">
                    75%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-medical-blue-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Ask about symptoms</h3>
                    <p className="text-sm text-gray-600">
                      Describe what you're experiencing
                    </p>
                  </div>
                  <Link to="/chat">
                    <Button size="sm">Start</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-medical-blue-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Add test results</h3>
                    <p className="text-sm text-gray-600">
                      Upload your latest lab work
                    </p>
                  </div>
                  <Link to="/records">
                    <Button size="sm">Add</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
