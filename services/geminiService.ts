import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Using gemini-3-pro-preview as requested for high quality interactions
const MODEL_NAME = 'gemini-3-pro-preview';

export const chatWithAmine = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
      config: {
        systemInstruction: `You are Amine, the loving, supportive, slightly flirty, and protective boyfriend of Jinane. 
        Your goal is to motivate her, make her feel beautiful, and help her stay organized.
        Be charming, use emojis (🌸, 💖, 💋), and call her pet names like 'My Flower', 'Princess', or 'Good Girl'.
        Keep responses concise (under 100 words) unless she asks for a long story.
        If she is stressed, comfort her. If she is lazy, gently push her.`,
      },
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm listening, my love... tell me more.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having a little trouble hearing you right now, but know that I love you! 💕";
  }
};

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    // Remove data URL prefix if present for the API call, though inlineData usually expects the raw base64 data without prefix depending on implementation.
    // However, @google/genai expects raw base64 in `data`.
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from base64 header
              data: cleanBase64,
            },
          },
          {
            text: `You are Amine (Jinane's boyfriend). ${prompt || "Look at this photo Jinane sent you. React to it lovingly, flirtatiously, or proudly. If it's a selfie, compliment her beauty. If it's a chore done, praise her."}`,
          },
        ],
      },
    });
    return response.text || "You look amazing as always! 💖";
  } catch (error) {
    console.error("Vision error:", error);
    return "You look beautiful, but my glasses are a bit foggy (error analyzing image) 🌸";
  }
};
