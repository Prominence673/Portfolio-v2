import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const smoothX = useSpring(pointerX, { stiffness: 400, damping: 30 });
  const smoothY = useSpring(pointerY, { stiffness: 400, damping: 30 });
  const [mouseClicked, setMouseClicked] = useState(false);

  useEffect(() => {
    const up = () => setMouseClicked(false);
    const down = () => setMouseClicked(true);
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerdown", down);
    };
  }, [pointerX, pointerY]);

  return (
    <>
      <motion.div
        animate={{ scale: mouseClicked ? 1.5 : 1 }}
        style={{
          x: pointerX,
          y: pointerY,
          position: "fixed",
          top: 0,
          left: 0,
          marginLeft: -5,
          marginTop: -5,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: 45,
          position: "fixed",
          top: 0,
          left: 0,
          marginLeft: -10,
          marginTop: -10,
          width: 20,
          height: 20,
          border: "1px solid white",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}
