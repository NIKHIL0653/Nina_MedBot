import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
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
import MainLayout from "@/components/MainLayout";
import {
  Save,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestParameter {
  name: string;
  unit: string;
  normalRange: string;
  value?: string;
  status?: "normal" | "high" | "low";
}

interface MedicalTest {
  id: string;
  name: string;
  parameters: TestParameter[];
}

const medicalTests: MedicalTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    parameters: [
      {
        name: "Hemoglobin",
        unit: "g/dL",
        normalRange: "13.5–17.5 (M), 12.0–15.5 (F)",
      },
      { name: "WBC Count", unit: "cells/mcL", normalRange: "4,500–11,000" },
      {
        name: "RBC Count",
        unit: "million/mcL",
        normalRange: "4.7–6.1 (M), 4.2–5.4 (F)",
      },
      { name: "Hematocrit", unit: "%", normalRange: "41–50 (M), 36–44 (F)" },
      { name: "Platelet Count", unit: "/mcL", normalRange: "150,000–450,000" },
      { name: "MCV", unit: "fL", normalRange: "80–100" },
      { name: "MCH", unit: "pg", normalRange: "27–33" },
      { name: "MCHC", unit: "g/dL", normalRange: "32–36" },
      { name: "RDW", unit: "%", normalRange: "11.5–14.5" },
    ],
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    parameters: [
      { name: "ALT (SGPT)", unit: "U/L", normalRange: "7–56" },
      { name: "AST (SGOT)", unit: "U/L", normalRange: "10–40" },
      { name: "ALP", unit: "IU/L", normalRange: "44–147" },
      { name: "Bilirubin Total", unit: "mg/dL", normalRange: "0.1–1.2" },
      { name: "Bilirubin Direct", unit: "mg/dL", normalRange: "0–0.3" },
      { name: "Albumin", unit: "g/dL", normalRange: "3.4–5.4" },
      { name: "Total Protein", unit: "g/dL", normalRange: "6.0–8.3" },
      { name: "GGT", unit: "U/L", normalRange: "8–61" },
    ],
  },
  {
    id: "kft",
    name: "Kidney Function Test (KFT)",
    parameters: [
      { name: "Creatinine", unit: "mg/dL", normalRange: "0.6–1.3" },
      { name: "Urea", unit: "mg/dL", normalRange: "7–20" },
      { name: "Uric Acid", unit: "mg/dL", normalRange: "3.5–7.2" },
      { name: "BUN", unit: "mg/dL", normalRange: "6–24" },
      { name: "eGFR", unit: "mL/min/1.73 m²", normalRange: "> 90" },
      { name: "Sodium", unit: "mmol/L", normalRange: "135–145" },
      { name: "Potassium", unit: "mmol/L", normalRange: "3.5–5.0" },
    ],
  },
  {
    id: "lipid",
    name: "Lipid Profile",
    parameters: [
      { name: "Total Cholesterol", unit: "mg/dL", normalRange: "< 200" },
      {
        name: "HDL",
        unit: "mg/dL",
        normalRange: "> 40 (M), > 50 (F)",
      },
      { name: "LDL", unit: "mg/dL", normalRange: "< 100" },
      { name: "Triglycerides", unit: "mg/dL", normalRange: "< 150" },
      { name: "VLDL", unit: "mg/dL", normalRange: "5–40" },
      { name: "Cholesterol/HDL Ratio", unit: "", normalRange: "< 5" },
    ],
  },
  {
    id: "tft",
    name: "Thyroid Function Test (TFT)",
    parameters: [
      { name: "TSH", unit: "mIU/L", normalRange: "0.4–4.0" },
      { name: "Free T3", unit: "pg/mL", normalRange: "2.3–4.2" },
      { name: "Free T4", unit: "ng/dL", normalRange: "0.8–1.8" },
      { name: "Total T3", unit: "ng/dL", normalRange: "80–200" },
      { name: "Total T4", unit: "µg/dL", normalRange: "5.0–12.0" },
    ],
  },
  {
    id: "blood-sugar",
    name: "Blood Sugar Test",
    parameters: [
      { name: "Fasting Blood Glucose", unit: "mg/dL", normalRange: "70–99" },
      {
        name: "Postprandial Glucose",
        unit: "mg/dL",
        normalRange: "< 140",
      },
      { name: "Random Blood Sugar", unit: "mg/dL", normalRange: "< 200" },
      { name: "Insulin (Fasting)", unit: "µIU/mL", normalRange: "2–25" },
    ],
  },
  {
    id: "urine",
    name: "Urine Routine Test",
    parameters: [
      { name: "Color", unit: "", normalRange: "Pale Yellow" },
      { name: "pH", unit: "", normalRange: "4.5–8.0" },
      { name: "Specific Gravity", unit: "", normalRange: "1.005–1.030" },
      { name: "Protein", unit: "", normalRange: "Negative" },
      { name: "Glucose", unit: "", normalRange: "Negative" },
      { name: "Ketones", unit: "", normalRange: "Negative" },
      { name: "RBCs", unit: "/HPF", normalRange: "0–2" },
      { name: "WBCs", unit: "/HPF", normalRange: "0–5" },
      { name: "Epithelial Cells", unit: "", normalRange: "Occasional" },
    ],
  },
  {
    id: "vitamin-d",
    name: "Vitamin D Test",
    parameters: [
      { name: "25(OH) Vitamin D", unit: "ng/mL", normalRange: "30–100" },
    ],
  },
  {
    id: "hba1c",
    name: "HbA1c Test",
    parameters: [
      {
        name: "HbA1c",
        unit: "%",
        normalRange:
          "< 5.7% (Normal), 5.7–6.4% (Prediabetic), ≥ 6.5% (Diabetic)",
      },
    ],
  },
  {
    id: "electrolytes",
    name: "Electrolyte Panel",
    parameters: [
      { name: "Sodium (Na⁺)", unit: "mmol/L", normalRange: "135–145" },
      { name: "Potassium (K⁺)", unit: "mmol/L", normalRange: "3.5–5.0" },
      { name: "Chloride (Cl⁻)", unit: "mmol/L", normalRange: "98–106" },
      { name: "Bicarbonate (HCO₃⁻)", unit: "mmol/L", normalRange: "22–29" },
      { name: "Calcium (Total)", unit: "mg/dL", normalRange: "8.6–10.2" },
      { name: "Magnesium", unit: "mg/dL", normalRange: "1.7–2.2" },
      { name: "Phosphate", unit: "mg/dL", normalRange: "2.5–4.5" },
    ],
  },
];

export default function Records() {
  const { user, loading } = useAuth();
  const [activeTest, setActiveTest] = useState<string>("");
  const [testData, setTestData] = useState<Record<string, MedicalTest>>({});
  const [savedRecords, setSavedRecords] = useState<any[]>([]);

  useEffect(() => {
    // Initialize test data with empty values
    const initialData: Record<string, MedicalTest> = {};
    medicalTests.forEach((test) => {
      initialData[test.id] = {
        ...test,
        parameters: test.parameters.map((param) => ({ ...param, value: "" })),
      };
    });
    setTestData(initialData);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const evaluateValue = (
    value: string,
    normalRange: string,
  ): "normal" | "high" | "low" => {
    if (!value || value.trim() === "") return "normal";

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "normal";

    // Simple range checking (can be enhanced)
    if (normalRange.includes("–")) {
      const ranges = normalRange.match(/(\d+\.?\d*)–(\d+\.?\d*)/);
      if (ranges) {
        const min = parseFloat(ranges[1]);
        const max = parseFloat(ranges[2]);
        if (numValue < min) return "low";
        if (numValue > max) return "high";
        return "normal";
      }
    }

    if (normalRange.includes("<")) {
      const maxMatch = normalRange.match(/<\s*(\d+\.?\d*)/);
      if (maxMatch) {
        const max = parseFloat(maxMatch[1]);
        if (numValue >= max) return "high";
        return "normal";
      }
    }

    if (normalRange.includes(">")) {
      const minMatch = normalRange.match(/>\s*(\d+\.?\d*)/);
      if (minMatch) {
        const min = parseFloat(minMatch[1]);
        if (numValue <= min) return "low";
        return "normal";
      }
    }

    return "normal";
  };

  const updateParameterValue = (
    testId: string,
    paramIndex: number,
    value: string,
  ) => {
    setTestData((prev) => {
      const newData = { ...prev };
      const test = { ...newData[testId] };
      const param = { ...test.parameters[paramIndex] };
      param.value = value;
      param.status = evaluateValue(value, param.normalRange);
      test.parameters[paramIndex] = param;
      newData[testId] = test;
      return newData;
    });
  };

  const saveRecord = () => {
    if (!activeTest) return;

    const currentTest = testData[activeTest];
    const record = {
      id: Date.now().toString(),
      testName: currentTest.name,
      testId: activeTest,
      date: new Date().toISOString().split("T")[0],
      parameters: currentTest.parameters.filter(
        (p) => p.value && p.value.trim() !== "",
      ),
    };

    setSavedRecords((prev) => [record, ...prev]);

    // Clear current test data
    setTestData((prev) => {
      const newData = { ...prev };
      const test = { ...newData[activeTest] };
      test.parameters = test.parameters.map((param) => ({
        ...param,
        value: "",
        status: undefined,
      }));
      newData[activeTest] = test;
      return newData;
    });
  };

  const getStatusColor = (status?: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getStatusIcon = (status?: "normal" | "high" | "low") => {
    switch (status) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "low":
        return <AlertTriangle className="w-4 h-4" />;
      case "normal":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const currentTest = activeTest ? testData[activeTest] : null;

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/20 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto p-6">
          <div className="space-y-6">
            {/* Test Selection */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Select Medical Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={activeTest} onValueChange={setActiveTest}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a medical test to begin" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicalTests.map((test) => (
                      <SelectItem key={test.id} value={test.id}>
                        {test.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Test Input Form - only show when a test is selected */}
            {activeTest &&
              (() => {
                const selectedTest = medicalTests.find(
                  (test) => test.id === activeTest,
                );
                if (!selectedTest) return null;
                return (
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Input Form */}
                    <div className="lg:col-span-2">
                      <Card className="shadow-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <span>{selectedTest.name}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {currentTest?.parameters.map((param, index) => (
                              <div key={index} className="space-y-3">
                                <Label
                                  htmlFor={`param-${index}`}
                                  className="text-sm font-medium"
                                >
                                  {param.name}
                                  {param.unit && (
                                    <span className="text-muted-foreground ml-1">
                                      ({param.unit})
                                    </span>
                                  )}
                                </Label>
                                <div className="space-y-2">
                                  <Input
                                    id={`param-${index}`}
                                    value={param.value || ""}
                                    onChange={(e) =>
                                      updateParameterValue(
                                        activeTest,
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`Enter ${param.name.toLowerCase()}`}
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Normal: {param.normalRange}
                                  </p>
                                  {param.value && param.status && (
                                    <Badge
                                      className={cn(
                                        "flex items-center space-x-1 w-fit transition-all duration-300",
                                        getStatusColor(param.status),
                                      )}
                                    >
                                      {getStatusIcon(param.status)}
                                      <span className="capitalize">
                                        {param.status}
                                      </span>
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 flex justify-end">
                            <Button
                              onClick={saveRecord}
                              className="bg-blue-400 hover:bg-blue-500 transition-all duration-300"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Record
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Summary & Saved Records */}
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
                            {currentTest?.parameters
                              .filter((p) => p.value && p.value.trim() !== "")
                              .map((param, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted"
                                >
                                  <span className="text-sm font-medium">
                                    {param.name}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold">
                                      {param.value} {param.unit}
                                    </span>
                                    {param.status && (
                                      <Badge
                                        className={cn(
                                          "text-xs px-2 py-1",
                                          getStatusColor(param.status),
                                        )}
                                      >
                                        {param.status}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            {!currentTest?.parameters.some(
                              (p) => p.value && p.value.trim() !== "",
                            ) && (
                              <p className="text-sm text-muted-foreground text-center py-8">
                                No values entered yet
                              </p>
                            )}
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
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {savedRecords.map((record) => (
                              <div
                                key={record.id}
                                className="border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-medium text-sm">
                                    {record.testName}
                                  </h4>
                                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {record.date}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  {record.parameters
                                    .slice(0, 3)
                                    .map((param: any, idx: number) => (
                                      <div
                                        key={idx}
                                        className="flex justify-between text-xs"
                                      >
                                        <span className="text-muted-foreground">
                                          {param.name}:
                                        </span>
                                        <div className="flex items-center space-x-1">
                                          <span className="font-medium">
                                            {param.value} {param.unit}
                                          </span>
                                          {param.status && (
                                            <Badge
                                              className={cn(
                                                "text-xs px-1 py-0",
                                                getStatusColor(param.status),
                                              )}
                                            >
                                              {param.status}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  {record.parameters.length > 3 && (
                                    <p className="text-xs text-muted-foreground">
                                      +{record.parameters.length - 3} more
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                            {savedRecords.length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-8">
                                No saved records yet
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
