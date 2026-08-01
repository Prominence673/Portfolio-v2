import Particles from "@tsparticles/react";
import React, { useEffect, useMemo, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useParticlesScrollPause } from "@/lib/useParticlesScrollPause";

const getParticleCount = () => {
  if (typeof window === "undefined") return 20;

  const viewportArea = window.innerWidth * window.innerHeight;
  const referenceArea = 1920 * 1080;

  // Replica la densidad anterior, pero evita tanto el exceso en 4K como
  // un mínimo artificialmente caro en pantallas chicas.
  return Math.min(
    28,
    Math.max(4, Math.round(20 * 1.44 * (viewportArea / referenceArea))),
  );
};

const Fog = () => {
  const particlesLoaded = useParticlesScrollPause();
  const [particleCount, setParticleCount] = useState(getParticleCount);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setParticleCount((current) => {
          const next = getParticleCount();
          return current === next ? current : next;
        });
      }, 220);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },

    background: {
      color: { value: "transparent" },
    },

    fpsLimit: 30,
    // La pausa por visibilidad y por scroll se centraliza en el hook para no
    // crear dos ciclos RAF al volver a la pestaña.
    pauseOnBlur: false,

    particles: {
      number: {
        value: particleCount,
        density: { enable: false },
      },

      color: {
        value: ["#00f5ff", "#0ea5e9", "#6366f1", "#7c3aed"],
      },

      shape: {
        type: "circle",
      },

      opacity: {
        value: { min: 0.06, max: 0.18 },

        animation: {
          enable: true,
          speed: 0.08,
          sync: false,
        },
      },

      size: {
        value: { min: 120, max: 280 },

        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },

      move: {
        enable: true,
        speed: 0.15,
        direction: "none",
        random: true,
        straight: false,

        outModes: {
          default: "out",
        },

        drift: 0,
        warp: false,
      },
    },

    links: {
      enable: false,
    },

    // El blur de 60px vuelve indistinguible el supersampling Retina y evita
    // renderizar un canvas fijo de fondo a 2x/3x resolución.
    detectRetina: false,

    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
      },
    },
  }), [particleCount]);

  return (
    <div
      style={{
        filter: "blur(60px)",
        position: "fixed",
        inset: "-72px",
        zIndex: 0,
        pointerEvents: "none",
        contain: "strict",
      }}
    >
      <Particles
        id="fog"
        style={{ position: "absolute", inset: 0 }}
        options={options}
        particlesLoaded={particlesLoaded}
      />
    </div>
  );
};

export default React.memo(Fog);
