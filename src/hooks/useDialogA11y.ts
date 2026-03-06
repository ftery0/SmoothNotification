import { useEffect, useRef, RefObject } from 'react';

// Reference counter — multiple dialogs open at once all lock scroll,
// and scroll is only restored when the last one closes.
let lockCount = 0;

function lockScroll() {
  if (lockCount === 0) {
    // Compensate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  lockCount++;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Handles scroll lock and focus trap for modal-like dialogs.
 * - Locks body scroll when open (with scrollbar width compensation)
 * - Traps Tab / Shift+Tab within the dialog container
 * - Restores focus to the previously focused element on close
 */
export function useDialogA11y(isOpen: boolean, containerRef: RefObject<HTMLElement | null>) {
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Save the element that had focus before this dialog opened
    previousFocusRef.current = document.activeElement;

    lockScroll();

    // Move focus into the dialog on the next frame (after CSS transitions start)
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length > 0) focusable[0].focus();
    });

    // Tab / Shift+Tab trap
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      unlockScroll();
      // Restore focus to where it was before the dialog opened
      const prev = previousFocusRef.current;
      if (prev && 'focus' in prev) (prev as HTMLElement).focus();
    };
  // containerRef is a stable ref object — .current is always up to date, no dep needed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
}
