import React from 'react';
import { useAnimatedMount } from '../hooks/useAnimatedMount';
import { Icon } from './Icon';
import { TypeOptions } from '../types';

export interface ConfirmProps {
  isOpen: boolean;
  message: React.ReactNode;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: TypeOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

const ICON_VARIANT: Record<TypeOptions, string> = {
  error:   'sn-dialog__icon--danger',
  warning: 'sn-dialog__icon--warning',
  success: 'sn-dialog__icon--success',
  info:    'sn-dialog__icon--info',
  default: 'sn-dialog__icon--default',
};

export function Confirm({
  isOpen,
  message,
  title = 'Confirm',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon = 'warning',
  onConfirm,
  onCancel,
}: ConfirmProps) {
  const { mounted, state } = useAnimatedMount(isOpen, 320);

  if (!mounted) return null;

  return (
    <div
      className={`sn-overlay${state === 'closing' ? ' is-closing' : ' is-opening'}`}
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`sn-dialog${state === 'closing' ? ' is-closing' : ' is-opening'}`}>
        <div className={`sn-dialog__icon ${ICON_VARIANT[icon]}`}>
          <Icon theme="dark" type={icon} />
        </div>
        <div className="sn-dialog__title">{title}</div>
        <div className="sn-dialog__message">{message}</div>
        <div className="sn-dialog__actions">
          <button className="sn-btn sn-btn--ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="sn-btn sn-btn--danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
