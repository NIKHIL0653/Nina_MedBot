import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRecords() {
  const [darkMode, setDarkMode] = useState(false);

  const demoData = {
    hemoglobin: "14.2",
    wbc: "11200",
    platelets: "280000",
    hematocrit: "42",
  };

  const getStatusColor = (status: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return "bg-red-50 text-red-800 border-red-200";
      case "low":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "normal":
        return "bg-green-50 text-green-800 border-green-200";
    }
  };

  const getStatusIcon = (status: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return <AlertCircle className="w-3 h-3" />;
      case "low":
        return <AlertTriangle className="w-3 h-3" />;
      case "normal":
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
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
                  <p className="text-xs text-gray-600">
                    AI Healthcare Assistant
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-2">
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

              {/* User Controls */}
              <div className="flex items-center space-x-3">
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

                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl">
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    demo_user
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Medical Records
                  </h1>
                  <p className="text-gray-600">
                    Track and analyze your lab results
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="cbc" className="space-y-6">
              {/* Test Selection */}
              <Card className="shadow-sm border border-gray-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-sky-500" />
                    <span>Select Medical Test</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-gray-100 p-2 rounded-xl">
                    <TabsTrigger
                      value="cbc"
                      className="text-sm p-3 data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-lg"
                    >
                      Complete Blood Count (CBC)
                    </TabsTrigger>
                    <TabsTrigger
                      value="lft"
                      className="text-sm p-3 data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-lg"
                    >
                      Liver Function Test (LFT)
                    </TabsTrigger>
                    <TabsTrigger
                      value="kft"
                      className="text-sm p-3 data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-lg"
                    >
                      Kidney Function Test (KFT)
                    </TabsTrigger>
                    <TabsTrigger
                      value="lipid"
                      className="text-sm p-3 data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-lg"
                    >
                      Lipid Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="thyroid"
                      className="text-sm p-3 data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-lg"
                    >
                      Thyroid Function Test
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>

              {/* CBC Test Content */}
              <TabsContent value="cbc">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Input Form */}
                  <div className="lg:col-span-2">
                    <Card className="shadow-sm border border-gray-200 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-sky-500" />
                          <span>Complete Blood Count (CBC)</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-900">
                              Hemoglobin (g/dL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.hemoglobin}
                                className="rounded-xl border-gray-200 focus:border-sky-500"
                              />
                              <p className="text-xs text-gray-500">
                                Normal: 13.5–17.5 (M), 12.0–15.5 (F)
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit",
                                  getStatusColor("normal"),
                                )}
                              >
                                {getStatusIcon("normal")}
                                <span>Normal</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-900">
                              WBC Count (cells/mcL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.wbc}
                                className="rounded-xl border-gray-200 focus:border-sky-500"
                              />
                              <p className="text-xs text-gray-500">
                                Normal: 4,500–11,000
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit",
                                  getStatusColor("high"),
                                )}
                              >
                                {getStatusIcon("high")}
                                <span>High</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-900">
                              Platelet Count (/mcL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.platelets}
                                className="rounded-xl border-gray-200 focus:border-sky-500"
                              />
                              <p className="text-xs text-gray-500">
                                Normal: 150,000–450,000
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit",
                                  getStatusColor("normal"),
                                )}
                              >
                                {getStatusIcon("normal")}
                                <span>Normal</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-900">
                              Hematocrit (%)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.hematocrit}
                                className="rounded-xl border-gray-200 focus:border-sky-500"
                              />
                              <p className="text-xs text-gray-500">
                                Normal: 41–50 (M), 36–44 (F)
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit",
                                  getStatusColor("normal"),
                                )}
                              >
                                {getStatusIcon("normal")}
                                <span>Normal</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                          <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-6">
                            <Save className="w-4 h-4 mr-2" />
                            Save Record
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Summary & Records */}
                  <div className="space-y-6">
                    {/* Current Test Summary */}
                    <Card className="shadow-sm border border-gray-200 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-sky-500" />
                          <span>Test Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-900">
                              Hemoglobin
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900">
                                14.2 g/dL
                              </span>
                              <Badge
                                className={cn(
                                  "text-xs px-2 py-1",
                                  getStatusColor("normal"),
                                )}
                              >
                                Normal
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-900">
                              WBC Count
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900">
                                11.2K cells/mcL
                              </span>
                              <Badge
                                className={cn(
                                  "text-xs px-2 py-1",
                                  getStatusColor("high"),
                                )}
                              >
                                High
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-900">
                              Platelet Count
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900">
                                280K /mcL
                              </span>
                              <Badge
                                className={cn(
                                  "text-xs px-2 py-1",
                                  getStatusColor("normal"),
                                )}
                              >
                                Normal
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Saved Records */}
                    <Card className="shadow-sm border border-gray-200 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-sky-500" />
                          <span>Saved Records</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="border border-gray-200 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium text-sm text-gray-900">
                                Complete Blood Count (CBC)
                              </h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                2024-01-15
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                  Hemoglobin:
                                </span>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium text-gray-900">
                                    13.8 g/dL
                                  </span>
                                  <Badge
                                    className={cn(
                                      "text-xs px-1 py-0",
                                      getStatusColor("normal"),
                                    )}
                                  >
                                    Normal
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                  WBC Count:
                                </span>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium text-gray-900">
                                    8.5K cells/mcL
                                  </span>
                                  <Badge
                                    className={cn(
                                      "text-xs px-1 py-0",
                                      getStatusColor("normal"),
                                    )}
                                  >
                                    Normal
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                +4 more parameters
                              </p>
                            </div>
                          </div>
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">
                              No other saved records
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
