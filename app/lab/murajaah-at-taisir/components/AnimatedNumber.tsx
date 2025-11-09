"use client";

import { useEffect, useState } from "react";

export function AnimatedNumber({
  animating,
  number,
  min,
  max,
}: Readonly<{
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
      }, 50);
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
    <p className="text-center py-6 text-7xl font-bold tracking-tight">
      {animatedNumber ? (
        <span className="text-zinc-400">{animatedNumber}</span>
      ) : (
        number || <span className="text-zinc-400">-</span>
      )}
    </p>
  );
}
