import { supabase } from "@shared/supabase";

export interface MedicalRecord {
  id: string;
  testName: string;
  testId: string;
  date: string;
  parameters: {
    name: string;
    unit: string;
    normalRange: string;
    value: string;
    status?: "normal" | "high" | "low";
  }[];
}

export const saveMedicalRecord = async (userId: string, record: MedicalRecord) => {
  try {
    const { data, error } = await supabase
      .from("medical_records")
      .insert({
        user_id: userId,
        test_type: record.testId,
        test_data: {
          id: record.id,
          testName: record.testName,
          testId: record.testId,
          date: record.date,
          parameters: record.parameters,
        },
      });

    if (error) {
      console.error("Error saving medical record:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error saving medical record:", error);
    return { success: false, error };
  }
};

export const loadMedicalRecords = async (userId: string): Promise<MedicalRecord[]> => {
  try {
    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading medical records:", error);
      return [];
    }

    // Transform the data back to the expected format
    return data.map((record) => ({
      id: record.test_data.id,
      testName: record.test_data.testName,
      testId: record.test_data.testId,
      date: record.test_data.date,
      parameters: record.test_data.parameters,
    }));
  } catch (error) {
    console.error("Error loading medical records:", error);
    return [];
  }
};

export const deleteMedicalRecord = async (userId: string, recordId: string) => {
  try {
    const { error } = await supabase
      .from("medical_records")
      .delete()
      .eq("user_id", userId)
      .eq("test_data->>id", recordId);

    if (error) {
      console.error("Error deleting medical record:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting medical record:", error);
    return { success: false, error };
  }
};
