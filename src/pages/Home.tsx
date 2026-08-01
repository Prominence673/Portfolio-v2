import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, memo } from "react";
import { Helmet } from 'react-helmet-async';
import { X } from "lucide-react";
import { TypingText } from "@/components/Typingtext"

const PDFModal = memo(function PDFModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar currículum"
        className="absolute right-4 top-[calc(1rem+env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#020617]/90 text-white shadow-lg backdrop-blur-md lg:right-8 lg:top-8"
      >
        <X className="h-5 w-5" />
      </button>
      <iframe
        src="pdf/CV_Lautaro_Souza.pdf"
        title="Curriculum vitae de Lautaro Souza"
        className="h-[calc(100svh-6rem)] w-[calc(100%-1.5rem)] rounded-xl bg-white lg:h-[90%] lg:w-[80%] lg:rounded-lg"
      />
    </div>
  );
});

// Renderizamos decorativos complejos de forma lazy
const DecorativeBackground = memo(function DecorativeBackground() {
  return (
    <div className="absolute w-full h-full overflow-hidden">
      {/* Gradiente simplificado #1 - blur reducido de 3xl a xl */}
      <div className="absolute w-full h-full">
        
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                        w-160 h-160 rounded-full blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.5) 0%, rgba(14,165,233,0.3) 50%, transparent 70%)" }}/>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                        w-130 h-130 rounded-full blur-xl opacity-70"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.7) 0%, rgba(14,165,233,0.4) 40%, transparent 70%)" }}/>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                        w-100 h-100 rounded-full blur-md opacity-80"
            style={{ background: "radial-gradient(circle, transparent 35%, rgba(14,165,233,0.8) 50%, rgba(99,102,241,0.5) 65%, transparent 75%)" }}/>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                        w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, #0ea5e9 60%, rgba(14,165,233,0.8) 80%, transparent 100%)" }}/>
  
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ perspective: "600px" }}>
  
          <div style={{
            width: "1000px", height: "1000px",
            border: "1px solid rgba(14,165,233,0.06)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(15deg)",
          }}/>
  
          <div style={{
            width: "880px", height: "880px",
            border: "2px solid rgba(14,165,233,0.10)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(15deg)",
          }}/>
  
          <div style={{
            width: "760px", height: "760px",
            border: "3px solid rgba(14,165,233,0.20)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(15deg)",
          }}/>
  
          <div style={{
            width: "660px", height: "660px",
            border: "8px solid rgba(14,165,233,0.12)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(15deg)",
          }}/>
  
          <div style={{
            width: "560px", height: "560px",
            border: "12px solid rgba(14,165,233,0.08)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(15deg)",
          }}/>
        </div>
  
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                        w-[900px] h-[900px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, rgba(255,220,150,0.3) 0%, rgba(180,140,255,0.1) 40%, transparent 70%)" }}/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[180px] rounded-full blur-2xl opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, rgba(200,180,255,0.6), transparent)",
                      transform: "translate(-50%,-50%) rotate(30deg)" }}/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[180px] rounded-full blur-2xl opacity-25"
            style={{ background: "linear-gradient(90deg, transparent, rgba(180,160,255,0.5), transparent)",
                      transform: "translate(-50%,-50%) rotate(210deg)" }}/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[500px] h-[30px] blur-md opacity-60"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.7), transparent)",
                      transform: "translate(-50%,-50%) rotate(30deg) translateY(20px)" }}/>
        </div>

      {/* Accent line simplificado */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 rounded-full blur-lg opacity-20"
        style={{ 
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)"
        }}
      />
    </div>
  );
});

/** Un sistema orbital vertical, liviano y separado del decorativo desktop. */
const MobileDecorativeBackground = memo(function MobileDecorativeBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden lg:hidden">
      <div
        className="absolute left-1/2 top-[9%] h-[66svh] w-[72vw] max-w-[19rem] rounded-[50%] border border-sky-300/10"
        style={{ transform: "translateX(-50%) rotate(8deg)" }}
      />
      <div className="absolute left-1/2 top-[13%] h-[54svh] w-[54vw] max-w-[14rem] -translate-x-1/2">
        <div className="ambient-motion mobile-home-orbit absolute inset-0 rounded-[50%] border border-indigo-300/15">
          <span className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-sky-200/70 shadow-[0_0_12px_rgba(125,211,252,0.55)]" />
        </div>
      </div>
      <div
        className="absolute left-1/2 top-[10%] h-[clamp(7rem,22svh,11rem)] w-[clamp(7rem,22svh,11rem)] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 34% 28%, #dbeafe 0%, #38bdf8 12%, #0369a1 38%, #082f49 68%, #020617 100%)",
          boxShadow: "0 0 55px rgba(56,189,248,0.18)",
        }}
      >
        <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.2),transparent_45%)]" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[48%]"
        style={{ background: "linear-gradient(to top, #020617 24%, rgba(2,6,23,0.88) 52%, transparent 100%)" }}
      />
      <div className="absolute left-1/2 top-[8%] h-[78svh] w-px bg-gradient-to-b from-transparent via-sky-300/10 to-transparent" />
    </div>
  );
});

const TECH_STACK = ["React", "TypeScript", "Node.js", "Tailwind"];
const GREETINGS = ["mundo", "visitante", "futuro cliente"];

export default function Home() {
  const [seePdf, setSeePdf] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isHomeNearViewport = useInView(sectionRef, { margin: "100% 0px", initial: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.55]);
  const navY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const footerY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
<>
      <Helmet>
        <title>Inicio | Lautaro Souza - Portafolio</title>
        <meta name="description" content="Desarrollador full stack especializado en React, Node.js y diseño de interfaces modernas. Disponible para proyectos de frontend, backend y fullstack." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/" />
      </Helmet>
      <PDFModal isOpen={seePdf} onClose={() => setSeePdf(false)} />
      
      <section
        ref={sectionRef}
        id="home"
        className="scroll-scene relative flex min-h-[100svh] w-full flex-col overflow-hidden lg:min-h-screen"
        style={{ contain: "layout style" }}
      >
        {/* Decorativos renderizados de forma lazy */}
        {isHomeNearViewport && (
          <>
            <div className="performance-heavy absolute hidden h-full w-full lg:block">
              <DecorativeBackground />
            </div>
            <div className="performance-heavy absolute inset-0 lg:hidden">
              <MobileDecorativeBackground />
            </div>
          </>
        )}

        {/* Nav - sin animación inicial para mejor FCP */}
        <motion.nav
          style={{ y: navY }}
          className="z-10 flex items-center justify-between px-5 py-4 lg:px-10 lg:py-7"
        >
          <span className="text-white text-sm font-medium tracking-wide">souz.portfolio</span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 lg:hidden">01 / INICIO</span>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 flex flex-1 flex-col justify-end px-5 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-24 sm:px-10 sm:pb-[calc(6rem+env(safe-area-inset-bottom))] lg:justify-center lg:px-20 lg:pb-10 lg:pt-0"
        >
          <HeroContent setSeePdf={setSeePdf} />
        </motion.div>

        {/* Footer - sin animación inicial para mejor FCP */}
        <motion.div
          style={{ y: footerY }}
          className="z-10 hidden items-end justify-between lg:flex lg:px-20 lg:pb-10"
        >
          <FooterContent />
        </motion.div>
      </section>
    </>
  );
}

// Extracto para reducir re-renders
const HeroContent = memo(function HeroContent({
  setSeePdf,
}: {
  setSeePdf: (value: boolean) => void;
}) {
  return (
    <>
      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#020617]/45 px-3 py-1.5 backdrop-blur-sm lg:mb-8 lg:bg-white/5 lg:px-4 lg:backdrop-blur-none">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-white/50 text-xs">disponible para trabajar</span>
      </div>

      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/40 lg:mb-4 lg:text-xs lg:tracking-widest">
        desarrollador full stack
      </p>

      <h1 className="mb-1 text-[clamp(2.25rem,10.5vw,3.4rem)] font-semibold leading-[1.02] text-white lg:text-7xl lg:leading-tight">
        Hola, <span className="text-white">
          <TypingText
            text={GREETINGS}
            speed={65}
            deleteSpeed={35}
            pauseTime={1000}
            className="font-[Dancing_Script]"
          />
        </span>
        .
      </h1>

      <h1 className="mb-4 bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-[clamp(2.25rem,10.5vw,3.4rem)] font-semibold leading-[1.02] text-transparent lg:mb-6 lg:text-7xl lg:leading-tight">
        Bienvenido
      </h1>

      <p className="mb-5 max-w-md text-[13px] leading-relaxed text-white/55 sm:text-sm lg:mb-10 lg:text-base lg:text-white/45">
        Construyo experiencias digitales limpias y funcionales. 
        Especializado en React, Node.js y diseño de interfaces modernas.
      </p>

      <div className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row sm:items-center lg:gap-3">
        <button
          onClick={() => setSeePdf(true)}
          className="h-11 w-full rounded-full border border-[#1D2A3A]/70 bg-[#0F2742] text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.99] sm:w-40 lg:h-12 lg:hover:scale-105 lg:active:scale-100"
        >
          Ver cv
        </button>
        <a
          href="#contact"
          className="flex h-11 w-full items-center justify-center rounded-full border border-white/15 px-5 text-sm text-white/60 transition-all hover:border-white/40 hover:text-white active:scale-[0.99] sm:w-auto sm:px-6 lg:h-auto lg:py-2.5 lg:hover:scale-105 lg:active:scale-100"
        >
          Contactarme
        </a>
      </div>

      <div className="mt-4 flex max-w-md items-center gap-2 overflow-hidden lg:hidden">
        <span className="h-px min-w-5 flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        <div className="flex flex-wrap justify-end gap-1.5">
          {TECH_STACK.map((technology) => (
            <span key={technology} className="rounded-full border border-white/10 bg-[#020617]/35 px-2 py-1 text-[9px] tracking-wide text-white/40">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </>
  );
});

const FooterContent = memo(function FooterContent() {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="w-8 h-px bg-white/20" />
        <span className="text-white/25 text-xs">scroll para explorar</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {TECH_STACK.map((t) => (
          <span key={t} className="text-xs text-white/35 border border-white/10 rounded-full px-3 py-1">
            {t}
          </span>
        ))}
      </div>
    </>
  );
});
