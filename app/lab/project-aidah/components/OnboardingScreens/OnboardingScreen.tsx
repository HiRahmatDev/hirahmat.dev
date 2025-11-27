"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { NextButton } from "./NextButton";
import { OnboardingGoalScreen } from "./OnboardingGoalScreen";
import { OnboardingWelcomeScreen } from "./OnboardingWelcomeScreen";
import { StepDots } from "./StepDots";
import { useOnboardingContext } from "./OnboardingContext";

export function OnboardingScreen() {
  const { step } = useOnboardingContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ease = "power2.inOut";
      const duration = 0.5;

      if (step === 1) {
        gsap.to(".screen-1", {
          xPercent: 0,
          scale: 1,
          duration,
          ease,
        });
        gsap.to(".screen-2", {
          xPercent: 0,
          scale: 0.95,
          duration,
          ease,
        });
      } else if (step === 2) {
        gsap.to(".screen-1", {
          xPercent: -30,
          scale: 0.95,
          duration,
          ease,
        });
        gsap.to(".screen-2", {
          xPercent: -100,
          scale: 1,
          duration,
          ease,
        });
        gsap.to(".screen-3", {
          scale: 0.95,
          duration,
          ease,
        });
      } else if (step === 3) {
        gsap.to(".screen-2", {
          xPercent: -130,
          scale: 0.95,
          duration,
          ease,
        });
        gsap.to(".screen-3", {
          xPercent: -100,
          scale: 1,
          duration,
          ease,
        });
        gsap.to(".screen-4", {
          scale: 0.95,
          duration,
          ease,
        });
      } else if (step === 4) {
        gsap.to(".screen-3", {
          xPercent: -130,
          scale: 0.95,
          duration,
          ease,
        });
        gsap.to(".screen-4", {
          xPercent: -100,
          scale: 1,
          duration,
          ease,
        });
        gsap.to(".screen-5", {
          scale: 0.95,
          duration,
          ease,
        });
      } else if (step === 5) {
        gsap.to(".screen-4", {
          xPercent: -130,
          scale: 0.95,
          duration,
          ease,
        });
        gsap.to(".screen-5", {
          xPercent: -100,
          scale: 1,
          duration,
          ease,
        });
        gsap.to(".screen-6", {
          scale: 0.95,
          duration,
          ease,
        });
      } else if (step === 6) {
        gsap.to(".screen-5", {
          xPercent: -130,
          scale: 0.95,
          duration,
          ease,
        });
        gsap.to(".screen-6", {
          xPercent: -100,
          scale: 1,
          duration,
          ease,
        });
      }
    },
    { dependencies: [step], scope: containerRef }
  );

  return (
    <div className="h-[inherit] flex flex-col justify-between items-center pt-20 pb-10">
      <div className="size-full overflow-hidden relative" ref={containerRef}>
        {(step === 1 || step === 2) && (
          <div className="screen-1 bg-white absolute top-0 left-0 w-full h-full">
            <OnboardingWelcomeScreen />
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className="screen-2 bg-white absolute top-0 left-0 w-full h-full translate-x-full">
            <OnboardingGoalScreen />
          </div>
        )}
        {(step === 3 || step === 4) && (
          <div className="screen-3 bg-white absolute top-0 left-0 w-full h-full translate-x-full">
            <OnboardingGoalScreen />
          </div>
        )}
        {(step === 4 || step === 5) && (
          <div className="screen-4 bg-white absolute top-0 left-0 w-full h-full translate-x-full">
            <OnboardingWelcomeScreen />
          </div>
        )}
        {(step === 5 || step === 6) && (
          <div className="screen-5 bg-white absolute top-0 left-0 w-full h-full translate-x-full">
            <OnboardingGoalScreen />
          </div>
        )}
        {step === 6 && (
          <div className="screen-6 bg-white absolute top-0 left-0 w-full h-full translate-x-full">
            <OnboardingWelcomeScreen />
          </div>
        )}
      </div>
      <div className="px-4 gap-8 w-full space-y-8">
        <StepDots />
        <NextButton className="w-full" />
      </div>
    </div>
  );
}
