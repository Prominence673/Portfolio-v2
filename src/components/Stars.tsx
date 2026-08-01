import Particles from "@tsparticles/react";
import React ,{ useMemo } from "react";
import { useParticlesScrollPause } from "@/lib/useParticlesScrollPause";

const Stars = () => {
  const particlesLoaded = useParticlesScrollPause();
  const options = useMemo(() => ({
    fullScreen: { enable: true },
    background: { color: "transparent" },
    fpsLimit: 60,
    pauseOnBlur: false,

    particles: {
      number: { value: 30 },

      color: { value: "#ffff" },

      shape: { type: "circle" },

      opacity: {
        value: 0.8,
        animation: {
          enable: true,
          speed: 0.2
        }
      },

      size: {
        value: { min: 1, max: 3 }
      },

      move: {
        enable: false,
        speed: 0.25,
        direction: "bottomLeft" as const,
        random: true,
        straight: false,
        outModes: { default: "out" as const }
      },
    },

    detectRetina: true
  }), []);

  return (
    <Particles
      id="stars"
      options={options}
      particlesLoaded={particlesLoaded}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1
      }}
    />
  );
}


export default React.memo(Stars);
