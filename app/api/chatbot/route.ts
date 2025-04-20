import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages) {
    return NextResponse.json({ message: "No messages provided" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅ CHANGED TO gpt-3.5-turbo
      messages: [
        { role: "system", content: "You are a luxury jewelry shopping assistant. Be elegant, helpful, and polite." },
        ...messages,
      ],
      max_tokens: 200,
    });

    const reply = response.choices[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chatbot error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Error generating chatbot response" }, { status: 500 });
  }
}
