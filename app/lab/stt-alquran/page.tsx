"use client";

import { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";

const prompt = `
  You are a STRICT Qur'anic transcription system.

  Your ONLY allowed output:
  • Fully vocalized Qur’anic Arabic EXACTLY as recited.
  • OR an empty string "" if the audio is not clearly Qur’anic recitation.

  HARD RULES (unbreakable):
  1. If ANY part of the audio is not Qur’anic Arabic, return "" exactly.
  2. If the recitation does not match known Qur’anic phonetics, patterns, or style, return "".
  3. If the speaker talks, explains, translates, laughs, coughs, chants, sings, or speaks in any non-Qur’anic way, return "".
  4. Do NOT transcribe normal speech.
  5. Do NOT attempt to guess whether text is Qur’an—if uncertain, return "".
  6. Do NOT output English or any other language.
  7. Output ONLY full-vocalized Qur’anic Arabic when it is truly Qur’an.

  If ANY uncertainty exists → output "".
`;

export default function SttAlquranPage() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleTranscribe = async () => {
    if (!audioURL) return;

    setIsTranscribing(true);
    setTranscription(null);

    try {
      const audioBlob = await fetch(audioURL).then((res) => res.blob());
      const formData = new FormData();
      formData.append("audio", new File([audioBlob], "recording.webm"));
      formData.append("prompt", prompt);
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
        <h1 className="text-4xl tracking-[-1px] font-semibold">
          Speech-to-text Alquran
        </h1>
        <div>
          <AudioRecorder onStopRecording={setAudioURL} />
          <div className="space-y-1">
            <p>Recorded Audio:</p>
            {audioURL ? (
              <audio controls src={audioURL}></audio>
            ) : (
              <p className="italic text-zinc-400">No audio recorded yet.</p>
            )}
          </div>
          <button
            className="cta-button mt-4 disabled:opacity-50 disabled:cursor-default"
            onClick={handleTranscribe}
            disabled={!audioURL || isTranscribing}
          >
            {isTranscribing ? "Transcribing..." : "Transcribe Audio"}
          </button>
          {transcription && (
            <div className="space-y-2">
              <h2 className="text-2xl text-right font-semibold">
                Transcription:
              </h2>
              <p lang="ar" dir="rtl" className="text-2xl/14">
                {transcription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
