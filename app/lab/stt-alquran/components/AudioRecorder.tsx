"use client";

import { Mic } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type AudioRecorderProps = {
  className?: string;
  onStopRecording?: (audioURL: string) => void;
};

export function AudioRecorder({
  className,
  onStopRecording,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        audioChunksRef.current = []; // Clear chunks
        onStopRecording?.(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div
      className={twMerge("fixed bottom-8 left-1/2 -translate-x-1/2", className)}
    >
      <button
        className={clsx(
          "rounded-full size-16 bg-red-600 flex justify-center items-center",
          "[&>svg]:stroke-white active:scale-80 transition-transform"
        )}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? <div className="size-5 bg-white rounded-sm" /> : <Mic />}
      </button>
    </div>
  );
}
