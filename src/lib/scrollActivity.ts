import { useSyncExternalStore } from "react";

const ENTER_VIEWPORTS_PER_SECOND = 2.8;
const EXIT_VIEWPORTS_PER_SECOND = 0.6;
const BIG_JUMP_VIEWPORT_RATIO = 0.55;
const SETTLE_DELAY_MS = 130;
const NO_EVENT_SETTLE_DELAY_MS = 200;

const listeners = new Set<() => void>();

let started = false;
let fastScrolling = false;
let lastScrollY = 0;
let lastTimestamp = 0;
let latestScrollY = 0;
let sampleFrame: number | null = null;
let settleTimer: number | null = null;
let belowExitSince = 0;

function publish(next: boolean) {
  if (fastScrolling === next) return;

  fastScrolling = next;
  document.documentElement.toggleAttribute("data-fast-scroll", next);
  listeners.forEach((listener) => listener());
}

function clearSettleTimer() {
  if (settleTimer === null) return;
  window.clearTimeout(settleTimer);
  settleTimer = null;
}

function scheduleSettle(delay: number) {
  clearSettleTimer();
  settleTimer = window.setTimeout(() => {
    settleTimer = null;
    belowExitSince = 0;
    publish(false);
  }, delay);
}

function sampleScroll() {
  sampleFrame = null;
  const now = performance.now();
  const currentY = latestScrollY;
  const distance = Math.abs(currentY - lastScrollY);
  const elapsedSeconds = Math.max((now - lastTimestamp) / 1000, 1 / 240);
  const viewportHeight = Math.max(window.innerHeight, 1);
  const viewportsPerSecond = distance / elapsedSeconds / viewportHeight;

  if (
    distance >= viewportHeight * BIG_JUMP_VIEWPORT_RATIO ||
    viewportsPerSecond >= ENTER_VIEWPORTS_PER_SECOND
  ) {
    belowExitSince = 0;
    publish(true);
  }

  if (fastScrolling) {
    if (viewportsPerSecond <= EXIT_VIEWPORTS_PER_SECOND) {
      if (!belowExitSince) belowExitSince = now;
      const elapsedBelowExit = now - belowExitSince;
      scheduleSettle(Math.max(0, SETTLE_DELAY_MS - elapsedBelowExit));
    } else {
      belowExitSince = 0;
      scheduleSettle(NO_EVENT_SETTLE_DELAY_MS);
    }
  }

  lastScrollY = currentY;
  lastTimestamp = now;
}

function handleScroll() {
  latestScrollY = window.scrollY;
  // Evita un falso fast -> normal entre el evento nativo y su muestra RAF.
  clearSettleTimer();
  if (sampleFrame === null) sampleFrame = window.requestAnimationFrame(sampleScroll);
}

function handleVisibilityChange() {
  lastScrollY = window.scrollY;
  latestScrollY = lastScrollY;
  lastTimestamp = performance.now();

  if (document.hidden) {
    if (sampleFrame !== null) {
      window.cancelAnimationFrame(sampleFrame);
      sampleFrame = null;
    }
    clearSettleTimer();
    belowExitSince = 0;
    publish(false);
  }
}

export function startScrollActivity() {
  if (started || typeof window === "undefined") return;

  started = true;
  lastScrollY = window.scrollY;
  latestScrollY = lastScrollY;
  lastTimestamp = performance.now();
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
}

export function getFastScrolling() {
  return fastScrolling;
}

export function subscribeFastScrolling(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useFastScrolling() {
  return useSyncExternalStore(
    subscribeFastScrolling,
    getFastScrolling,
    () => false,
  );
}
