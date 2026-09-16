"use client";

// Store externo mínimo (useSyncExternalStore) para o estado aberto/fechado do drawer de
// navegação mobile — Header (hamburger) e SidebarLeft (drawer) são slots irmãos no layout, sem
// ancestral comum client-side, então o estado vive fora da árvore React.
import { useSyncExternalStore } from "react";

let isOpen = false;
let lastTrigger: HTMLElement | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return isOpen;
}

function getServerSnapshot() {
  return false;
}

function captureTrigger() {
  if (typeof document !== "undefined") {
    lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }
}

export function openMobileNav() {
  captureTrigger();
  isOpen = true;
  emitChange();
}

export function closeMobileNav() {
  isOpen = false;
  emitChange();
}

export function toggleMobileNav() {
  if (!isOpen) captureTrigger();
  isOpen = !isOpen;
  emitChange();
}

export function useMobileNavOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getMobileNavTrigger(): HTMLElement | null {
  return lastTrigger;
}
