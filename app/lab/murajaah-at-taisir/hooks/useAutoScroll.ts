import { RefObject, useEffect } from "react";

export function useAutoScroll(quranRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const quranEl = quranRef.current;
    if (!quranEl) return;

    const observer = new MutationObserver((mutations) => {
      const targetEl = quranEl.querySelector('[data-selected="true"]');
      if (!targetEl) return;
      
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    observer.observe(quranEl, {
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
