import React, { useRef } from 'react';
import { useAnimatedMount } from '../hooks/useAnimatedMount';
import { useDialogA11y } from '../hooks/useDialogA11y';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, title, children, onClose, footer }: ModalProps) {
  const { mounted, state } = useAnimatedMount(isOpen, 320);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Scroll lock + focus trap
  useDialogA11y(isOpen, dialogRef);

  // ESC key handler
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`sn-overlay${state === 'closing' ? ' is-closing' : ' is-opening'}`}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={dialogRef}
        className={`sn-modal${state === 'closing' ? ' is-closing' : ' is-opening'}`}
      >
        <div className="sn-modal__head">
          <span className="sn-modal__title">{title}</span>
          <button className="sn-modal__x" onClick={onClose} aria-label="Close modal">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="sn-modal__body">
          {children}
          {footer && <div className="sn-modal__footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
