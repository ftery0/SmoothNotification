import React, { Dispatch, SetStateAction } from 'react';
import { Id, ToastOptions, TypeOptions } from '../types';

// ─── Toast toggle registry ────────────────────────────────────
// Use Dispatch<SetStateAction<boolean>> to match React's useState setter
type ToggleCallback = Dispatch<SetStateAction<boolean>>;

interface ToggleEntry {
  id: Id;
  containerId?: Id;
  fn: ToggleCallback;
}

const toggleMap = new Map<string, ToggleCallback>();

function makeToggleKey(id: Id, containerId?: Id) {
  return `${containerId ?? 'default'}:${id}`;
}

export function registerToggle({ id, containerId, fn }: ToggleEntry) {
  toggleMap.set(makeToggleKey(id, containerId), fn);
}

export function deregisterToggle(id: Id, containerId?: Id) {
  toggleMap.delete(makeToggleKey(id, containerId));
}

export function toggleToasts(play: boolean, containerId?: Id) {
  toggleMap.forEach((fn, key) => {
    if (!containerId || key.startsWith(`${containerId}:`)) {
      fn(play);
    }
  });
}

// ─── Event emitter for smooth.* API ──────────────────────────

export interface ToastEvent {
  type: 'toast';
  message: React.ReactNode;
  options?: ToastOptions;
}

export interface ModalEvent {
  type: 'modal';
  component: React.ReactNode;
  options?: { title?: string };
  resolve: (value: unknown) => void;
}

export interface ConfirmEvent {
  type: 'confirm';
  message: React.ReactNode;
  options?: {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    icon?: TypeOptions;
  };
  resolve: (value: boolean) => void;
}

export interface AlertEvent {
  type: 'alert';
  message: React.ReactNode;
  options?: {
    title?: string;
    okText?: string;
    icon?: TypeOptions;
  };
  resolve: () => void;
}

export type SmoothEvent = ToastEvent | ModalEvent | ConfirmEvent | AlertEvent;

type Listener = (event: SmoothEvent) => void;

const listeners = new Set<Listener>();

export function emit(event: SmoothEvent) {
  listeners.forEach(fn => fn(event));
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
