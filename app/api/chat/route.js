import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINAI_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: text }]
          }
        ]
      },
      
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data); // 응답의 전체 구조를 출력하여 확인합니다.

    // 여기서 응답 구조를 확인한 후, 적절한 경로로 접근하도록 수정합니다.
    const output = response.data.candidates[0].content.parts[0].text;

    return NextResponse.json({ output });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch response from Gemini API" },
      { status: 500 }
    );
  }
}
