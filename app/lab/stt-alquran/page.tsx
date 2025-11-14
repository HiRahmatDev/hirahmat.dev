"use client";

import { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";

export default function SttAlquranPage() {
  const [audioURL, setAudioURL] = useState<string | null>(null);

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
        </div>
      </div>
    </div>
  );
}
