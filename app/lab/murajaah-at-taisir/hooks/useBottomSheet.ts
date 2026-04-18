import { useEffect, useRef, useState } from "react";

const ANIMATION_DURATION_MS = 400;

export function useBottomSheet() {
  const modalOverlayRef = useRef<HTMLDivElement | null>(null);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const bottomSheetHeightRef = useRef(0);

  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;

    if (!modalOverlay) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        modalOverlay.classList.replace("overlay-enter-active", "overlay-enter");
      }, ANIMATION_DURATION_MS);
    } else {
      modalOverlay.classList.replace("overlay-enter", "overlay-leave-active");
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    const bottomSheet = bottomSheetRef.current;

    if (!bottomSheet) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        bottomSheet.classList.replace("slide-up-active", "slide-up");
      }, ANIMATION_DURATION_MS);
    } else {
      bottomSheet.classList.replace("slide-up", "slide-down-active");
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) return;

    bottomSheetHeightRef.current = bottomSheet.offsetHeight ?? 0;

    const calcHeight = () => {
      const windowHeight = window.visualViewport?.height ?? window.innerHeight;
      const bottomSheetHeight = bottomSheetHeightRef.current;
      const newHeight = windowHeight <= bottomSheetHeight ? "100%" : "auto";

      if (bottomSheet.style.height !== newHeight) {
        bottomSheet.style.height = newHeight;
      }
    };

    window.addEventListener("resize", calcHeight);
    calcHeight(); // run sekali saat mount

    return () => {
      window.removeEventListener("resize", calcHeight);
    };
  }, [isOpen]);

  const onVisibleChange = (open: boolean) => {
    if (open) {
      setOpen(true);
      setIsVisible(true);
    } else {
      setOpen(false);
      setTimeout(() => {
        setIsVisible(false);
      }, ANIMATION_DURATION_MS);
    }
  };

  return {
    isVisible,
    onVisibleChange,
    modalOverlayRef,
    bottomSheetRef,
  };
}
