import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDPoXJwOMxrx5g-C_NKJwOH7-hBavED75M";

const genAI = new GoogleGenerativeAI(API_KEY);

const MEDICAL_PROMPT = `You are Mother.ai, a professional medical AI assistant. You help users analyze their symptoms and provide health insights. 

IMPORTANT GUIDELINES:
- Always be professional, empathetic, and helpful
- Ask follow-up questions to better understand symptoms
- Provide general health information, not specific medical diagnoses
- Always recommend consulting healthcare professionals for serious concerns
- Be conversational but maintain medical professionalism
- Focus on symptom analysis, health tracking, and general wellness advice

When a user describes symptoms:
1. Ask clarifying questions about duration, severity, associated symptoms
2. Provide general information about possible causes
3. Suggest general care measures when appropriate
4. Always emphasize the importance of professional medical consultation

Keep responses concise but thorough, and always maintain a caring, professional tone.`;

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateMedicalResponse(
  userMessage: string,
  conversationHistory: string[] = [],
  retries: number = 2
) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build conversation context
      const context =
        conversationHistory.length > 0
          ? `Previous conversation:\n${conversationHistory.join("\n")}\n\nCurrent message: ${userMessage}`
          : userMessage;

      const prompt = `${MEDICAL_PROMPT}\n\nUser: ${context}\n\nMother.ai:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error: any) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      // Check if it's a 503 service unavailable error
      if (error?.message?.includes('[503]') || error?.status === 503) {
        if (attempt < retries) {
          // Wait before retrying (exponential backoff)
          const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
          console.log(`Service temporarily unavailable. Retrying in ${waitTime}ms...`);
          await delay(waitTime);
          continue;
        } else {
          return "I'm currently experiencing high demand and can't process your request right now. Please try again in a few minutes. The service should be back to normal shortly.";
        }
      }

      // Check for rate limiting
      if (error?.message?.includes('[429]') || error?.status === 429) {
        if (attempt < retries) {
          await delay(2000); // Wait 2 seconds for rate limiting
          continue;
        } else {
          return "I'm receiving too many requests right now. Please wait a moment and try again.";
        }
      }

      // For other errors, don't retry
      if (attempt === retries) {
        return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, and if the issue persists, please contact support.";
      }
    }
  }

  return "Unable to process your request after multiple attempts. Please try again later.";
}

export async function generateHealthInsight(
  symptoms: string[],
  duration: string,
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${MEDICAL_PROMPT}

The user has reported the following symptoms: ${symptoms.join(", ")}
Duration: ${duration}

Please provide a comprehensive but concise health insight including:
1. Possible general causes or conditions to consider
2. Questions they should ask themselves or track
3. General care recommendations
4. When to seek immediate medical attention
5. Lifestyle factors that might help

Remember to be professional and emphasize that this is general information, not a diagnosis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating health insight:", error);
    return "I'm unable to generate a health insight at this time. Please try again later.";
  }
}
