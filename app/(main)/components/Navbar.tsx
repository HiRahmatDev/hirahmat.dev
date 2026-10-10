"use client";

import Link from "next/link";
import { FlaskConical, LucideIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";

type NavState =
  | "navbar-static"
  | "navbar-static-active"
  | "navbar-fixed"
  | "navbar-fixed-active";

const NAVBAR_SCROLL_THRESHOLD = 420;
const ENTER_DURATION_MS = 600;
const EXIT_DURATION_MS = 200;

export function Navbar() {
  const [navState, setNavState] = useState<NavState>("navbar-static");
  const pathname = usePathname();

  const navbarRef = useRef<HTMLElement>(null);

  // refs to manage RAF (Request Animation Frame) and timeout so we can cancel on cleanup
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    document.body.style.setProperty(
      "--navbar-enter-duration-ms",
      `${ENTER_DURATION_MS}ms`,
    );
    document.body.style.setProperty(
      "--navbar-exit-duration-ms",
      `${EXIT_DURATION_MS}ms`,
    );
  }, []);

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
        ENTER_DURATION_MS,
      );
    } else if (navState === "navbar-static-active") {
      timeoutRef.current = window.setTimeout(
        () => setNavState("navbar-static"),
        EXIT_DURATION_MS,
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
      <nav role="navigation" ref={navbarRef} className="relative z-10">
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

type Link = {
  key: string;
  href: string;
  icon: LucideIcon | null;
  label: string;
};

function Links() {
  const links: Link[] = [
    {
      key: "jurnal-proyek",
      href: "/articles?category=Jurnal+Proyek",
      icon: null,
      label: "Jurnal Proyek",
    },
    {
      key: "blog",
      href: "/articles?category=Blog",
      icon: null,
      label: "Blog",
    },
    {
      key: "labs",
      href: "/labs",
      icon: FlaskConical,
      label: "Labs",
    },
  ];

  return links.map(({ key, href, icon: Icon, label }) => {
    return (
      <Link
        key={key}
        href={href}
        className="font-semibold px-2 group hover:text-text-accent"
      >
        <span
          className={
            "inline-flex items-center text-base/[32px] translate-y-0 group-hover:-translate-y-0.5 group-active:translate-y-0 transition-transform ease-silky" +
            (Icon ? " gap-1.5" : "")
          }
        >
          {Icon && <Icon className="size-5" />}
          {label}
        </span>
      </Link>
    );
  });
}
