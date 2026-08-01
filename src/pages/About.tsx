import Balancer from "react-wrap-balancer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, Users, Target } from "lucide-react";
import { useEffect, useRef, memo, useMemo } from "react";
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

const MiniPlanet = memo(function MiniPlanet({ index }: { index: number }) {
  const planet = PLANETS[index % PLANETS.length];

  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center"
      style={{ width: planet.size, height: planet.size, contain: "layout style" }}
    >
      <div
        className="absolute -inset-[30%] rounded-full"
        style={{ background: `radial-gradient(circle, ${planet.glow} 0%, ${planet.glow} 28%, transparent 70%)` }}
      />
      <div className="absolute inset-[12%] rounded-full" style={{ background: planet.surface, boxShadow: `0 0 55px ${planet.glow}` }} />
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
                width: 2 + (asteroidIndex % 3),
                height: 2 + (asteroidIndex % 3),
                transform: `rotate(${angle}deg) translateX(${planet.size * 0.68}px)`,
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
            width: moon.size,
            height: moon.size,
            left: `calc(50% + ${moon.x}px)`,
            top: `calc(50% + ${moon.y}px)`,
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
}

const AboutSlide = memo(function AboutSlide({ about, i, performanceMode = false }: AboutSlideProps) {
  const direction = i % 2 === 0 ? 1 : -1;
  const className = "absolute inset-x-0 flex w-full items-center";
  const textClassName = `w-full max-w-3xl pl-11 pr-3 sm:px-8 xl:w-1/2 ${direction === 1 ? "xl:mr-auto xl:pr-16" : "xl:ml-auto xl:pl-16"}`;
  const content = (
    <>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">{about.title}</h2>
      {performanceMode ? (
        <div>
          <p className="text-base sm:text-lg text-zinc-200/90 mb-4 sm:mb-6">{about.description}</p>
          {about.description2 && <p className="text-base sm:text-lg text-zinc-200/90 mb-6 sm:mb-8">{about.description2}</p>}
        </div>
      ) : (
        <Balancer>
          <p className="text-base sm:text-lg text-zinc-200/90 mb-4 sm:mb-6">{about.description}</p>
          {about.description2 && (
            <p className="text-base sm:text-lg text-zinc-200/90 mb-6 sm:mb-8">{about.description2}</p>
          )}
        </Balancer>
      )}
      {i === 0 && <FirstSlideContent about={about} />}
    </>
  );

  if (performanceMode) {
    return <div className={className}><div className={textClassName}>{content}</div></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 14, y: 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: direction * -10, y: -4 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        initial={{ filter: "blur(3px)" }}
        animate={{ filter: "blur(0px)" }}
        exit={{ filter: "blur(2px)" }}
        transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
        className={textClassName}
      >
        {content}
      </motion.div>
    </motion.div>
  );
});

const FirstSlideContent = memo(function FirstSlideContent({ about }: { about: (typeof about_data)[0] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 mb-5 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0F2742]/70 rounded-xl flex items-center justify-center border border-[#1D2A3A]/70">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-200" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">{about.experience}</p>
            <p className="text-xs sm:text-sm text-zinc-300">Experiencia práctica</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0F2742]/70 rounded-xl flex items-center justify-center border border-[#1D2A3A]/70">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-200" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">{about.projects}</p>
            <p className="text-xs sm:text-sm text-zinc-300">Personales y académicos</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#0F2742]/55 to-[#020617]/55 border border-[#1D2A3A]/60 rounded-2xl p-4 sm:p-6">
        <p className="text-zinc-200/90 italic text-sm sm:text-lg text-center">{about.quote}</p>
      </div>
    </>
  );
});

export default function About({ performanceMode = false }: { performanceMode?: boolean }) {
  const ref = useRef<HTMLElement>(null);
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
  const sectionHeight = useMemo(() => `${TOTAL_SLIDES * 100}vh`, []);

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
    const scrollableDistance = ref.current.offsetHeight - window.innerHeight;
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
      style={{ height: sectionHeight, contain: "layout style" }}
      className="scroll-scene relative"
    >
      {about_data.map((about, index) => (
        <span
          key={`snap-${about.title}`}
          aria-hidden="true"
          className="about-snap-point pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `${index * 100}vh` }}
        />
      ))}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-5 sm:px-10">
        <ScrollReveal
          x={0}
          y={0}
          className="w-full z-10 mb-10"
          scrollYProgress={scrollYProgress}
          range={[0, 0.15]}
        >
          <div className="absolute top-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A192F]/70 border border-[#1D2A3A]/70 text-zinc-200 text-sm">
            <Target className="w-4 h-4" />
            Sobre mí
          </div>
        </ScrollReveal>

        {/* Timeline line */}
        <div className="left-5 sm:left-10 xl:left-1/2 absolute top-10 bottom-10 w-0.5 bg-[#1D2A3A]/80">
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-white to-[#818cf8] shadow-[0_0_14px_rgba(125,211,252,0.55)]"
          />
        </div>

        <div className="relative w-full flex items-center justify-center">
          {performanceMode ? (
            <AboutSlide
              key={activeSlide}
              about={about_data[activeSlide]}
              i={activeSlide}
              performanceMode
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
              />
            </AnimatePresence>
          )}

          {!performanceMode && isAboutNearViewport && (
            <AnimatePresence initial={false} presenceAffectsLayout={false}>
              <motion.div
                key={`planet-${activeSlide}`}
                initial={fastScrolling ? false : { opacity: 0, x: (activeSlide % 2 === 0 ? 1 : -1) * 14, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  x: (activeSlide % 2 === 0 ? -1 : 1) * 10,
                  y: -4,
                  transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={fastScrolling ? { duration: 0 } : { duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className={`performance-heavy absolute hidden w-1/2 items-center justify-center xl:flex ${activeSlide % 2 === 0 ? "right-0" : "left-0"}`}
              >
                <MiniPlanet index={activeSlide} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <nav aria-label="Navegación de la sección Sobre mí" className="absolute bottom-10 left-5 top-24 z-20 flex -translate-x-1/2 flex-col justify-between sm:left-10 xl:left-1/2">
          {about_data.map((about, index) => (
            <button
              key={about.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ver ${about.title}`}
              aria-current={index === activeSlide ? "step" : undefined}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <motion.span
                animate={{ scale: index === activeSlide ? 1 : 0.72 }}
                transition={{ duration: 0.3 }}
                className={`block rounded-full border-2 border-[#020617] transition-colors duration-300 ${index <= activeSlide ? "h-3.5 w-3.5 bg-white" : "h-3 w-3 bg-[#1D2A3A] group-hover:bg-zinc-400"}`}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
    </>
  );
}
