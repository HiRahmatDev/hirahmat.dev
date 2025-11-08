"use client";

import { useEffect, useRef, useState } from "react";

import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";

type NavState =
  | "navbar-static"
  | "navbar-static-active"
  | "navbar-fixed"
  | "navbar-fixed-active";

const NAVBAR_SCROLL_THRESHOLD = 400;
const ANIMATION_MS = 300;

export function Navbar() {
  const [navState, setNavState] = useState<NavState>("navbar-static");

  // refs to manage RAF (Request Animation Frame) and timeout so we can cancel on cleanup
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // update function scheduled by rAF
    const update = () => {
      const shouldBeFixed = window.scrollY > NAVBAR_SCROLL_THRESHOLD;
      setNavState((prev) => {
        // in -> fixed-active
        if (
          shouldBeFixed &&
          (prev === "navbar-static" || prev === "navbar-static-active")
        ) {
          return "navbar-fixed-active";
        }

        // out -> static-active
        if (
          !shouldBeFixed &&
          (prev === "navbar-fixed" || prev === "navbar-fixed-active")
        ) {
          return "navbar-static-active";
        }

        return prev;
      });

      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    // run once to initialize state according to current scroll position
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // handle automatic transition to stable states after animation duration
  useEffect(() => {
    // clear any previous pending timeout
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (navState === "navbar-fixed-active") {
      timeoutRef.current = window.setTimeout(
        () => setNavState("navbar-fixed"),
        ANIMATION_MS
      );
    } else if (navState === "navbar-static-active") {
      timeoutRef.current = window.setTimeout(
        () => setNavState("navbar-static"),
        ANIMATION_MS
      );
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [navState]);

  return (
    <>
      <nav className="relative" tabIndex={-1}>
        <div className="container py-3 flex gap-3 justify-between align-center">
          <Logo />
        </div>
      </nav>
      {navState !== "navbar-static" && (
        <div className={navState + " z-20"}>
          <div className="container py-3 flex gap-3 justify-between align-center">
            <Logo />
            <CTAButton />
          </div>
        </div>
      )}
    </>
  );
}
