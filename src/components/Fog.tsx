import Particles from "@tsparticles/react";
import React, { useMemo } from "react";
import type { ISourceOptions } from "@tsparticles/engine";

const Fog = () => {

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },

    background: {
      color: { value: "transparent" }
    },

    fpsLimit: 60,

    particles: {
      number: {
        value: 20,
        density: { enable: true },
      },

      color: {
        value: ["#00f5ff", "#0ea5e9", "#6366f1", "#7c3aed"],
      },

      shape: {
        type: "circle"
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
      enable: false
    },

    detectRetina: true,

    interactivity: {
      events: {
        onHover: {
          enable: false
        }
      }
    },

  }), []);

  return (
    <div
      style={{
        filter: "blur(60px)",
        position: "fixed",
        inset: "-10%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Particles
        id="fog"
        style={{ position: "absolute", inset: 0 }}
        options={options}
      />
    </div>
  );
}

export default React.memo(Fog);