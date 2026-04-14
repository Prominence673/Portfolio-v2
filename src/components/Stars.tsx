import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Stars() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="stars"
      options={{
        fullScreen: { enable: true },
        background: { color: "transparent" },

        particles: {
            number: { value: 40 },
          
            color: { value: "#ffff" },
          
            shape: { type: "circle" },
          
            opacity: {
              value: 1,
              animation: {
                enable: true,
                speed: 0.3
              }
            },
          
            size: {
              value: { min: 1, max: 4 }
            },
          
            move: {
              enable: false,
              speed: 0.25,
              direction: "bottomLeft",
              random: true,
              straight: false,
              outModes: { default: "out" }
            },
          },
        detectRetina: true
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1
      }}
    />
  );
}