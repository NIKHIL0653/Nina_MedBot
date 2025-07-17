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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRecords() {
  const [darkMode, setDarkMode] = useState(false);

  const demoData = {
    hemoglobin: "14.2",
    wbc: "11200",
    platelets: "280000",
  };

  const getStatusColor = (status: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Mother.ai
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    AI Healthcare Assistant
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative group transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Chat
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="relative group transition-all duration-300 bg-primary text-primary-foreground shadow-md"
                >
                  <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Records
                  <div className="absolute inset-0 bg-primary rounded-md opacity-20 blur-sm"></div>
                </Button>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="group transition-all duration-300 hover:bg-accent"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  ) : (
                    <Moon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  )}
                </Button>

                <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">demo_user</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-4rem)] bg-muted/20">
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Medical Records
                  </h1>
                  <p className="text-muted-foreground">
                    Track and analyze your lab results
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="cbc" className="space-y-6">
              {/* Test Selection */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Select Medical Test</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-muted p-2">
                    <TabsTrigger
                      value="cbc"
                      className="text-sm p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-accent"
                    >
                      Complete Blood Count (CBC)
                    </TabsTrigger>
                    <TabsTrigger
                      value="lft"
                      className="text-sm p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-accent"
                    >
                      Liver Function Test (LFT)
                    </TabsTrigger>
                    <TabsTrigger
                      value="kft"
                      className="text-sm p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-accent"
                    >
                      Kidney Function Test (KFT)
                    </TabsTrigger>
                    <TabsTrigger
                      value="lipid"
                      className="text-sm p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-accent"
                    >
                      Lipid Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="thyroid"
                      className="text-sm p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-accent"
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
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <span>Complete Blood Count (CBC)</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Hemoglobin (g/dL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.hemoglobin}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              <p className="text-xs text-muted-foreground">
                                Normal: 13.5–17.5 (M), 12.0–15.5 (F)
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit transition-all duration-300",
                                  getStatusColor("normal"),
                                )}
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Normal</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              WBC Count (cells/mcL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.wbc}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              <p className="text-xs text-muted-foreground">
                                Normal: 4,500–11,000
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit transition-all duration-300",
                                  getStatusColor("high"),
                                )}
                              >
                                <AlertTriangle className="w-4 h-4" />
                                <span>High</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Platelet Count (/mcL)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                value={demoData.platelets}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              <p className="text-xs text-muted-foreground">
                                Normal: 150,000–450,000
                              </p>
                              <Badge
                                className={cn(
                                  "flex items-center space-x-1 w-fit transition-all duration-300",
                                  getStatusColor("normal"),
                                )}
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Normal</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Hematocrit (%)
                            </Label>
                            <div className="space-y-2">
                              <Input
                                placeholder="Enter hematocrit value"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              <p className="text-xs text-muted-foreground">
                                Normal: 41–50 (M), 36–44 (F)
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-green-500" />
                          <span>Test Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted">
                            <span className="text-sm font-medium">
                              Hemoglobin
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">
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
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted">
                            <span className="text-sm font-medium">
                              WBC Count
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">
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
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted">
                            <span className="text-sm font-medium">
                              Platelet Count
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">
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
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span>Saved Records</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium text-sm">
                                Complete Blood Count (CBC)
                              </h4>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                2024-01-15
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Hemoglobin:
                                </span>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">13.8 g/dL</span>
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
                                <span className="text-muted-foreground">
                                  WBC Count:
                                </span>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">
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
                              <p className="text-xs text-muted-foreground">
                                +4 more parameters
                              </p>
                            </div>
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
