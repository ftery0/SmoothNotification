import React from 'react';
import { Toast, ToastItemProps } from './Toast';
import { Position } from '../types';

const POSITIONS: Position[] = [
  'top-right', 'top-center', 'top-left',
  'bottom-right', 'bottom-center', 'bottom-left',
];

interface ToastContainerProps {
  toasts: ToastItemProps[];
  defaultPosition?: Position;
}

export function ToastContainer({ toasts, defaultPosition = 'top-right' }: ToastContainerProps) {
  const byPosition = POSITIONS.reduce<Record<string, ToastItemProps[]>>((acc, pos) => {
    acc[pos] = toasts.filter(t => (t.position ?? defaultPosition) === pos);
    return acc;
  }, {} as Record<string, ToastItemProps[]>);

  return (
    <>
      {POSITIONS.map(pos => {
        const group = byPosition[pos];
        if (!group.length) return null;
        return (
          <div
            key={pos}
            className={`sn-toasts sn-toasts--${pos}`}
            aria-label="Notifications"
          >
            {group.map(t => (
              <Toast key={t.id} {...t} />
            ))}
          </div>
        );
      })}
    </>
  );
}
