import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
      return;
    }

    if (pathname === "/") {
      const resetToTop = () => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = previousBehavior;
      };

      resetToTop();
      const frame = requestAnimationFrame(resetToTop);
      const firstTimer = window.setTimeout(resetToTop, 120);
      const secondTimer = window.setTimeout(resetToTop, 450);

      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    }
  }, [hash, pathname]);

  return null;
};
