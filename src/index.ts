// Public API
export { smooth } from './core/smooth';
export { SmoothProvider } from './components/SmoothProvider';
export { Modal } from './components/Modal';
export { Confirm } from './components/Confirm';
export { Alert } from './components/Alert';
export { Toast } from './components/Toast';
export { ToastContainer } from './components/ToastContainer';
export { Icon } from './components/Icon';

// Hooks
export { useAnimatedMount } from './hooks/useAnimatedMount';

// Types
export type {
  TypeOptions,
  Position,
  Theme,
  ToastOptions,
  ToastProps,
  Id,
} from './types';

export type { SmoothProviderProps } from './components/SmoothProvider';
export type { ToastItemProps } from './components/Toast';
export type { ModalProps } from './components/Modal';
export type { ConfirmProps } from './components/Confirm';
export type { AlertProps } from './components/Alert';
export type { SmoothToastOptions } from './core/smooth';
