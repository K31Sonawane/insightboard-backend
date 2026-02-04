import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateTasksFromTranscript(transcript: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Convert this meeting transcript into JSON array.

Each task must have:
id, description, priority, dependencies (array of task ids)

Return ONLY valid JSON.

Transcript:
${transcript}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}
