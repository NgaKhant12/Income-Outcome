import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFinancialInsights = async (transactions: Transaction[]): Promise<string> => {
  if (transactions.length === 0) {
    return "No transactions recorded yet. Add some income and expenses to get AI insights!";
  }

  // Filter to last 50 transactions to save tokens/context, usually enough for a quick insight
  const recentTransactions = transactions.slice(0, 50);

  const prompt = `
    Act as a friendly, expert personal finance assistant. 
    Analyze the following list of recent financial transactions (JSON format) and provide:
    1. A brief 1-sentence summary of the current financial health.
    2. Three actionable bullet points (HTML formatted using <li>) to improve spending habits or save money.
    3. A positive, encouraging closing remark.
    
    Keep the tone concise, motivating, and easy to read on a mobile device.
    Do not use markdown formatting like **bold** or # headers, just use plain text and standard HTML tags for lists if needed (<ul>, <li>).
    
    Transactions:
    ${JSON.stringify(recentTransactions)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't connect to the insight engine. Please check your internet connection.";
  }
};
