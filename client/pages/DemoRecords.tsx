import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Save,
  Calendar,
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  MessageCircle,
  Stethoscope,
  User,
  Moon,
  Sun,
  BarChart3,
  AlertCircle,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  Menu,
  X,
  Pill,
  Heart,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRecords() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTest, setSelectedTest] = useState("cbc");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testResults = [
    {
      name: "BUN, Ser/Plas",
      value: "15.0",
      unit: "mg/dL",
      range: "6.0 - 20.0",
      status: "normal",
      progress: 45,
    },
    {
      name: "Platelet count",
      value: "192.0",
      unit: "K/μL",
      range: "150.0 - 400.0",
      status: "normal",
      progress: 17,
    },
    {
      name: "Imm. Granulocyte, %",
      value: "0.3",
      unit: "%",
      range: "0.0 - 0.7",
      status: "normal",
      progress: 43,
    },
    {
      name: "Anion Gap",
      value: "9.0",
      unit: "mmol/L",
      range: "5.0 - 15.0",
      status: "normal",
      progress: 40,
    },
    {
      name: "RDW",
      value: "12.4",
      unit: "%",
      range: "11.5 - 14.5",
      status: "normal",
      progress: 30,
    },
    {
      name: "Hemoglobin",
      value: "14.0",
      unit: "g/dL",
      range: "13.5 - 17.7",
      status: "normal",
      progress: 12,
    },
  ];

  const getStatusColor = (status: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return "text-red-600";
      case "low":
        return "text-yellow-600";
      case "normal":
        return "text-green-600";
    }
  };

  const getProgressColor = (status: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return "bg-red-500";
      case "low":
        return "bg-yellow-500";
      case "normal":
        return "bg-green-500";
    }
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <nav className="bg-sky-50 border-b border-sky-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mother.ai
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Records
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {/* Desktop User Controls */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-700"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl border border-gray-200"
                    >
                      <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        demo_user
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-sky-200 bg-white">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Records
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full justify-start text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Header */}
        <div className="bg-sky-50 px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Clinical Records
            </h1>
            <Button className="text-sm text-gray-600 flex items-center space-x-2">
              <UserCircle className="w-4 h-4" />
              <span>Your Account</span>
            </Button>
          </div>

          {/* Add Records Button */}
          <Button className="w-full bg-sky-400 hover:bg-sky-500 text-white rounded-2xl py-3 mb-6">
            <Plus className="w-5 h-5 mr-2" />
            Add more records
          </Button>

          {/* Test Selection */}
          <div className="mb-4">
            <Select value={selectedTest} onValueChange={setSelectedTest}>
              <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl">
                <SelectValue placeholder="Select a test type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                <SelectItem value="lft">Liver Function Test</SelectItem>
                <SelectItem value="kft">Kidney Function Test</SelectItem>
                <SelectItem value="lipid">Lipid Profile</SelectItem>
                <SelectItem value="thyroid">Thyroid Function Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Test Results */}
        <div className="px-4 sm:px-6 space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {result.name}
                  </h3>
                  <p className="text-xs text-gray-500">{result.range}</p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-bold text-lg",
                      getStatusColor(result.status),
                    )}
                  >
                    {result.value}
                  </p>
                  <p className="text-xs text-gray-500">{result.unit}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full",
                      getProgressColor(result.status),
                    )}
                    style={{ width: `${result.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Date Section */}
        <div className="px-4 sm:px-6 py-6">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl text-sky-500"
          >
            <span className="font-medium">May 3, 2024</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">22 items</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </Button>
        </div>

        {/* Collapsible Sections */}
        <div className="px-4 sm:px-6 space-y-4">
          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 text-sky-500">
              <div className="flex items-center space-x-3">
                <Pill className="w-5 h-5" />
                <span className="font-medium">Medications</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-2">
              <p className="text-sm text-gray-600">No medications recorded</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 text-sky-500">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Vital Signs</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-2">
              <p className="text-sm text-gray-600">No vital signs recorded</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 text-sky-500">
              <div className="flex items-center space-x-3">
                <Clipboard className="w-5 h-5" />
                <span className="font-medium">Clinical Notes</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-2">
              <p className="text-sm text-gray-600">
                No clinical notes recorded
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2"
            >
              <MessageCircle className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-500">Chat</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2"
            >
              <FileText className="w-5 h-5 text-sky-500" />
              <span className="text-xs text-sky-500 font-medium">
                Health records
              </span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2"
            >
              <BarChart3 className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-500">Dashboard</span>
            </Button>
          </div>
        </div>

        {/* Add padding at bottom for fixed navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
