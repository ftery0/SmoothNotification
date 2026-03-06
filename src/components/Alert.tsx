import React, { useRef } from 'react';
import { useAnimatedMount } from '../hooks/useAnimatedMount';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { Icon } from './Icon';
import { TypeOptions } from '../types';

export interface AlertProps {
  isOpen: boolean;
  message: React.ReactNode;
  title?: string;
  okText?: string;
  icon?: TypeOptions;
  onOk: () => void;
}

const ICON_VARIANT: Record<TypeOptions, string> = {
  error:   'sn-dialog__icon--danger',
  warning: 'sn-dialog__icon--warning',
  success: 'sn-dialog__icon--success',
  info:    'sn-dialog__icon--info',
  default: 'sn-dialog__icon--default',
};

export function Alert({
  isOpen,
  message,
  title = 'Notice',
  okText = 'OK',
  icon = 'info',
  onOk,
}: AlertProps) {
  const { mounted, state } = useAnimatedMount(isOpen, 320);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Scroll lock + focus trap
  useDialogA11y(isOpen, dialogRef);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onOk(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onOk]);

  if (!mounted) return null;

  return (
    <div
      className={`sn-overlay${state === 'closing' ? ' is-closing' : ' is-opening'}`}
      onClick={e => { if (e.target === e.currentTarget) onOk(); }}
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      <div ref={dialogRef} className={`sn-dialog${state === 'closing' ? ' is-closing' : ' is-opening'}`}>
        <div className={`sn-dialog__icon ${ICON_VARIANT[icon]}`}>
          <Icon theme="dark" type={icon} />
        </div>
        <div className="sn-dialog__title">{title}</div>
        <div className="sn-dialog__message">{message}</div>
        <div className="sn-dialog__actions sn-dialog__actions--center">
          <button className="sn-btn sn-btn--primary" onClick={onOk}>
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
}
