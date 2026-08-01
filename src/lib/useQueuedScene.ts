import { useCallback, useLayoutEffect, useRef, useState } from "react";

type QueuedSceneOptions = {
  animated?: boolean;
  initialIndex?: number;
  isNearViewport: boolean;
};

/**
 * Mantiene como máximo una salida y una entrada animadas al mismo tiempo.
 * Los cambios adicionales se compactan en el último índice solicitado.
 */
export function useQueuedScene({
  animated = true,
  initialIndex = 0,
  isNearViewport,
}: QueuedSceneOptions) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeIndexRef = useRef(initialIndex);
  const pendingIndexRef = useRef(initialIndex);
  const transitionInFlightRef = useRef(false);
  const animatedRef = useRef(animated);
  const nearViewportRef = useRef(isNearViewport);

  animatedRef.current = animated;
  nearViewportRef.current = isNearViewport;

  const commitScene = useCallback((nextIndex: number) => {
    if (
      nextIndex === activeIndexRef.current ||
      (animatedRef.current && transitionInFlightRef.current)
    ) {
      return;
    }

    activeIndexRef.current = nextIndex;
    transitionInFlightRef.current = animatedRef.current;
    setActiveIndex(nextIndex);
  }, []);

  const queueScene = useCallback((nextIndex: number, defer = false) => {
    pendingIndexRef.current = nextIndex;
    if (!defer) commitScene(nextIndex);
  }, [commitScene]);

  // La detección de scroll rápido no bloquea contenido: la propia cola ya
  // limita la concurrencia y conserva siempre el último índice solicitado.
  useLayoutEffect(() => {
    if (!animated) transitionInFlightRef.current = false;
    if (isNearViewport) {
      commitScene(pendingIndexRef.current);
    }
  }, [animated, commitScene, isNearViewport]);

  const handleExitComplete = useCallback(() => {
    transitionInFlightRef.current = false;

    if (nearViewportRef.current) {
      commitScene(pendingIndexRef.current);
    }
  }, [commitScene]);

  return {
    activeIndex,
    handleExitComplete,
    queueScene,
  };
}
