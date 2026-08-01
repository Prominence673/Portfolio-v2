import { Clock, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { getFastScrolling, useFastScrolling } from "@/lib/scrollActivity";
import { useQueuedScene } from "@/lib/useQueuedScene";

const experiences = [
  {
    title: "Técnico en Informática — EET N.° 7",
    period: "2018 — 2025",
    desc: "Formación técnica completa en la Escuela de Educación Técnica N.° 7 de Lomas de Zamora. Base sólida en programación, redes, sistemas operativos y bases de datos.",
    projects: "Lomas de Zamora, Buenos Aires",
    tech: ["Programación", "Redes", "Sistemas Operativos", "Bases de datos"],
  },
  {
    title: "Pasantía — Oracle Argentina",
    period: "2024",
    desc: "Participación en entorno corporativo real dentro de una empresa tecnológica de alcance global. Exposición a metodologías de trabajo profesional, procesos internos, cultura de desarrollo y dinámicas de equipo a nivel enterprise.",
    projects: "Empresa global de tecnología",
    tech: ["Entorno corporativo", "Metodologías Profesionales", "Trabajo en equipo"],
  },
  {
    title: "Certificación — freeCodeCamp",
    period: "2024",
    desc: "JavaScript Algorithms and Data Structures. Resolución de algoritmos, estructuras de datos, programación funcional y orientada a objetos en JavaScript.",
    projects: "freecodecamp.org",
    tech: ["JavaScript", "Algoritmos", "Estructuras de datos"],
  },
  {
    title: "Desarrollo Web — Proyectos Personales y Académicos",
    period: "2022 — Actualidad",
    desc: "Desarrollo de aplicaciones web con React y TypeScript aplicando arquitectura basada en componentes. Interfaces responsivas, integración con backends en ASP.NET y PHP, manejo de datos y trabajo colaborativo con Git.",
    projects: "10+ repositorios en GitHub",
    tech: ["React", "TypeScript", "ASP.NET", "PHP", "SQL Server", "MySQL", "Git"],
  },
];

const TOTAL_EXPERIENCES = experiences.length;

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

export default function Exp({ performanceMode = false }: { performanceMode?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const isNearViewport = useInView(ref, { margin: "75% 0px" });
  const nearViewportRef = useRef(isNearViewport);
  const fastScrolling = useFastScrolling();
  nearViewportRef.current = isNearViewport;
  const {
    activeIndex: activeExperience,
    handleExitComplete,
    queueScene,
  } = useQueuedScene({
    animated: !performanceMode,
    isNearViewport,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineScale = useSpring(scrollYProgress.get(), { stiffness: 80, damping: 24, mass: 0.35 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isFast = getFastScrolling();
    if (isFast || !nearViewportRef.current) {
      lineScale.jump(latest);
    } else {
      lineScale.set(latest);
    }

    const next = Math.min(
      Math.floor(latest * TOTAL_EXPERIENCES),
      TOTAL_EXPERIENCES - 1
    );
    queueScene(next, !nearViewportRef.current);
  });

  useEffect(() => {
    if (fastScrolling || !isNearViewport) {
      lineScale.jump(scrollYProgress.get());
    }
  }, [fastScrolling, isNearViewport, lineScale, scrollYProgress]);

  const goToExperience = (index: number) => {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const stageHeight = ref.current.querySelector<HTMLElement>("[data-scene-stage]")?.offsetHeight ?? window.innerHeight;
    const distance = ref.current.offsetHeight - stageHeight;
    window.scrollTo({
      top: top + (distance * index) / (TOTAL_EXPERIENCES - 1),
      behavior: "smooth",
    });
  };

  const experience = experiences[activeExperience];
  const viewportUnit = isDesktop ? "vh" : "svh";

  return (
    <>
      <Helmet>
        <title>Experiencia | Lautaro Souza - Prominence673</title>
        <meta name="description" content="Trayectoria profesional de Lautaro Souza: pasantía en Oracle, proyectos personales con React y TypeScript, y formación técnica en EET N.° 7." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/experience" />
      </Helmet>

      <section
        ref={ref}
        id="experience"
        style={{ height: `${TOTAL_EXPERIENCES * 100}${viewportUnit}`, contain: "layout style paint" }}
        className="scroll-scene relative"
      >
        {experiences.map((item, index) => (
          <span
            key={`snap-${item.title}`}
            aria-hidden="true"
            className="scene-snap-point pointer-events-none absolute left-0 h-px w-px"
            style={{ top: `${index * 100}${viewportUnit}` }}
          />
        ))}

        <div data-scene-stage className="sticky top-0 flex h-[100svh] items-stretch overflow-hidden px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pt-8 md:pb-10 md:pt-20 lg:h-screen lg:items-center lg:px-10 lg:py-16">
          <div className="pointer-events-none absolute -left-24 top-[12%] h-52 w-52 rounded-full bg-[#0ea5e9]/10 blur-[55px] lg:left-[12%] lg:top-[18%] lg:h-72 lg:w-72 lg:blur-[110px]" />
          <div className="pointer-events-none absolute -right-28 bottom-[3%] h-64 w-64 rounded-full bg-[#4338ca]/10 blur-[65px] lg:bottom-[8%] lg:right-[8%] lg:h-96 lg:w-96 lg:blur-[130px]" />

          <div className="relative mx-auto flex h-full w-full max-w-xl flex-col gap-4 lg:grid lg:h-auto lg:max-w-7xl lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.55fr)] lg:items-center lg:gap-20">
            <header className="relative shrink-0 lg:hidden">
              <div className="mb-4 flex items-center gap-3 pr-14 font-mono text-[0.62rem] tracking-[0.24em] text-[#7dd3fc]/65 md:pr-0">
                <span>04 — TRAYECTORIA</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#7dd3fc]/40 to-transparent" />
                <span>{String(activeExperience + 1).padStart(2, "0")}/{String(TOTAL_EXPERIENCES).padStart(2, "0")}</span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/65 bg-[#071426]/75 px-3 py-1.5 text-[0.68rem] text-zinc-200">
                    <Clock className="h-3.5 w-3.5 text-[#7dd3fc]" />
                    Recorrido profesional
                  </div>
                  <h2 className="max-w-xs text-[2rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl">
                    Trayectoria en movimiento.
                  </h2>
                </div>
              </div>
            </header>

            <header className="relative hidden lg:block lg:self-center">
              <span className="mb-8 block font-mono text-xs tracking-[0.3em] text-[#7dd3fc]/70">
                04 — EXPERIENCIA
              </span>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/60 bg-[#020617]/70 px-4 py-2 text-sm text-zinc-200">
                <Clock className="h-4 w-4" />
                Trayectoria
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-5xl">
                Trayectoria Profesional
              </h2>
              <p className="hidden max-w-sm text-sm leading-7 text-zinc-300/75 sm:block sm:text-base">
                Formación, experiencia y proyectos que construyeron mi perfil profesional.
              </p>
              <div className="mt-4 hidden items-center gap-3 text-xs text-white/35 sm:flex lg:mt-8">
                <span className="h-px w-10 bg-[#7dd3fc]/50" />
                Scroll para recorrer
              </div>
            </header>

            <div className="relative min-h-0 flex-1 pl-9 lg:min-h-[25rem] lg:border-l lg:border-[#1D2A3A]/80 lg:pl-14">
              <div className="absolute bottom-0 left-[0.7rem] top-0 w-px bg-[#1D2A3A]/80 lg:hidden" />
              <motion.div
                style={{ scaleY: lineScale, transformOrigin: "top" }}
                className="absolute bottom-0 left-[0.65rem] top-0 w-0.5 bg-gradient-to-b from-[#7dd3fc] via-white to-[#818cf8] shadow-[0_0_14px_rgba(125,211,252,0.55)] lg:left-[-1px]"
              />

              <nav aria-label="Navegación de trayectoria" className="absolute bottom-0 left-[0.7rem] top-0 z-20 flex -translate-x-1/2 flex-col justify-between lg:left-0">
                {experiences.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => goToExperience(index)}
                    aria-label={`Ver ${item.title}`}
                    aria-current={index === activeExperience ? "step" : undefined}
                    className="group flex h-11 w-11 items-center justify-center lg:h-6 lg:w-6"
                  >
                    <motion.span
                      animate={{ scale: index === activeExperience ? 1 : 0.72 }}
                      className={`block rounded-full border-2 border-[#020617] transition-colors duration-300 ${index <= activeExperience ? "h-3.5 w-3.5 bg-white" : "h-3 w-3 bg-[#1D2A3A] group-hover:bg-zinc-400"}`}
                    />
                  </button>
                ))}
              </nav>

              <div className="flex h-full min-h-0 items-center lg:min-h-[25rem]">
                <AnimatePresence
                  initial={false}
                  presenceAffectsLayout={false}
                  onExitComplete={handleExitComplete}
                >
                  <motion.article
                    data-lenis-prevent
                    key={experience.title}
                    initial={
                      performanceMode
                        ? false
                        : isDesktop
                          ? { opacity: 0, x: 16, filter: "blur(3px)" }
                          : { opacity: 0, y: 24 }
                    }
                    animate={
                      performanceMode
                        ? { opacity: 1 }
                        : isDesktop
                          ? { opacity: 1, x: 0, filter: "blur(0px)" }
                          : { opacity: 1, y: 0 }
                    }
                    exit={
                      performanceMode
                        ? undefined
                        : isDesktop
                          ? { opacity: 0, x: -12, filter: "blur(2px)" }
                          : { opacity: 0, y: -18 }
                    }
                    transition={
                      performanceMode
                        ? { duration: 0 }
                        : {
                            duration: isDesktop ? 0.68 : 0.52,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    className="absolute inset-y-0 left-9 right-0 flex flex-col overflow-y-auto rounded-[1.4rem] border border-[#1D2A3A]/70 bg-gradient-to-br from-[#071426]/95 via-[#020617]/94 to-black/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-6 lg:left-14 lg:justify-center lg:overflow-hidden lg:rounded-[2rem] lg:bg-gradient-to-br lg:from-[#071426]/90 lg:via-[#020617]/88 lg:to-black/80 lg:p-10 lg:shadow-[0_30px_90px_rgba(0,0,0,0.35)] lg:backdrop-blur-xl"
                  >
                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent lg:inset-x-10" />
                    <div className="absolute -right-2 -top-4 select-none font-mono text-7xl font-bold leading-none text-white/[0.025] lg:-right-10 lg:-top-16 lg:text-[10rem]">
                      {String(activeExperience + 1).padStart(2, "0")}
                    </div>
                    <div className="relative z-10 my-auto w-full lg:my-0">
                      <div className="mb-4 flex flex-col gap-2.5 lg:mb-5 lg:flex-row lg:items-start lg:justify-between lg:gap-3">
                        <div>
                          <p className="mb-2 font-mono text-[0.65rem] tracking-[0.2em] text-[#7dd3fc]/70 lg:mb-3 lg:text-xs">ETAPA {String(activeExperience + 1).padStart(2, "0")}</p>
                          <h3 className="max-w-2xl text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-3xl">{experience.title}</h3>
                        </div>
                        <span className="w-fit shrink-0 rounded-full border border-[#1D2A3A]/70 bg-[#0A192F]/80 px-3 py-1 text-[0.65rem] text-zinc-200 lg:px-4 lg:py-1.5 lg:text-xs">{experience.period}</span>
                      </div>
                      <p className="mb-4 max-w-3xl text-[0.78rem] leading-[1.65] text-zinc-200/80 sm:text-sm lg:mb-6 lg:text-base lg:leading-7">{experience.desc}</p>
                      <div className="mb-4 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-400 lg:mb-6 lg:pt-5 lg:text-sm">
                        <Users className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />
                        <span>{experience.projects}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {experience.tech.map((tech) => (
                          <span key={tech} className="rounded-full border border-[#1D2A3A]/60 bg-[#0A192F]/70 px-2.5 py-1 text-[0.62rem] text-zinc-200 lg:px-3 lg:text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
