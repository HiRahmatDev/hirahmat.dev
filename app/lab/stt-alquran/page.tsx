"use client";

import { useState } from "react";

import { AudioRecorder } from "./components/AudioRecorder";
import { PROMPT } from "./lib/constants";
import { Transcription } from "./components/Transcription";

export default function SttAlquranPage() {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleTranscribe = async (audioURL: string) => {
    if (!audioURL) return;

    setIsTranscribing(true);
    setTranscription(null);

    try {
      const audioBlob = await fetch(audioURL).then((res) => res.blob());
      const formData = new FormData();
      formData.append("audio", new File([audioBlob], "recording.webm"));
      formData.append("prompt", PROMPT);
      formData.append("language", "ar");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setTranscription(data.transcription);
      } else {
        console.error("Transcription error:", data.error);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-calc(64px+88px))]">
      <div className="container">
        <h1 className="text-3xl tracking-[-1px] font-bold text-center mb-6">
          Speech-to-text Alquran
        </h1>
        <div>
          <Transcription
            isTranscribing={isTranscribing}
            transcription={transcription}
          />
          <AudioRecorder
            onStopRecording={handleTranscribe}
            className="flex justify-center"
          />
        </div>
      </div>
    </div>
  );
}
