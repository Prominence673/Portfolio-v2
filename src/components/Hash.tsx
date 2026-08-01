import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_HASH_RETRIES = 24;

const scrollToTopImmediately = () => {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = previousBehavior;
};

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    let frame = 0;
    let timer = 0;
    let cancelled = false;

    if (!hash) {
      if (pathname !== "/") return;

      // El reset ocurre antes de pintar la ruta. Un segundo frame evita que la
      // restauracion nativa gane la carrera, sin perseguir el scroll del usuario.
      scrollToTopImmediately();
      frame = window.requestAnimationFrame(scrollToTopImmediately);

      return () => window.cancelAnimationFrame(frame);
    }

    let targetId = hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Conserva el hash literal si contiene una secuencia URI invalida.
    }

    let attempts = 0;
    const findTarget = () => {
      if (cancelled) return;

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts >= MAX_HASH_RETRIES) return;

      // Las secciones de la portada son lazy. Reintenta por un lapso acotado
      // y entrega cada busqueda al siguiente frame para usar el layout vigente.
      const retryDelay = Math.min(40 + attempts * 5, 120);
      timer = window.setTimeout(() => {
        frame = window.requestAnimationFrame(findTarget);
      }, retryDelay);
    };

    frame = window.requestAnimationFrame(findTarget);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash, pathname]);

  return null;
};
