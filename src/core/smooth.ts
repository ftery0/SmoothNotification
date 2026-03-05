import React from 'react';
import { emit, ConfirmEvent, AlertEvent, ModalEvent } from './store';
import { ToastOptions, TypeOptions } from '../types';

export interface SmoothToastOptions extends ToastOptions {
  type?: TypeOptions;
}

export const smooth = {
  toast(message: React.ReactNode, options?: SmoothToastOptions) {
    emit({ type: 'toast', message, options });
  },

  modal(
    component: React.ReactNode,
    options?: ModalEvent['options']
  ): Promise<unknown> {
    return new Promise(resolve => {
      emit({ type: 'modal', component, options, resolve });
    });
  },

  confirm(
    message: React.ReactNode,
    options?: ConfirmEvent['options']
  ): Promise<boolean> {
    return new Promise(resolve => {
      emit({ type: 'confirm', message, options, resolve });
    });
  },

  alert(
    message: React.ReactNode,
    options?: AlertEvent['options']
  ): Promise<void> {
    return new Promise<void>(resolve => {
      emit({ type: 'alert', message, options, resolve });
    });
  },
};
