"use client";

type TranscriptionProps = {
  isTranscribing?: boolean;
  transcription?: string | null;
};

export function Transcription({
  isTranscribing,
  transcription,
}: TranscriptionProps) {
  return (
    <div className="space-y-2 text-center">
      {isTranscribing ? (
        <p className="leading-14 text-zinc-400 italic">
          Transcribing audio, please wait...
        </p>
      ) : transcription ? (
        <p lang="ar" dir="rtl" className="text-2xl/14">
          {transcription}
        </p>
      ) : (
        <p className="leading-14 text-zinc-400 italic">-</p>
      )}
    </div>
  );
}
