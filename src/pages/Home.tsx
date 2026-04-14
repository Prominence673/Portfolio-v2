import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TypingText } from "@/components/Typingtext"

export default function Home() {
  const [seePdf, setSeePdf] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.55]);
  const navY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const footerY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 35 });
  const springHeroOp = useSpring(heroOpacity, { stiffness: 100, damping: 35 });
  const springNavY = useSpring(navY, { stiffness: 100, damping: 35 });
  const springFooterY = useSpring(footerY, { stiffness: 100, damping: 35 });

  return (
    <>
      {seePdf && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSeePdf(false)}
        >
          <iframe
            src="pdf/CV_Lautaro_Souza.pdf"
            className="w-[80%] h-[90%] bg-white rounded-lg"
          />
        </div>
      )}
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
    >
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

      {/* Nav */}
      <motion.nav
        style={{ y: springNavY }}
        className="flex justify-between items-center px-6 sm:px-10 py-5 sm:py-7 z-10"
      >
        <span className="text-white text-sm font-medium tracking-wide">souz.portfolio</span>
      </motion.nav>

      <motion.div
        style={{ y: springHeroY, opacity: springHeroOp }}
        className="flex flex-col justify-center flex-1 px-6 sm:px-12 md:px-20 pb-10 z-10"
      >
        {/* Badge disponible */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-white/50 text-xs">disponible para trabajar</span>
        </div>

        <p className="text-white/35 text-xs tracking-widest uppercase mb-3 sm:mb-4">
          desarrollador full stack
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-tight mb-1">
          Hola, <span className="text-white">
            <TypingText
              text={["mundo", "visitante", "futuro cliente"]}
              speed={65}
              deleteSpeed={35}
              pauseTime={1000}
              className="font-[Dancing_Script]"
            />
          </span>
          .
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-5 sm:mb-6 bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">
          Bienvenido
        </h1>

        <p className="text-white/45 text-sm sm:text-base max-w-md leading-relaxed mb-8 sm:mb-10">
          Construyo experiencias digitales limpias y funcionales. 
          Especializado en React, Node.js y diseño de interfaces modernas.
        </p>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setSeePdf(true)}
            className="w-36 sm:w-40 h-10 sm:h-12 bg-[#0F2742] text-white text-sm rounded-full border border-[#1D2A3A]/70 transition-all hover:scale-105"
          >
            Ver cv
          </button>
          <button className="text-white/60 border border-white/15 rounded-full px-5 sm:px-6 py-2.5 text-sm hover:border-white/40 hover:text-white transition-all hover:scale-105 active:scale-100">
            Contactarme
          </button>
        </div>
      </motion.div>

      {/* Footer del hero */}
      <motion.div
        style={{ y: springFooterY }}
        className="hidden sm:flex justify-between items-end px-6 sm:px-20 pb-8 sm:pb-10 z-10"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-white/20" />
          <span className="text-white/25 text-xs">scroll para explorar</span>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {["React", "TypeScript", "Node.js", "Tailwind"].map((t) => (
            <span key={t} className="text-xs text-white/35 border border-white/10 rounded-full px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  );
}