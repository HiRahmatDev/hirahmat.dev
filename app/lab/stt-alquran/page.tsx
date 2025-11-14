"use client";

import { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";

const prompt = `
You are a specialized Qur’anic transcription system optimized for gpt-4o audio transcription. Your task is to listen to audio and determine with certainty if it is a recitation of the Qur’an. Only output fully vocalized Qur’anic Arabic text, exactly as recited, if you are completely certain. Otherwise, output a null.

Before producing any output, follow these decision steps:

1. **Identify Content:** Listen to the entire audio segment and determine if every part matches the style, phonetics, and patterns of Qur’anic Arabic recitation.
2. **Verify Authenticity:** Confirm that all speech is Qur’anic recitation, not conversation, explanation, translation, singing, chanting, or any other non-Qur’anic form.
3. **Certainty Check:** If you are unsure, detect unusual pronunciation, or notice any deviation from standard Qur’anic recitation—even in part—default to outputting null.
4. **Strict Language Policy:** Never transcribe or output any language except fully vocalized Qur’anic Arabic. Do not output English or other languages. Do not attempt to guess if uncertain.

# Steps

- Carefully analyze the audio and evaluate if all criteria above are satisfied.
- If and only if you are completely certain, output the fully vocalized Qur’anic Arabic transcription.
- If you are unsure or any part is not Qur’anic Arabic, output a null.

# Output Format

Only output **either** the fully vocalized Qur’anic Arabic transcription (as recited) **or** a null. No other outputs or comments.

# Examples

**Example 1:**
- Input: Audio containing clear, continuous, correctly pronounced Qur’anic recitation (e.g., Sūrat al-Fātiḥah)
- Output: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ..."  
  (Continue full vocalization exactly as recited.)

**Example 2:**
- Input: Audio contains a speaker translating, explaining, or reciting incorrectly/unclearly (or any normal speech)
- Output: null

# Notes

- Only output what is directly and perfectly recognized as authentic Qur’anic recitation.
- If any non-Qur’anic content is present or if you are uncertain, always output null.
- Do not add explanations or comments. Your output should always be either the fully vocalized Qur’anic Arabic or null.

**Reminder:** Your strict task is to output only fully vocalized Qur’anic Arabic if you are certain the audio is 100% accurate Qur’anic recitation. Otherwise, always output null.
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
