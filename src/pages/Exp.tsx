import { Clock, Users } from "lucide-react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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

export default function Exp() {
  const ref = useRef<HTMLElement>(null);
  const [activeExperience, setActiveExperience] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rawLineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScale = useSpring(rawLineScale, { stiffness: 80, damping: 24, mass: 0.35 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(
      Math.floor(latest * TOTAL_EXPERIENCES),
      TOTAL_EXPERIENCES - 1
    );
    setActiveExperience((current) => current === next ? current : next);
  });

  const goToExperience = (index: number) => {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (distance * index) / (TOTAL_EXPERIENCES - 1),
      behavior: "smooth",
    });
  };

  const experience = experiences[activeExperience];

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
        style={{ height: `${TOTAL_EXPERIENCES * 100}vh`, contain: "layout style paint" }}
        className="scroll-scene relative"
      >
        {experiences.map((item, index) => (
          <span
            key={`snap-${item.title}`}
            aria-hidden="true"
            className="scene-snap-point pointer-events-none absolute left-0 h-px w-px"
            style={{ top: `${index * 100}vh` }}
          />
        ))}

        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 py-8 sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-[#0ea5e9]/10 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-96 w-96 rounded-full bg-[#4338ca]/10 blur-[130px]" />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.55fr)] lg:gap-20">
            <header className="relative lg:self-center">
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

            <div className="relative min-h-[21rem] border-l border-[#1D2A3A]/80 pl-7 sm:min-h-[25rem] sm:pl-14">
              <motion.div
                style={{ scaleY: lineScale, transformOrigin: "top" }}
                className="absolute bottom-0 left-[-1px] top-0 w-0.5 bg-gradient-to-b from-[#7dd3fc] via-white to-[#818cf8] shadow-[0_0_14px_rgba(125,211,252,0.55)]"
              />

              <nav aria-label="Navegación de trayectoria" className="absolute bottom-0 left-0 top-0 z-20 flex -translate-x-1/2 flex-col justify-between">
                {experiences.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => goToExperience(index)}
                    aria-label={`Ver ${item.title}`}
                    aria-current={index === activeExperience ? "step" : undefined}
                    className="group flex h-6 w-6 items-center justify-center"
                  >
                    <motion.span
                      animate={{ scale: index === activeExperience ? 1 : 0.72 }}
                      className={`block rounded-full border-2 border-[#020617] transition-colors duration-300 ${index <= activeExperience ? "h-3.5 w-3.5 bg-white" : "h-3 w-3 bg-[#1D2A3A] group-hover:bg-zinc-400"}`}
                    />
                  </button>
                ))}
              </nav>

              <div className="flex min-h-[21rem] items-center sm:min-h-[25rem]">
                <AnimatePresence initial={false}>
                  <motion.article
                    key={experience.title}
                    initial={{ opacity: 0, x: 16, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -12, filter: "blur(2px)" }}
                    transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-7 right-0 flex flex-col justify-center overflow-hidden rounded-2xl border border-[#1D2A3A]/70 bg-gradient-to-br from-[#071426]/90 via-[#020617]/88 to-black/80 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:left-14 sm:rounded-[2rem] sm:p-10"
                  >
                    <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent" />
                    <div className="absolute -right-10 -top-16 select-none font-mono text-[10rem] font-bold leading-none text-white/[0.025]">
                      {String(activeExperience + 1).padStart(2, "0")}
                    </div>
                    <div className="relative z-10">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#7dd3fc]/70">ETAPA {String(activeExperience + 1).padStart(2, "0")}</p>
                        <h3 className="max-w-2xl text-xl font-semibold leading-snug text-white sm:text-3xl">{experience.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#1D2A3A]/70 bg-[#0A192F]/80 px-4 py-1.5 text-xs text-zinc-200">{experience.period}</span>
                    </div>
                    <p className="mb-6 max-w-3xl text-sm leading-7 text-zinc-200/80 sm:text-base">{experience.desc}</p>
                    <div className="mb-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-sm text-zinc-400">
                      <Users className="h-4 w-4" />
                      <span>{experience.projects}</span>
                    </div>
                    <div className="hidden flex-wrap gap-2 sm:flex">
                      {experience.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-[#1D2A3A]/60 bg-[#0A192F]/70 px-3 py-1 text-xs text-zinc-200">{tech}</span>
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
