import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type UseOnboardingAnimationProps = {
  step: number;
  containerRef: RefObject<HTMLDivElement | null>;
};

export function useOnboardingAnimation({
  step,
  containerRef,
}: UseOnboardingAnimationProps) {
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
          duration,
          ease,
        });
      } else if (step === 2) {
        gsap.to(".screen-1", {
          xPercent: -50,
          scale: 0.9,
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
          duration,
          ease,
        });
      } else if (step === 3) {
        gsap.to(".screen-2", {
          xPercent: -150,
          scale: 0.9,
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
          duration,
          ease,
        });
      } else if (step === 4) {
        gsap.to(".screen-3", {
          xPercent: -150,
          scale: 0.9,
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
          duration,
          ease,
        });
      } else if (step === 5) {
        gsap.to(".screen-4", {
          xPercent: -150,
          scale: 0.9,
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
          duration,
          ease,
        });
      } else if (step === 6) {
        gsap.to(".screen-5", {
          xPercent: -150,
          scale: 0.9,
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
}
