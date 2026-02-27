import { GoogleGenAI } from "@google/genai";
import { SPECIALTIES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getHealthAdvice(query: string) {
  const specialtiesInfo = SPECIALTIES.map(s => `${s.name}: ${s.description}`).join('\n');
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `You are a helpful medical assistant for Vitalis Hospital. 
          
          Our hospital has the following specialties:
          ${specialtiesInfo}

          A user is asking: "${query}". 
          
          Provide a helpful, professional, and empathetic response. 
          If the user's query relates to one of our specialties, mention that we have experts in that field.
          
          IMPORTANT: Always include a disclaimer that this is AI advice and they should consult a real doctor for emergencies or serious symptoms. Keep it concise.` }]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my medical knowledge base right now. Please try again later or contact our hospital directly.";
  }
}
