import { GoogleGenAI } from "@google/genai";
import { BuildingType, PlacedBuilding } from '../types';

// Initialize Gemini safely. 
// Check if process is defined to avoid crashes in browser environments without polyfills
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getCityAdvice = async (
  money: number,
  population: number,
  buildings: PlacedBuilding[]
): Promise<string> => {
  if (!ai) {
    return "Секретарь: «Господин мэр, мы не можем связаться с центром (API Key missing). Стройте больше ларьков!»";
  }

  // Count buildings
  const counts: Record<string, number> = {};
  buildings.forEach(b => {
    counts[b.type] = (counts[b.type] || 0) + 1;
  });

  const prompt = `
    Ты саркастичный и немного депрессивный советник мэра типичного пост-советского города.
    
    Статистика города:
    - Бюджет: ${money} рублей
    - Население: ${population} человек
    - Постройки:
      ${Object.entries(counts).map(([type, count]) => `- ${type}: ${count}`).join('\n')}

    Дай короткий совет (максимум 2 предложения) на русском языке, что делать дальше. 
    Используй сленг (панельки, завод, спальник, маршрутка). 
    Будь смешным. Если много ларьков, шути про шаурму. Если много заводов, шути про экологию.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Секретарь что-то неразборчиво бормочет...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Связь с центром потеряна. Попробуйте позже.";
  }
};