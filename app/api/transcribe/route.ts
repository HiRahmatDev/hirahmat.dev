import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio") as File;
    const prompt = formData.get("prompt") as string | null;
    const language = formData.get("language") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided", status: 400 },
        { status: 400 }
      );
    }

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "gpt-4o-transcribe",
      ...(prompt ? { prompt } : {}),
      ...(language ? { language } : {}),
    });

    if (!transcription.text || transcription.text.trim() === "null") {
      return NextResponse.json(
        { error: "No speech detected or audio is unclear.", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json({
      transcription: transcription.text,
      status: 200,
    });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio", message: error, status: 500 },
      { status: 500 }
    );
  }
}
