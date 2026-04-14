import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  opacityFrom?: number;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
};

export function ScrollReveal({
  children,
  className = "",
  y = 56,
  x = 0,
  opacityFrom = 0,
  scrollYProgress,
  range
}: ScrollRevealProps) {
  const progress = useTransform(scrollYProgress, range, [0, 1]);

  const ty = useTransform(progress, [0, 1], [y, 0]);
  const tx = useTransform(progress, [0, 1], [x, 0]);
  const opacity = useTransform(progress, [0, 1], [opacityFrom, 1]);

  const springY = useSpring(ty, { stiffness: 120, damping: 32 });
  const springX = useSpring(tx, { stiffness: 120, damping: 32 });
  const springOpacity = useSpring(opacity, { stiffness: 120, damping: 32 });

  return (
    <motion.div
      style={{ y: springY, x: springX, opacity: springOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
