import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { subscribe, ToastEvent, ModalEvent, ConfirmEvent, AlertEvent } from '../core/store';
import { ToastContainer } from './ToastContainer';
import { Modal } from './Modal';
import { Confirm } from './Confirm';
import { Alert } from './Alert';
import { ToastItemProps } from './Toast';
import { Position, TypeOptions } from '../types';

let _toastId = 0;
function nextId() { return ++_toastId; }

interface ActiveModal {
  id: number;
  isOpen: boolean;
  component: React.ReactNode;
  title?: string;
  resolve: (value: unknown) => void;
}

interface ActiveConfirm {
  id: number;
  isOpen: boolean;
  message: React.ReactNode;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: TypeOptions;
  resolve: (value: boolean) => void;
}

interface ActiveAlert {
  id: number;
  isOpen: boolean;
  message: React.ReactNode;
  title?: string;
  okText?: string;
  icon?: TypeOptions;
  resolve: () => void;
}

export interface SmoothProviderProps {
  children: React.ReactNode;
  defaultPosition?: Position;
  defaultAutoClose?: number | false;
  defaultTheme?: string;
}

export function SmoothProvider({
  children,
  defaultPosition = 'top-right',
  defaultAutoClose = 5000,
  defaultTheme = 'dark',
}: SmoothProviderProps) {
  const [container, setContainer] = useState<Element | null>(null);
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);
  const [modals, setModals] = useState<ActiveModal[]>([]);
  const [confirms, setConfirms] = useState<ActiveConfirm[]>([]);
  const [alerts, setAlerts] = useState<ActiveAlert[]>([]);
  // Track close-animation timeouts so they can be cleared on unmount
  const closeTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setContainer(document.body);
    return () => { closeTimers.current.forEach(clearTimeout); };
  }, []);

  const removeToast = useCallback((id: ToastItemProps['id']) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const closeModal = useCallback((id: number) => {
    setModals(prev => prev.map(m => m.id === id ? { ...m, isOpen: false } : m));
    closeTimers.current.push(setTimeout(() => setModals(prev => prev.filter(m => m.id !== id)), 400));
  }, []);

  const closeConfirm = useCallback((id: number) => {
    setConfirms(prev => prev.map(c => c.id === id ? { ...c, isOpen: false } : c));
    closeTimers.current.push(setTimeout(() => setConfirms(prev => prev.filter(c => c.id !== id)), 400));
  }, []);

  const closeAlert = useCallback((id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isOpen: false } : a));
    closeTimers.current.push(setTimeout(() => setAlerts(prev => prev.filter(a => a.id !== id)), 400));
  }, []);

  useEffect(() => {
    const unsub = subscribe(event => {
      const id = nextId();

      if (event.type === 'toast') {
        const e = event as ToastEvent;
        const opts = e.options ?? {};
        setToasts(prev => [...prev, {
          id,
          message: e.message,
          type: opts.type ?? 'default',
          autoClose: opts.autoClose !== undefined ? opts.autoClose : defaultAutoClose,
          pauseOnHover: opts.pauseOnHover ?? true,
          pauseOnFocusLoss: opts.pauseOnFocusLoss ?? true,
          draggable: opts.draggable === true || opts.draggable === undefined,
          position: opts.position ?? defaultPosition,
          theme: (opts.theme as string) ?? defaultTheme,
          onClose: removeToast,
        }]);
      }

      if (event.type === 'modal') {
        const e = event as ModalEvent;
        setModals(prev => [...prev, {
          id,
          isOpen: true,
          component: e.component,
          title: e.options?.title,
          resolve: e.resolve,
        }]);
      }

      if (event.type === 'confirm') {
        const e = event as ConfirmEvent;
        setConfirms(prev => [...prev, {
          id,
          isOpen: true,
          message: e.message,
          title: e.options?.title,
          confirmText: e.options?.confirmText,
          cancelText: e.options?.cancelText,
          icon: e.options?.icon,
          resolve: e.resolve,
        }]);
      }

      if (event.type === 'alert') {
        const e = event as AlertEvent;
        setAlerts(prev => [...prev, {
          id,
          isOpen: true,
          message: e.message,
          title: e.options?.title,
          okText: e.options?.okText,
          icon: e.options?.icon,
          resolve: e.resolve,
        }]);
      }
    });

    return unsub;
  }, [defaultPosition, defaultAutoClose, defaultTheme, removeToast]);

  return (
    <>
      {children}
      {container && ReactDOM.createPortal(
        <>
          <ToastContainer toasts={toasts} defaultPosition={defaultPosition} />

          {modals.map(m => (
            <Modal
              key={m.id}
              isOpen={m.isOpen}
              title={m.title}
              onClose={() => { m.resolve(undefined); closeModal(m.id); }}
            >
              {m.component}
            </Modal>
          ))}

          {confirms.map(c => (
            <Confirm
              key={c.id}
              isOpen={c.isOpen}
              message={c.message}
              title={c.title}
              confirmText={c.confirmText}
              cancelText={c.cancelText}
              icon={c.icon}
              onConfirm={() => { c.resolve(true);  closeConfirm(c.id); }}
              onCancel={()  => { c.resolve(false); closeConfirm(c.id); }}
            />
          ))}

          {alerts.map(a => (
            <Alert
              key={a.id}
              isOpen={a.isOpen}
              message={a.message}
              title={a.title}
              okText={a.okText}
              icon={a.icon}
              onOk={() => { a.resolve(); closeAlert(a.id); }}
            />
          ))}
        </>,
        container
      )}
    </>
  );
}
