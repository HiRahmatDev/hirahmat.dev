"use client";

import { CopyButton } from "@/app/(main)/components/CopyButton";
import { highlightCode } from "@/app/lib/prism";
import { useEffect, useRef, useState } from "react";

export function RectangleSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rect, setRect] = useState({
    x: 20,
    y: 40,
    width: 50,
    height: 50,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.reset();

    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }, [rect]);

  const language = "javascript";

  const codeBlock = `const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(${rect.x}, ${rect.y}, ${rect.width}, ${rect.height});
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();`;

  const highlighted = highlightCode(codeBlock, "tsx");
  return (
    <div>
      <h2 className="font-medium text-xl mb-1.5">Rectangle:</h2>
      <canvas ref={canvasRef} className="bg-gray-100" />
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
            <code>x({rect.x}):</code>
          </label>
          <input
            type="range"
            value={rect.x.toString()}
            onChange={(e) =>
              setRect((current) => ({
                ...current,
                x: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>y({rect.y}):</code>
          </label>
          <input
            type="range"
            value={rect.y.toString()}
            onChange={(e) =>
              setRect((current) => ({
                ...current,
                y: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>width({rect.width}px):</code>
          </label>
          <input
            type="range"
            value={rect.width.toString()}
            onChange={(e) =>
              setRect((current) => ({
                ...current,
                width: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>
            <code>height({rect.height}px):</code>
          </label>
          <input
            type="range"
            value={rect.height.toString()}
            onChange={(e) =>
              setRect((current) => ({
                ...current,
                height: parseInt(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
