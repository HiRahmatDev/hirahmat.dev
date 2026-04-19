"use client";

import {
  PointerEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export function SlideableWrapper({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement | null>(null);

  // Pointer handler
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [gesture, setGesture] = useState<"idle" | "swipeLeft" | "swipeRight">(
    "idle",
  );

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    handleGestureStart();
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (isPointerDown) console.log("pointer move");
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isPointerDown) return;
    handleGestureEnd();
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isPointerDown) return;
    handleGestureEnd();
  };

  const handleGestureStart = () => {
    console.log("gesture start");
    setIsPointerDown(true);
  };

  const handleGestureEnd = () => {
    console.log("gesture end");
    setIsPointerDown(false);
  };

  useEffect(() => {
    const handleDocPointerLeave = () => {};
    document.addEventListener("pointerleave", handleDocPointerLeave);
    return () => {
      document.removeEventListener("pointerleave", handleDocPointerLeave);
    };
  }, []);

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="touch-pan-y" // Only enable vertical gesture.
    >
      {children}
    </div>
  );
}
