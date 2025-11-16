import { useEffect, useRef, useState } from "react";

export function useBottomSheet() {
  const modalOverlayRef = useRef<HTMLDivElement | null>(null);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;
    if (!modalOverlay) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        modalOverlay.classList.replace("overlay-enter-active", "overlay-enter");
      }, 300);
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
      }, 300);
    } else {
      bottomSheet.classList.replace("slide-up", "slide-down-active");
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const onVisibleChange = (open: boolean) => {
    if (open) {
      setOpen(true);
      setIsVisible(true);
    } else {
      setOpen(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  return {
    isVisible,
    onVisibleChange,
    modalOverlayRef,
    bottomSheetRef,
  };
}
