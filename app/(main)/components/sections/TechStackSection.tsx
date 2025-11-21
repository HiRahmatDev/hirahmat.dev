"use client";

import { Code2, Layers, FileCode, Palette, Server, Sparkles, Figma as FigmaIcon, GitBranch } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const TECH_STACK = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Layers },
    { name: "TypeScript", icon: FileCode },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Node.js", icon: Server },
    { name: "GSAP", icon: Sparkles },
    { name: "Figma", icon: FigmaIcon },
    { name: "Git", icon: GitBranch },
];

export function TechStackSection() {
    const container = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!marqueeRef.current) return;

            // Animate the entire track to move left by 50% (one full set of items)
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 20,
                ease: "none",
                repeat: -1,
                modifiers: {
                    xPercent: gsap.utils.wrap(-50, 0)
                }
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="py-10 overflow-hidden">
            <div className="container mb-6">
                <p className="text-sm font-semibold text-text-accent uppercase tracking-wider">
                    Tech Stack
                </p>
            </div>

            <div className="container relative">
                {/* Gradient Masks for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="overflow-hidden w-full mask-linear-fade">
                    <div ref={marqueeRef} className="flex flex-nowrap gap-8 w-max min-w-full">
                        {/* Render items twice for seamless loop */}
                        {[...TECH_STACK, ...TECH_STACK].map((tech, index) => {
                            const Icon = tech.icon;
                            return (
                                <div
                                    key={`${tech.name}-${index}`}
                                    className="px-6 py-3 rounded-full bg-gray-100 text-gray-800 font-medium text-lg whitespace-nowrap select-none flex items-center gap-3"
                                >
                                    <Icon className="w-6 h-6" />
                                    <span>{tech.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
