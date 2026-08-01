import type { Container } from "@tsparticles/engine";
import { useCallback, useEffect, useRef } from "react";
import { getFastScrolling, subscribeFastScrolling } from "@/lib/scrollActivity";

export function useParticlesScrollPause() {
  const containerRef = useRef<Container | undefined>(undefined);

  useEffect(() => {
    const updatePlayback = () => {
      const container = containerRef.current;
      if (!container) return;

      if (getFastScrolling() || document.hidden) {
        container.pause();
      } else {
        container.play();
      }
    };

    const unsubscribe = subscribeFastScrolling(updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", updatePlayback);
      containerRef.current = undefined;
    };
  }, []);

  return useCallback(async (container?: Container) => {
    containerRef.current = container;

    if (container && (getFastScrolling() || document.hidden)) {
      container.pause();
    }
  }, []);
}
