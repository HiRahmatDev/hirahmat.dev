"use client";

import { useEffect, useRef, useState } from "react";

import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavState =
  | "navbar-static"
  | "navbar-static-active"
  | "navbar-fixed"
  | "navbar-fixed-active";

const NAVBAR_SCROLL_THRESHOLD = 400;
const ANIMATION_DURATION_MS = 200;

export function Navbar() {
  const [navState, setNavState] = useState<NavState>("navbar-static");
  const pathname = usePathname();

  // refs to manage RAF (Request Animation Frame) and timeout so we can cancel on cleanup
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathname === "/lab/murajaah-at-taisir") return;

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
  }, [pathname]);

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
        ANIMATION_DURATION_MS,
      );
    } else if (navState === "navbar-static-active") {
      timeoutRef.current = window.setTimeout(
        () => setNavState("navbar-static"),
        ANIMATION_DURATION_MS,
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
      <nav className="relative z-10">
        <div className="container-wider py-2 flex gap-3 justify-between items-center align-center">
          <Logo />
          <div className="hidden md:flex gap-8 items-center h-fit">
            <Links />
            <CTAButton>Kontak</CTAButton>
          </div>
        </div>
      </nav>
      {navState !== "navbar-static" && (
        <div className={navState + " z-20"}>
          <div className="container-wider py-2 flex gap-3 justify-between items-center">
            <Logo />
            <div className="hidden md:flex gap-8 items-center h-fit">
              <Links />
              <CTAButton />
            </div>
            <div className="block md:hidden">
              <CTAButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Links() {
  return (
    <>
      <Link
        href="/articles?category=Jurnal+Proyek"
        className="font-semibold px-2 text-base/[32px] inline-block group hover:text-text-accent"
      >
        <span className="inline-block translate-y-0 group-hover:-translate-y-0.5 group-active:translate-y-px transition-transform ease-(--ease-silky)">
          Jurnal Proyek
        </span>
      </Link>
      <Link
        href="/articles?category=Blog"
        className="font-semibold px-2 text-base/[32px] inline-block group hover:text-text-accent"
      >
        <span className="inline-block translate-y-0 group-hover:-translate-y-0.5 group-active:translate-y-px transition-transform ease-(--ease-silky)">
          Blog
        </span>
      </Link>
    </>
  );
}
