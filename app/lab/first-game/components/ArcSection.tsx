"use client";

import { CopyButton } from "@/app/(main)/components/CopyButton";
import { highlightCode } from "@/app/lib/prism";
import { useEffect, useRef, useState } from "react";

export function ArcSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arc, setArc] = useState({
    x: 100,
    y: 100,
    radius: 50,
    startAngle: 0.0,
    endAngle: Number((Math.PI * 2).toFixed(4)),
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.reset();

    ctx.beginPath();
    ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  }, [arc]);

  const language = "javascript";

  const codeBlock = `const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(${arc.x}, ${arc.y}, ${arc.radius}, ${arc.startAngle}, ${arc.endAngle});
ctx.strokeStyle = "green";
ctx.stroke();
ctx.closePath();`;

  const highlighted = highlightCode(codeBlock, "tsx");
  return (
    <div>
      <h2 className="font-medium text-xl mb-1.5">Arc:</h2>
      <canvas
        ref={canvasRef}
        className="bg-gray-100"
        width="480"
        height="320"
      />
      <div className="my-3">
        <pre className={`relative language-${language}`} tabIndex={0}>
          <div className="code-block__header">
            <span className="lang">{language}</span>
            <CopyButton text={codeBlock} className="code-block__button-copy" />
          </div>
          <code
            dangerouslySetInnerHTML={{ __html: highlighted }}
            className={`language-${language}`}
          />
        </pre>
      </div>
      <div className="grid grid-cols-2 gap-[0_12px]">
        <div className="flex flex-col">
          <label>
            <code>x({arc.x}):</code>
          </label>
          <input
            type="range"
            value={arc.x.toString()}
            onChange={(e) =>
              setArc((current) => ({
                ...current,
                x: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>y({arc.y}):</code>
          </label>
          <input
            type="range"
            value={arc.y.toString()}
            onChange={(e) =>
              setArc((current) => ({
                ...current,
                y: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label>
            <code>radius({arc.radius}px):</code>
          </label>
          <input
            type="range"
            value={arc.radius.toString()}
            onChange={(e) =>
              setArc((current) => ({
                ...current,
                radius: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>startAngle({arc.startAngle}rad):</code>
          </label>
          <input
            type="range"
            value={arc.startAngle}
            min={0}
            max={(Math.PI * 2).toFixed(4)}
            step="any"
            onChange={(e) =>
              setArc((current) => ({
                ...current,
                startAngle: Number(parseFloat(e.target.value).toFixed(4)),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>endAngle({arc.endAngle}rad):</code>
          </label>
          <input
            type="range"
            value={arc.endAngle}
            min={0}
            max={Number((Math.PI * 2).toFixed(4))}
            step="any"
            onChange={(e) =>
              setArc((current) => ({
                ...current,
                endAngle: Number(parseFloat(e.target.value).toFixed(4)),
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
