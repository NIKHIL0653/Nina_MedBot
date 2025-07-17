import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  ArrowLeft,
  Save,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

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
      { name: "Potassium (K��)", unit: "mmol/L", normalRange: "3.5–5.0" },
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
  const [activeTest, setActiveTest] = useState(medicalTests[0].id);
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
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue"></div>
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
        return "bg-red-100 text-red-800 border-red-200";
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const currentTest = testData[activeTest];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-medical-blue">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Medical Records</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs
          value={activeTest}
          onValueChange={setActiveTest}
          className="space-y-6"
        >
          {/* Test Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Select Medical Test</h2>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-gray-50 p-2">
              {medicalTests.map((test) => (
                <TabsTrigger
                  key={test.id}
                  value={test.id}
                  className="text-sm p-3 data-[state=active]:bg-medical-blue data-[state=active]:text-white"
                >
                  {test.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Test Input Form */}
          {medicalTests.map((test) => (
            <TabsContent key={test.id} value={test.id}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Input Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-6 h-6 text-medical-blue-dark" />
                        <span>{test.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentTest?.parameters.map((param, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`param-${index}`}>
                              {param.name}
                              {param.unit && (
                                <span className="text-gray-500 ml-1">
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
                              />
                              <p className="text-xs text-gray-500">
                                Normal: {param.normalRange}
                              </p>
                              {param.value && param.status && (
                                <Badge
                                  className={`${getStatusColor(
                                    param.status,
                                  )} flex items-center space-x-1 w-fit`}
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
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={saveRecord}
                          className="bg-medical-blue hover:bg-medical-blue-dark"
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Test Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentTest?.parameters
                          .filter((p) => p.value && p.value.trim() !== "")
                          .map((param, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm font-medium">
                                {param.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">
                                  {param.value} {param.unit}
                                </span>
                                {param.status && (
                                  <Badge
                                    className={`${getStatusColor(
                                      param.status,
                                    )} text-xs px-2 py-1`}
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
                          <p className="text-sm text-gray-500 text-center py-4">
                            No values entered yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Saved Records */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Saved Records</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {savedRecords.map((record) => (
                          <div
                            key={record.id}
                            className="border border-gray-200 rounded-lg p-3"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">
                                {record.testName}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {record.date}
                              </span>
                            </div>
                            <div className="space-y-1">
                              {record.parameters
                                .slice(0, 3)
                                .map((param: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-xs"
                                  >
                                    <span>{param.name}:</span>
                                    <div className="flex items-center space-x-1">
                                      <span>
                                        {param.value} {param.unit}
                                      </span>
                                      {param.status && (
                                        <Badge
                                          className={`${getStatusColor(
                                            param.status,
                                          )} text-xs px-1 py-0`}
                                        >
                                          {param.status}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              {record.parameters.length > 3 && (
                                <p className="text-xs text-gray-500">
                                  +{record.parameters.length - 3} more
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                        {savedRecords.length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No saved records yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
