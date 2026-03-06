import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { Id, TypeOptions, Theme, Position } from '../types';

export interface ToastItemProps {
  id: Id;
  message: React.ReactNode;
  type: TypeOptions;
  autoClose?: number | false;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  position: Position;
  theme?: Theme;
  onClose: (id: Id) => void;
}

const ACCENT: Record<TypeOptions, { accent: string; bg: string }> = {
  success: { accent: '#10e8a4', bg: 'rgba(16, 232, 164, 0.13)' },
  error:   { accent: '#ff6b8a', bg: 'rgba(255, 107, 138, 0.13)' },
  warning: { accent: '#ffb547', bg: 'rgba(255, 181, 71, 0.13)' },
  info:    { accent: '#a78bfa', bg: 'rgba(167, 139, 250, 0.13)' },
  default: { accent: 'rgba(237,237,250,0.28)', bg: 'rgba(255,255,255,0.08)' },
};

export function Toast({
  id,
  message,
  type,
  autoClose = 5000,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
  draggable = true,
  theme = 'dark',
  onClose,
}: ToastItemProps) {
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef(Date.now());
  const remainingRef = useRef(typeof autoClose === 'number' ? autoClose : 0);
  // Ref-based exiting guard — prevents double-close even from stale closures
  const exitingRef = useRef(false);

  const toastRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ canDrag: false, didMove: false, start: 0, delta: 0, canCloseOnClick: true, removalDistance: 0 });

  const colors = ACCENT[type] ?? ACCENT.default;

  function close() {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    setTimeout(() => onClose(id), 420);
  }

  // closeRef lets startTimer always call the latest close without stale closure
  const closeRef = useRef(close);
  closeRef.current = close;

  const startTimer = useCallback(() => {
    if (autoClose === false) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    startRef.current = Date.now();
    timerRef.current = setTimeout(() => closeRef.current(), remainingRef.current);
  }, [autoClose]);

  const pauseTimer = useCallback(() => {
    if (autoClose === false || timerRef.current === null) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
    remainingRef.current -= Date.now() - startRef.current;
  }, [autoClose]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  // FIX: startTimer/pauseTimer added to deps so onFocus/onBlur always call fresh versions
  useEffect(() => {
    if (!pauseOnFocusLoss || typeof window === 'undefined') return;
    const onFocus = () => { setPaused(false); startTimer(); };
    const onBlur  = () => { setPaused(true);  pauseTimer(); };
    if (!document.hasFocus()) onBlur();
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [pauseOnFocusLoss, startTimer, pauseTimer]);

  // FIX: Stable forwarder refs — same function reference across re-renders.
  // onPointerMove/onPointerUp update their implementations each render via impl refs,
  // while the registered listener (stableMove/stableUp) never changes reference.
  const onPointerMoveImpl = useRef<(e: PointerEvent) => void>(() => {});
  const onPointerUpImpl   = useRef<() => void>(() => {});
  const stableMove = useRef((e: PointerEvent) => onPointerMoveImpl.current(e));
  const stableUp   = useRef(() => onPointerUpImpl.current());

  onPointerMoveImpl.current = (e: PointerEvent) => {
    const d = dragRef.current;
    const toast = toastRef.current;
    if (!d.canDrag || !toast) return;
    d.didMove = true;
    d.delta = e.clientX - d.start;
    if (d.start !== e.clientX) d.canCloseOnClick = false;
    toast.style.transform = `translateX(${d.delta}px)`;
    toast.style.opacity = `${1 - Math.abs(d.delta / d.removalDistance)}`;
  };

  onPointerUpImpl.current = () => {
    document.removeEventListener('pointermove', stableMove.current);
    document.removeEventListener('pointerup', stableUp.current);
    const d = dragRef.current;
    const toast = toastRef.current;
    if (!d.canDrag || !d.didMove || !toast) return;
    d.canDrag = false;
    if (Math.abs(d.delta) > d.removalDistance) {
      close();
      return;
    }
    toast.style.transition = 'transform 0.2s, opacity 0.2s';
    toast.style.removeProperty('transform');
    toast.style.removeProperty('opacity');
  };

  // FIX: Remove drag listeners on unmount in case component unmounts mid-drag
  useEffect(() => {
    const move = stableMove.current;
    const up   = stableUp.current;
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    if (!draggable) return;
    const toast = toastRef.current!;
    dragRef.current.canDrag = true;
    dragRef.current.didMove = false;
    dragRef.current.canCloseOnClick = true;
    dragRef.current.start = e.clientX;
    dragRef.current.removalDistance = toast.offsetWidth * 0.8;
    toast.style.transition = 'none';
    document.addEventListener('pointermove', stableMove.current);
    document.addEventListener('pointerup', stableUp.current);
  }

  return (
    <div
      ref={toastRef}
      className={`sn-toast${exiting ? ' is-exiting' : ''}`}
      style={{ '--accent': colors.accent, '--accent-bg': colors.bg } as React.CSSProperties}
      onMouseEnter={pauseOnHover ? () => { setPaused(true); pauseTimer(); } : undefined}
      onMouseLeave={pauseOnHover ? () => { setPaused(false); startTimer(); } : undefined}
      onPointerDown={onPointerDown}
      role="alert"
      aria-live="polite"
    >
      <div className="sn-toast__accent" />
      <div className="sn-toast__body">
        <span className="sn-toast__icon">
          <Icon theme={theme} type={type} />
        </span>
        <span className="sn-toast__msg">{message}</span>
        <button className="sn-toast__close" onClick={close} aria-label="Dismiss notification">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      {autoClose !== false && (
        <div
          className={`sn-toast__bar${paused ? ' is-paused' : ''}`}
          style={{ animationDuration: `${autoClose}ms` }}
        />
      )}
    </div>
  );
}
