import { useRef, type CSSProperties } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Orbit, Rocket, Sparkles } from "lucide-react";

type CosmicInterludeProps = {
  variant: "orbit" | "voyage" | "singularity";
};

const stars = [
  [8, 22], [14, 71], [23, 39], [31, 13], [38, 81], [47, 28],
  [55, 66], [63, 18], [72, 44], [79, 76], [88, 25], [94, 58],
];

function StarField() {
  return (
    <div className="absolute inset-0">
      {stars.map(([left, top], index) => (
        <span
          key={`${left}-${top}`}
          className="ambient-motion cosmic-star absolute rounded-full bg-white"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: index % 3 === 0 ? 3 : 2,
            height: index % 3 === 0 ? 3 : 2,
            "--cosmic-duration": `${3 + (index % 4)}s`,
            "--cosmic-delay": `${index * 0.17}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function OrbitScene() {
  return (
    <>
      <div className="absolute bottom-[-20%] left-1/2 aspect-square w-[128vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_48%_28%,#bae6fd_0%,#0ea5e9_12%,#075985_38%,#172554_65%,#020617_100%)] shadow-[0_-35px_120px_rgba(14,165,233,0.2)] md:bottom-[-48%] md:w-[min(78vw,760px)]" />
      <div className="absolute bottom-[-5%] left-1/2 h-[76%] w-[48%] -translate-x-1/2 md:bottom-[-22%] md:h-[38%] md:w-[82%]">
        <div className="ambient-motion cosmic-orbit-clockwise absolute inset-0 rounded-[50%] border border-[#7dd3fc]/20" />
      </div>
      <div className="absolute bottom-[7%] left-1/2 h-[62%] w-[70%] -translate-x-1/2 md:bottom-[-8%] md:h-[54%] md:w-[64%]">
        <div className="ambient-motion cosmic-orbit-counterclockwise absolute inset-0 rounded-[50%] border border-white/10" />
      </div>
      <div className="absolute left-7 top-[15%] flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#7dd3fc]/55 md:left-[16%] md:top-[24%]">
        <Orbit className="h-4 w-4" /> ORBITA / 01
      </div>
    </>
  );
}

function VoyageScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const desktopX = useTransform(scrollProgress, [0.38, 0.72], ["-18vw", "36vw"]);
  const desktopY = useTransform(scrollProgress, [0.38, 0.72], [70, -55]);
  const mobileX = useTransform(scrollProgress, [0.36, 0.72], [-26, 24]);
  const mobileY = useTransform(scrollProgress, [0.36, 0.72], [165, -165]);
  const opacity = useTransform(scrollProgress, [0.34, 0.4, 0.75, 0.82], [0, 1, 1, 0]);

  return (
    <>
      <div className="absolute bottom-[8%] left-1/2 top-[8%] w-px bg-gradient-to-b from-transparent via-[#7dd3fc]/35 to-transparent md:hidden" />
      <div className="absolute left-[8%] top-1/2 hidden h-px w-[84%] -rotate-6 bg-gradient-to-r from-transparent via-[#7dd3fc]/35 to-transparent md:block" />
      <motion.div
        style={{ x: mobileX, y: mobileY, opacity }}
        className="absolute left-1/2 top-1/2 text-[#bae6fd] md:hidden"
      >
        <div className="relative -translate-x-1/2">
          <div className="absolute left-1/2 top-full mt-3 h-28 w-px -translate-x-1/2 bg-gradient-to-b from-[#7dd3fc]/70 to-transparent shadow-[0_0_12px_rgba(125,211,252,0.5)]" />
          <Rocket className="h-14 w-14 -rotate-45 drop-shadow-[0_0_18px_rgba(125,211,252,0.35)]" strokeWidth={1.2} />
        </div>
      </motion.div>
      <motion.div
        style={{ x: desktopX, y: desktopY, opacity }}
        className="absolute left-[22%] top-1/2 hidden text-[#bae6fd] md:block"
      >
        <div className="absolute right-full top-1/2 mr-3 h-px w-28 bg-gradient-to-l from-[#7dd3fc]/70 to-transparent shadow-[0_0_12px_rgba(125,211,252,0.5)]" />
        <Rocket className="h-14 w-14 rotate-[38deg] drop-shadow-[0_0_18px_rgba(125,211,252,0.35)]" strokeWidth={1.2} />
      </motion.div>
      <div className="absolute bottom-[12%] right-6 text-right font-mono text-[10px] tracking-[0.28em] text-white/30 md:bottom-[20%] md:right-[12%]">
        RUMBO 04.26<br />VELOCIDAD CONSTANTE
      </div>
    </>
  );
}

function SingularityScene() {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#f59e0b]/10 blur-[48px] md:h-64 md:w-[42rem] md:blur-[65px]" />

      <div className="absolute left-1/2 top-1/2 h-[27rem] w-44 -translate-x-1/2 -translate-y-1/2 rotate-[8deg] md:h-48 md:w-[38rem] md:-rotate-6" style={{ perspective: 700 }}>
        <div
          className="ambient-motion cosmic-singularity-clockwise absolute inset-0 rounded-[50%] opacity-80 blur-[5px]"
          style={{ background: "conic-gradient(from 20deg, transparent 0deg, #f97316 32deg, #fde68a 58deg, transparent 92deg, #818cf8 155deg, transparent 205deg, #fb923c 282deg, transparent 360deg)" }}
        />
        <div
          className="ambient-motion cosmic-singularity-counterclockwise absolute inset-[12%] rounded-[50%] blur-[2px]"
          style={{ background: "conic-gradient(from 180deg, transparent, rgba(255,255,255,.8), #f59e0b, transparent 32%, #6366f1, transparent 64%)" }}
        />
      </div>

      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-orange-100/75 shadow-[0_0_12px_#fff7ed,0_0_38px_#f59e0b,0_0_85px_rgba(99,102,241,0.38)] md:h-40 md:w-40" />
      <div className="absolute left-1/2 top-1/2 h-[7.5rem] w-[7.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_10px_-8px_28px_rgba(30,41,59,0.42),0_0_24px_16px_rgba(0,0,0,0.95)] md:h-[8.5rem] md:w-[8.5rem]" />

      <div className="absolute left-1/2 top-[calc(50%_-_5rem)] h-20 w-56 -translate-x-1/2 rounded-[50%] border-t border-orange-100/45 blur-[1px] md:top-[calc(50%_-_5.5rem)] md:h-24 md:w-72" />
      <div className="absolute bottom-[calc(50%_-_5rem)] left-1/2 h-20 w-56 -translate-x-1/2 rounded-[50%] border-b border-indigo-300/25 blur-[1px] md:bottom-[calc(50%_-_5.5rem)] md:h-24 md:w-72" />
      <div className="absolute right-6 top-[13%] flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#a5b4fc]/55 md:right-[14%] md:top-[22%]">
        <Sparkles className="h-4 w-4" /> SINGULARIDAD / 03
      </div>
    </>
  );
}

export default function CosmicInterlude({ variant }: CosmicInterludeProps) {
  const ref = useRef<HTMLElement>(null);
  const isNearViewport = useInView(ref, { margin: "300px 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} aria-hidden="true" className="relative h-[78svh] min-h-[520px] w-full overflow-hidden md:h-[68vh] md:min-h-[480px]">
      <div className="absolute bottom-[8%] left-6 top-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:hidden" />
      <div className="absolute inset-x-[8%] top-0 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
      {isNearViewport && (
        <>
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0ea5e9]/5 blur-[70px] md:blur-[110px]" />
          <StarField />
          {variant === "orbit" && <OrbitScene />}
          {variant === "voyage" && (
            <VoyageScene scrollProgress={scrollYProgress} />
          )}
          {variant === "singularity" && <SingularityScene />}
        </>
      )}
    </section>
  );
}
