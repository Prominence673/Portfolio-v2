import Balancer from "react-wrap-balancer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, Users, Target } from "lucide-react";
import { useEffect, useRef, memo, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, useInView, useMotionValueEvent, useScroll, motion, useSpring } from "framer-motion";
import { getFastScrolling, useFastScrolling } from "@/lib/scrollActivity";
import { useQueuedScene } from "@/lib/useQueuedScene";

const about_data = [
  {
    title: "Soy Lautaro Souza",
    description: "Desarrollador Frontend con base en Backend, apasionado por construir experiencias web que se sienten tan bien como funcionan. Con más de 3 años creando proyectos reales y académicos, transformo ideas en interfaces claras, funcionales y fáciles de mantener.",
    description2: "Soy del sur del GBA, Lomas de Zamora. Disfruto del diseño, la música y resolver problemas complejos con soluciones simples. Creo que un buen producto no es solo el que funciona, sino el que le da gusto usar.",
    experience: "1+ año",
    projects: "+10 proyectos",
    quote: "Un buen código se adapta, no cede con el tiempo.",
  },
  {
    title: "Enfocado en diseño y arquitectura limpia",
    description: "Creo en el diseño centrado en el usuario y en la arquitectura limpia como bases de cualquier producto que dure. Cada componente que escribo es una decisión de diseño, no solo de código.",
    description2: "Tengo experiencia integrando frontends modernos con React y TypeScript junto a backends en ASP.NET y PHP, manejando bases de datos SQL Server y MySQL. Trabajo habitualmente con Git, participo en code reviews y migraciones de proyectos en curso.",
  },
  {
    title: "Con experiencia real en empresa",
    description: "En 2024 realicé una pasantía en Oracle Argentina, una empresa tecnológica de alcance global. Me expuse a metodologías de trabajo profesional, procesos corporativos y cultura de desarrollo empresarial.",
    description2: "Egresado como Técnico en Informática de la EET N.° 7 de Lomas de Zamora (2018–2025). Esa formación técnica me dio base sólida en redes, programación y sistemas antes de especializarme en desarrollo web.",
  },
  {
    title: "Motivado por seguir creciendo",
    description: "Interesado en buenas prácticas, trabajo colaborativo y aprendizaje continuo. Actualmente profundizando en Next.js, Docker, PyTorch, TensorFlow y AWS para ampliar mi stack hacia data e infra.",
    description2: "Hablo Español (nativo), Inglés B2 (intermedio avanzado) y Alemán A2. Certificado en JavaScript Algorithms & Data Structures por freeCodeCamp y en Habilidades de Empleo por el Municipio de Lomas de Zamora.",
  },
];

const TOTAL_SLIDES = about_data.length;

const PLANETS = [
  {
    size: 252,
    surface: "radial-gradient(circle at 34% 28%, #dbeafe 0%, #38bdf8 12%, #0284c7 34%, #075985 62%, #020617 100%)",
    glow: "rgba(56,189,248,0.2)",
    moons: [{ size: 24, x: 152, y: -78, color: "#d4d4d8" }],
    asteroidBelt: false,
    rings: 1,
  },
  {
    size: 310,
    surface: "radial-gradient(circle at 38% 30%, #ede9fe 0%, #818cf8 18%, #4338ca 48%, #1e1b4b 76%, #020617 100%)",
    glow: "rgba(129,140,248,0.22)",
    moons: [],
    asteroidBelt: false,
    rings: 3,
  },
  {
    size: 218,
    surface: "radial-gradient(circle at 32% 25%, #fed7aa 0%, #c2410c 24%, #7c2d12 58%, #1c0a05 100%)",
    glow: "rgba(234,88,12,0.18)",
    moons: [],
    asteroidBelt: true,
    rings: 0,
  },
  {
    size: 278,
    surface: "radial-gradient(circle at 38% 30%, #cffafe 0%, #0891b2 16%, #164e63 48%, #172554 75%, #020617 100%)",
    glow: "rgba(34,211,238,0.18)",
    moons: [
      { size: 18, x: 154, y: -68, color: "#a5f3fc" },
      { size: 30, x: -164, y: 76, color: "#94a3b8" },
    ],
    asteroidBelt: false,
    rings: 2,
  },
];

const ASTEROIDS = [0, 31, 66, 104, 139, 174, 211, 247, 284, 322];

const MiniPlanet = memo(function MiniPlanet({ index, compact = false }: { index: number; compact?: boolean }) {
  const planet = PLANETS[index % PLANETS.length];
  const scale = compact ? 0.4 : 1;
  const size = Math.round(planet.size * scale);

  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, contain: "layout style" }}
    >
      <div
        className="absolute -inset-[30%] rounded-full"
        style={{ background: `radial-gradient(circle, ${planet.glow} 0%, ${planet.glow} 28%, transparent 70%)` }}
      />
      <div className="absolute inset-[12%] rounded-full" style={{ background: planet.surface, boxShadow: `0 0 ${compact ? 28 : 55}px ${planet.glow}` }} />
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.24),transparent_45%)]" />

      {planet.rings >= 1 && (
        <div className="ambient-motion about-orbit-clockwise absolute h-[38%] w-[132%] rounded-[50%] border border-[#7dd3fc]/25" />
      )}
      {planet.rings >= 2 && (
        <div className="ambient-motion about-orbit-counterclockwise absolute h-[52%] w-[150%] rounded-[50%] border border-white/12" />
      )}
      {planet.rings >= 3 && <div className="absolute h-[68%] w-[122%] rotate-[68deg] rounded-[50%] border border-[#818cf8]/20" />}

      {planet.asteroidBelt && (
        <div className="ambient-motion about-asteroid-orbit absolute inset-0">
          {ASTEROIDS.map((angle, asteroidIndex) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 rounded-full bg-orange-200/55"
              style={{
                width: compact ? Math.max(1, (2 + (asteroidIndex % 3)) * scale) : 2 + (asteroidIndex % 3),
                height: compact ? Math.max(1, (2 + (asteroidIndex % 3)) * scale) : 2 + (asteroidIndex % 3),
                transform: `rotate(${angle}deg) translateX(${size * 0.68}px)`,
              }}
            />
          ))}
        </div>
      )}

      {planet.moons.map((moon, moonIndex) => (
        <span
          key={`${moon.x}-${moon.y}`}
          className={`ambient-motion absolute rounded-full shadow-[0_0_14px_rgba(255,255,255,0.25)] ${moonIndex % 2 === 0 ? "about-moon-float-up" : "about-moon-float-down"}`}
          style={{
            width: moon.size * scale,
            height: moon.size * scale,
            left: `calc(50% + ${moon.x * scale}px)`,
            top: `calc(50% + ${moon.y * scale}px)`,
            backgroundColor: moon.color,
            animationDuration: `${4 + moonIndex}s`,
          }}
        />
      ))}
    </div>
  );
});

interface AboutSlideProps {
  about: (typeof about_data)[0];
  i: number;
  performanceMode?: boolean;
  mobile?: boolean;
}

const AboutSlide = memo(function AboutSlide({ about, i, performanceMode = false, mobile = false }: AboutSlideProps) {
  const direction = i % 2 === 0 ? 1 : -1;
  const className = mobile
    ? "about-mobile-slide absolute inset-0 flex w-full items-center px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pr-12 pt-28 sm:pt-40"
    : "absolute inset-x-0 flex w-full items-center";
  const textClassName = mobile
    ? "mx-auto w-full max-w-xl"
    : `w-full max-w-3xl pl-11 pr-3 sm:px-8 xl:w-1/2 ${direction === 1 ? "xl:mr-auto xl:pr-16" : "xl:ml-auto xl:pl-16"}`;
  const content = (
    <>
      <h2
        className={mobile
          ? "mb-2 max-w-[78%] text-[clamp(1.22rem,3.8svh,1.75rem)] font-bold leading-[1.08] text-white"
          : "mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl"
        }
      >
        {about.title}
      </h2>
      {performanceMode ? (
        <div>
          <p className={mobile ? "mb-2 text-[clamp(0.72rem,1.8svh,0.875rem)] leading-[1.42] text-zinc-200/90" : "mb-4 text-base text-zinc-200/90 sm:mb-6 sm:text-lg"}>{about.description}</p>
          {about.description2 && <p className={mobile ? "mb-3 text-[clamp(0.72rem,1.8svh,0.875rem)] leading-[1.42] text-zinc-300/80" : "mb-6 text-base text-zinc-200/90 sm:mb-8 sm:text-lg"}>{about.description2}</p>}
        </div>
      ) : mobile ? (
        <div>
          <p className="mb-2 text-[clamp(0.72rem,1.8svh,0.875rem)] leading-[1.42] text-zinc-200/90">{about.description}</p>
          {about.description2 && <p className="mb-3 text-[clamp(0.72rem,1.8svh,0.875rem)] leading-[1.42] text-zinc-300/80">{about.description2}</p>}
        </div>
      ) : (
        <Balancer>
          <p className="text-base sm:text-lg text-zinc-200/90 mb-4 sm:mb-6">{about.description}</p>
          {about.description2 && (
            <p className="text-base sm:text-lg text-zinc-200/90 mb-6 sm:mb-8">{about.description2}</p>
          )}
        </Balancer>
      )}
      {i === 0 && <FirstSlideContent about={about} mobile={mobile} />}
    </>
  );

  if (performanceMode) {
    return <div className={className}><div className={textClassName}>{content}</div></div>;
  }

  return (
    <motion.div
      initial={mobile ? { opacity: 0, y: 24, scale: 0.985 } : { opacity: 0, x: direction * 14, y: 6 }}
      animate={mobile ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 1, x: 0, y: 0 }}
      exit={mobile ? { opacity: 0, y: -18, scale: 0.99 } : { opacity: 0, x: direction * -10, y: -4 }}
      transition={{ duration: mobile ? 0.52 : 0.68, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {mobile ? (
        <div className={textClassName}>{content}</div>
      ) : (
        <motion.div
          initial={{ filter: "blur(3px)" }}
          animate={{ filter: "blur(0px)" }}
          exit={{ filter: "blur(2px)" }}
          transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className={textClassName}
        >
          {content}
        </motion.div>
      )}
    </motion.div>
  );
});

const FirstSlideContent = memo(function FirstSlideContent({ about, mobile = false }: { about: (typeof about_data)[0]; mobile?: boolean }) {
  return (
    <>
      <div className={mobile ? "mb-2.5 grid grid-cols-2 gap-2" : "mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-6"}>
        <div className={mobile ? "flex items-center gap-2 rounded-xl border border-[#1D2A3A]/60 bg-[#071326]/55 p-2" : "flex items-center gap-2 sm:gap-3"}>
          <div className={mobile ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F2742]/70" : "flex h-10 w-10 items-center justify-center rounded-xl border border-[#1D2A3A]/70 bg-[#0F2742]/70 sm:h-12 sm:w-12"}>
            <Clock className={mobile ? "h-3.5 w-3.5 text-sky-100" : "h-5 w-5 text-zinc-200 sm:h-6 sm:w-6"} />
          </div>
          <div>
            <p className={mobile ? "text-[11px] font-semibold leading-tight text-white" : "text-sm font-semibold text-white sm:text-base"}>{about.experience}</p>
            <p className={mobile ? "text-[9px] leading-tight text-zinc-400" : "text-xs text-zinc-300 sm:text-sm"}>Experiencia práctica</p>
          </div>
        </div>
        <div className={mobile ? "flex items-center gap-2 rounded-xl border border-[#1D2A3A]/60 bg-[#071326]/55 p-2" : "flex items-center gap-2 sm:gap-3"}>
          <div className={mobile ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F2742]/70" : "flex h-10 w-10 items-center justify-center rounded-xl border border-[#1D2A3A]/70 bg-[#0F2742]/70 sm:h-12 sm:w-12"}>
            <Users className={mobile ? "h-3.5 w-3.5 text-indigo-100" : "h-5 w-5 text-zinc-200 sm:h-6 sm:w-6"} />
          </div>
          <div>
            <p className={mobile ? "text-[11px] font-semibold leading-tight text-white" : "text-sm font-semibold text-white sm:text-base"}>{about.projects}</p>
            <p className={mobile ? "text-[9px] leading-tight text-zinc-400" : "text-xs text-zinc-300 sm:text-sm"}>Personales y académicos</p>
          </div>
        </div>
      </div>
      <div className={mobile ? "rounded-xl border border-[#1D2A3A]/60 bg-gradient-to-r from-[#0F2742]/55 to-[#020617]/55 px-3 py-2" : "rounded-2xl border border-[#1D2A3A]/60 bg-gradient-to-r from-[#0F2742]/55 to-[#020617]/55 p-4 sm:p-6"}>
        <p className={mobile ? "text-center text-[10px] italic leading-snug text-zinc-300/90" : "text-center text-sm italic text-zinc-200/90 sm:text-lg"}>{about.quote}</p>
      </div>
    </>
  );
});

function useDesktopAboutLayout() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1280px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const updateLayout = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", updateLayout);
    return () => query.removeEventListener("change", updateLayout);
  }, []);

  return isDesktop;
}

export default function About({ performanceMode = false }: { performanceMode?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isDesktopLayout = useDesktopAboutLayout();
  const isAboutNearViewport = useInView(ref, { margin: "300px 0px" });
  const nearViewportRef = useRef(isAboutNearViewport);
  const fastScrolling = useFastScrolling();
  nearViewportRef.current = isAboutNearViewport;
  const {
    activeIndex: activeSlide,
    handleExitComplete,
    queueScene,
  } = useQueuedScene({
    animated: !performanceMode,
    isNearViewport: isAboutNearViewport,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineScale = useSpring(scrollYProgress.get(), { stiffness: 80, damping: 24, mass: 0.35 });
  const viewportUnit = isDesktopLayout ? "vh" : "svh";

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isFast = getFastScrolling();
    if (isFast || !nearViewportRef.current) {
      lineScale.jump(latest);
    } else {
      lineScale.set(latest);
    }

    const nextSlide = Math.min(
      Math.floor(latest * TOTAL_SLIDES),
      TOTAL_SLIDES - 1
    );
    queueScene(nextSlide, !nearViewportRef.current);
  });

  useEffect(() => {
    if (fastScrolling || !isAboutNearViewport) {
      lineScale.jump(scrollYProgress.get());
    }
  }, [fastScrolling, isAboutNearViewport, lineScale, scrollYProgress]);

  const goToSlide = (index: number) => {
    if (!ref.current) return;

    const sectionTop = ref.current.getBoundingClientRect().top + window.scrollY;
    const stageHeight = ref.current.querySelector<HTMLElement>("[data-scene-stage]")?.offsetHeight ?? window.innerHeight;
    const scrollableDistance = ref.current.offsetHeight - stageHeight;
    const target = sectionTop + (scrollableDistance * index) / (TOTAL_SLIDES - 1);

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Sobre Mí | Lautaro Souza - Portafolio</title>
        <meta name="description" content="Desarrollador Frontend con base en Backend, apasionado por crear experiencias web funcionales y mantenibles. Experiencia en Oracle Argentina, React, TypeScript, y Tailwind CSS." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/about" />
      </Helmet>
      <section
      ref={ref}
      id="about"
      style={{ height: `${TOTAL_SLIDES * 100}${viewportUnit}`, contain: "layout style" }}
      className="scroll-scene relative"
    >
      {about_data.map((about, index) => (
        <span
          key={`snap-${about.title}`}
          aria-hidden="true"
          className="about-snap-point pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `${index * 100}${viewportUnit}` }}
        />
      ))}
      <div data-scene-stage className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-0 xl:h-screen xl:overflow-visible xl:px-10">
        <ScrollReveal
          x={0}
          y={0}
          className="z-10 mb-10 w-full"
          scrollYProgress={scrollYProgress}
          range={[0, 0.15]}
        >
          <div className="absolute left-5 top-4 inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#0A192F]/70 px-3 py-1.5 text-xs text-zinc-200 sm:left-10 xl:left-auto xl:top-20 xl:px-4 xl:py-2 xl:text-sm">
            <Target className="w-4 h-4" />
            Sobre mí
          </div>
        </ScrollReveal>

        <span
          aria-live="polite"
          className="absolute right-12 top-5 font-mono text-[10px] tracking-[0.2em] text-white/35 xl:hidden"
        >
          {String(activeSlide + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>

        {/* Timeline line */}
        <div className="absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-5 top-20 w-px bg-[#1D2A3A]/80 sm:right-8 xl:bottom-10 xl:left-1/2 xl:right-auto xl:top-10 xl:w-0.5">
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-white to-[#818cf8] shadow-[0_0_14px_rgba(125,211,252,0.55)]"
          />
        </div>

        <div className="relative flex h-full w-full items-center justify-center xl:h-auto">
          {performanceMode ? (
            <AboutSlide
              key={activeSlide}
              about={about_data[activeSlide]}
              i={activeSlide}
              performanceMode
              mobile={!isDesktopLayout}
            />
          ) : (
            <AnimatePresence
              initial={false}
              presenceAffectsLayout={false}
              onExitComplete={handleExitComplete}
            >
              <AboutSlide
                key={activeSlide}
                about={about_data[activeSlide]}
                i={activeSlide}
                mobile={!isDesktopLayout}
              />
            </AnimatePresence>
          )}

          {!performanceMode && isAboutNearViewport && (
            <AnimatePresence initial={false} presenceAffectsLayout={false}>
              <motion.div
                key={`planet-${activeSlide}`}
                initial={fastScrolling ? false : isDesktopLayout
                  ? { opacity: 0, x: (activeSlide % 2 === 0 ? 1 : -1) * 14, y: 6 }
                  : { opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: isDesktopLayout ? (activeSlide % 2 === 0 ? -1 : 1) * 10 : 0,
                  y: isDesktopLayout ? -4 : -10,
                  scale: isDesktopLayout ? 1 : 0.96,
                  transition: { duration: isDesktopLayout ? 0.62 : 0.42, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={fastScrolling ? { duration: 0 } : { duration: isDesktopLayout ? 0.68 : 0.48, ease: [0.16, 1, 0.3, 1] }}
                className={isDesktopLayout
                  ? `performance-heavy absolute hidden w-1/2 items-center justify-center xl:flex ${activeSlide % 2 === 0 ? "right-0" : "left-0"}`
                  : "about-mobile-planet performance-heavy absolute right-11 top-[4.5rem] flex h-28 w-28 items-center justify-center sm:right-16 sm:top-20"
                }
              >
                <MiniPlanet index={activeSlide} compact={!isDesktopLayout} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <nav aria-label="Navegación de la sección Sobre mí" className="absolute bottom-[calc(5rem+env(safe-area-inset-bottom))] right-0 top-16 z-20 flex flex-col justify-around sm:right-3 xl:bottom-10 xl:left-1/2 xl:right-auto xl:top-24 xl:-translate-x-1/2 xl:justify-between">
          {about_data.map((about, index) => (
            <button
              key={about.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ver ${about.title}`}
              aria-current={index === activeSlide ? "step" : undefined}
              className="group flex h-11 w-11 items-center justify-center xl:h-6 xl:w-6"
            >
              <motion.span
                animate={{ scale: index === activeSlide ? 1 : 0.72 }}
                transition={{ duration: 0.3 }}
                className={`block rounded-full border-2 border-[#020617] transition-colors duration-300 ${index <= activeSlide ? "h-3.5 w-3.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.22)] xl:shadow-none" : "h-3 w-3 bg-[#1D2A3A] group-hover:bg-zinc-400"}`}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
    </>
  );
}
