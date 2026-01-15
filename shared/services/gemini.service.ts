
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTutorResponse = async (history: { role: string; text: string }[], userMessage: string) => {
  const model = 'gemini-3-pro-preview';
  const contents = [
    ...history.map(h => ({ 
      role: h.role === 'model' ? 'model' : 'user', 
      parts: [{ text: h.text }] 
    })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: "You are Lumina, a friendly and highly knowledgeable AI academic tutor. Explain complex concepts simply, encourage students, and provide step-by-step guidance. Use Markdown for formatting equations or key terms.",
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting right now. Let's try that again in a moment!";
  }
};

export const generateQuiz = async (topic: string) => {
  const model = 'gemini-3-flash-preview';
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Generate a 5-question multiple choice quiz about: ${topic}. Each question must have exactly 4 options and one correct answer index (0-3).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });
    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return null;
  }
};
