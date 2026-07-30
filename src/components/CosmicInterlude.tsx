import { motion } from "framer-motion";
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
        <motion.span
          key={`${left}-${top}`}
          animate={{ opacity: [0.18, 0.85, 0.18], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 3 + (index % 4), delay: index * 0.17, repeat: Infinity }}
          className="absolute rounded-full bg-white"
          style={{ left: `${left}%`, top: `${top}%`, width: index % 3 === 0 ? 3 : 2, height: index % 3 === 0 ? 3 : 2 }}
        />
      ))}
    </div>
  );
}

function OrbitScene() {
  return (
    <>
      <div className="absolute bottom-[-48%] left-1/2 aspect-square w-[min(78vw,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_48%_28%,#bae6fd_0%,#0ea5e9_12%,#075985_38%,#172554_65%,#020617_100%)] shadow-[0_-35px_120px_rgba(14,165,233,0.2)]" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-22%] left-1/2 h-[38%] w-[82%] -translate-x-1/2 rounded-[50%] border border-[#7dd3fc]/20" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 75, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-8%] left-1/2 h-[54%] w-[64%] -translate-x-1/2 rounded-[50%] border border-white/10" />
      <div className="absolute left-[16%] top-[24%] flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#7dd3fc]/55">
        <Orbit className="h-4 w-4" /> ORBITA / 01
      </div>
    </>
  );
}

function VoyageScene() {
  return (
    <>
      <div className="absolute left-[8%] top-1/2 h-px w-[84%] -rotate-6 bg-gradient-to-r from-transparent via-[#7dd3fc]/35 to-transparent" />
      <motion.div
        initial={{ x: "-18vw", y: 70, opacity: 0 }}
        whileInView={{ x: "36vw", y: -55, opacity: 1 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[22%] top-1/2 text-[#bae6fd]"
      >
        <div className="absolute right-full top-1/2 mr-3 h-px w-28 bg-gradient-to-l from-[#7dd3fc]/70 to-transparent shadow-[0_0_12px_rgba(125,211,252,0.5)]" />
        <Rocket className="h-14 w-14 rotate-[38deg] drop-shadow-[0_0_18px_rgba(125,211,252,0.35)]" strokeWidth={1.2} />
      </motion.div>
      <div className="absolute bottom-[20%] right-[12%] text-right font-mono text-[10px] tracking-[0.28em] text-white/30">
        RUMBO 04.26<br />VELOCIDAD CONSTANTE
      </div>
    </>
  );
}

function SingularityScene() {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#f59e0b]/10 blur-[65px]" />

      <div className="absolute left-1/2 top-1/2 h-48 w-[38rem] -translate-x-1/2 -translate-y-1/2 -rotate-6" style={{ perspective: 700 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[50%] opacity-80 blur-[5px]"
          style={{ background: "conic-gradient(from 20deg, transparent 0deg, #f97316 32deg, #fde68a 58deg, transparent 92deg, #818cf8 155deg, transparent 205deg, #fb923c 282deg, transparent 360deg)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[12%] rounded-[50%] blur-[2px]"
          style={{ background: "conic-gradient(from 180deg, transparent, rgba(255,255,255,.8), #f59e0b, transparent 32%, #6366f1, transparent 64%)" }}
        />
      </div>

      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-orange-100/75 shadow-[0_0_12px_#fff7ed,0_0_38px_#f59e0b,0_0_85px_rgba(99,102,241,0.38)]" />
      <div className="absolute left-1/2 top-1/2 h-[8.5rem] w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_10px_-8px_28px_rgba(30,41,59,0.42),0_0_24px_16px_rgba(0,0,0,0.95)]" />

      <div className="absolute left-1/2 top-[calc(50%_-_5.5rem)] h-24 w-72 -translate-x-1/2 rounded-[50%] border-t border-orange-100/45 blur-[1px]" />
      <div className="absolute bottom-[calc(50%_-_5.5rem)] left-1/2 h-24 w-72 -translate-x-1/2 rounded-[50%] border-b border-indigo-300/25 blur-[1px]" />
      <div className="absolute right-[14%] top-[22%] flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#a5b4fc]/55">
        <Sparkles className="h-4 w-4" /> SINGULARIDAD / 03
      </div>
    </>
  );
}

export default function CosmicInterlude({ variant }: CosmicInterludeProps) {
  return (
    <section aria-hidden="true" className="relative h-[68vh] min-h-[480px] w-full overflow-hidden">
      <StarField />
      <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0ea5e9]/5 blur-[110px]" />
      {variant === "orbit" && <OrbitScene />}
      {variant === "voyage" && <VoyageScene />}
      {variant === "singularity" && <SingularityScene />}
    </section>
  );
}
