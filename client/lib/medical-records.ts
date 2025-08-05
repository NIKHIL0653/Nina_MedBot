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
    console.log("Saving medical record for user:", userId, record);

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
      console.error("Supabase error saving medical record:", error.message, error);
      return { success: false, error: error.message };
    }

    console.log("Successfully saved medical record:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving medical record:", error instanceof Error ? error.message : String(error), error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export const loadMedicalRecords = async (userId: string): Promise<MedicalRecord[]> => {
  try {
    console.log("Loading medical records for user:", userId);

    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error loading medical records:", error.message, error);
      return [];
    }

    console.log("Loaded medical records data:", data);

    if (!data || data.length === 0) {
      console.log("No medical records found for user");
      return [];
    }

    // Transform the data back to the expected format
    return data.map((record) => {
      try {
        return {
          id: record.test_data.id,
          testName: record.test_data.testName,
          testId: record.test_data.testId,
          date: record.test_data.date,
          parameters: record.test_data.parameters,
        };
      } catch (transformError) {
        console.error("Error transforming record:", record, transformError);
        return null;
      }
    }).filter(record => record !== null) as MedicalRecord[];
  } catch (error) {
    console.error("Unexpected error loading medical records:", error instanceof Error ? error.message : String(error), error);
    return [];
  }
};

export const deleteMedicalRecord = async (userId: string, recordId: string) => {
  try {
    console.log("Deleting medical record for user:", userId, "recordId:", recordId);

    const { error } = await supabase
      .from("medical_records")
      .delete()
      .eq("user_id", userId)
      .eq("test_data->>id", recordId);

    if (error) {
      console.error("Supabase error deleting medical record:", error.message, error);
      return { success: false, error: error.message };
    }

    console.log("Successfully deleted medical record");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error deleting medical record:", error instanceof Error ? error.message : String(error), error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};
