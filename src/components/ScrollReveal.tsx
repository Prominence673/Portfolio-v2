import { motion, useInView, useMotionValueEvent, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { getFastScrolling, useFastScrolling } from "@/lib/scrollActivity";

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
  const ref = useRef<HTMLDivElement>(null);
  const isNearViewport = useInView(ref, { margin: "35% 0px" });
  const nearViewportRef = useRef(isNearViewport);
  const fastScrolling = useFastScrolling();
  nearViewportRef.current = isNearViewport;

  const progress = useTransform(scrollYProgress, range, [0, 1]);
  const smoothProgress = useSpring(progress.get(), { stiffness: 120, damping: 32 });
  const springY = useTransform(smoothProgress, [0, 1], [y, 0]);
  const springX = useTransform(smoothProgress, [0, 1], [x, 0]);
  const springOpacity = useTransform(smoothProgress, [0, 1], [opacityFrom, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (getFastScrolling() || !nearViewportRef.current) {
      smoothProgress.jump(latest);
    } else {
      smoothProgress.set(latest);
    }
  });

  useEffect(() => {
    if (fastScrolling || !isNearViewport) {
      smoothProgress.jump(progress.get());
    }
  }, [fastScrolling, isNearViewport, progress, smoothProgress]);

  return (
    <motion.div
      ref={ref}
      style={{ y: springY, x: springX, opacity: springOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
