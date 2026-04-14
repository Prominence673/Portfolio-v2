import { Clock, Users } from "lucide-react";
import { useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

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
    desc: "Desarrollo de aplicaciones web con React y TypeScript aplicando arquitectura basada en componentes. Implementación de interfaces responsivas con foco en UX. Integración de frontend con backends en ASP.NET y PHP. CRUD, formularios, validaciones, manejo de datos y trabajo colaborativo con Git.",
    projects: "10+ repositorios en GitHub",
    tech: ["React", "TypeScript", "ASP.NET", "PHP", "SQL Server", "MySQL", "Git"],
  },
];


const VISIBLE_SLOTS = 2;
const CARD_HEIGHT = 50; 

function ExperienceCard({
  exp,
  i,
  total,
  scrollYProgress,
}: {
  exp: (typeof experiences)[0];
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / total;
  const isLast = i === total - 1;

  const start = i * segmentSize;
  const mid   = start + segmentSize * 0.35;
  const end   = start + segmentSize;

  const slot = i % VISIBLE_SLOTS;
  const topPercent = slot * CARD_HEIGHT;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1]       : [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [20, 0]      : [20, 0, -20]
  );

  const dotScale = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1]       : [0, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity, y, top: `${topPercent}%` }}
      className="absolute w-full flex items-start gap-6"
    >
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-[27px] top-6 w-3 h-3 bg-white rounded-full border-2 border-[#020617] z-10"
      />

      <div className="ml-12 sm:ml-16 flex-1">
        <div className="bg-[#020617]/70 backdrop-blur-md border border-[#1D2A3A]/60 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-[#1D2A3A]">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h4 className="text-lg sm:text-xl font-semibold text-white">{exp.title}</h4>
            <span className="text-sm text-zinc-200 bg-[#0A192F]/70 px-3 py-1 rounded-full mt-2 sm:mt-0 border border-[#1D2A3A]/60">
              {exp.period}
            </span>
          </div>

          <p className="text-zinc-200/90 mb-4 leading-relaxed">{exp.desc}</p>

          <div className="flex items-center gap-2 text-sm text-zinc-300 mb-4">
            <Users className="w-4 h-4" />
            <span>{exp.projects}</span>
          </div>

          <div className="hidden sm:flex flex-wrap gap-2">
            {exp.tech.map((techItem, j) => (
              <span
                key={j}
                className="px-3 py-1 bg-[#0A192F]/70 text-zinc-100 rounded-full text-sm border border-[#1D2A3A]/60"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Exp() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineScale     = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.12], [0, -24]);

  return (
    <section
      ref={ref}
      id="experience"
      style={{ height: `calc(100vh + ${experiences.length * 70}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 py-5 md:pb-0 h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-10 overflow-hidden">

        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mt-5 mb-8 sm:mb-16 w-full max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
            <Clock className="w-4 h-4" />
            Trayectoria
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">Trayectoria Profesional</h2>
          <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
            Desarrollador Frontend con base en Backend, egresado como Técnico en Informática y con experiencia en Oracle Argentina.
          </p>
        </motion.div>
        <div
          className="relative mb-10 w-full max-w-3xl md:max-w-5xl"
          style={{ height: `${VISIBLE_SLOTS * CARD_HEIGHT}vh` }}
        >
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#1D2A3A]/80">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-white"
            />
          </div>

          {experiences.map((exp, i) => (
            <ExperienceCard
              key={i}
              exp={exp}
              i={i}
              total={experiences.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}