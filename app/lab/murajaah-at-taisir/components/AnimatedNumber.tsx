"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function AnimatedNumber({
  className,
  animating,
  number,
  min,
  max,
}: Readonly<{
  className?: string;
  animating?: boolean;
  number: number | null;
  min?: number;
  max?: number;
}>) {
  const [animatedNumber, setAnimatedNumber] = useState<number | null>(null);

  useEffect(() => {
    if (!(min && max)) return;

    let interval: NodeJS.Timeout | null = null;

    if (animating) {
      interval = setInterval(() => {
        setAnimatedNumber(Math.floor(Math.random() * (max - min + 1)) + min);
      }, 25);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnimatedNumber(null);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animating, min, max]);

  return (
    <p
      className={twMerge(
        "text-center py-6 text-7xl font-bold tracking-tight",
        className
      )}
    >
      {animatedNumber ? (
        <span className="text-zinc-400">{animatedNumber}</span>
      ) : (
        number || <span className="text-zinc-400">-</span>
      )}
    </p>
  );
}
