import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function screenResume(resumeText: string, jobDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are an expert HR recruiter. Analyze the following resume against the job description.
        
        Job Description:
        ${jobDescription}
        
        Resume:
        ${resumeText}
        
        Provide a JSON response with the following fields:
        - score: A number from 0 to 100 representing the match quality.
        - recommendation: A brief summary of why the candidate is or is not a good fit.
        - result: One of "Excellent", "Good", "Fair", "Poor".
        - action: One of "Auto interview", "Recruiter review", "Manual review", "Auto reject".
      `,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Screening Error:", error);
    return {
      score: 0,
      recommendation: "Error during AI screening.",
      result: "Error",
      action: "Manual review",
    };
  }
}
