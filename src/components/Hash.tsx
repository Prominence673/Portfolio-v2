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
      const timer = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
      return () => clearTimeout(timer);
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

      return () => {
        cancelAnimationFrame(frame);
      };
    }
  }, [hash, pathname]);

  return null;
};
