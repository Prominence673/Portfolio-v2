import { Clock, Users } from "lucide-react";
import { useRef, memo, useState, useEffect } from "react";
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
const TOTAL_EXPERIENCES = experiences.length;

// Contenido compartido de la tarjeta
const ExperienceCardContent = memo(function ExperienceCardContent({ exp }: { exp: (typeof experiences)[0] }) {
  return (
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
  );
});

// Tarjeta estática (sin animaciones)
const StaticExperienceCard = memo(function StaticExperienceCard({
  exp,
  topPercent,
}: {
  exp: (typeof experiences)[0];
  topPercent: number;
}) {
  return (
    <div style={{ top: `${topPercent}%` }} className="absolute w-full flex items-start gap-6">
      <div className="absolute left-[27px] top-6 w-3 h-3 bg-white rounded-full border-2 border-[#020617] z-10" />
      <ExperienceCardContent exp={exp} />
    </div>
  );
});

// Tarjeta animada (con Framer Motion)
const AnimatedExperienceCard = memo(function AnimatedExperienceCard({
  exp,
  i,
  scrollYProgress,
  topPercent,
}: {
  exp: (typeof experiences)[0];
  i: number;
  scrollYProgress: MotionValue<number>;
  topPercent: number;
}) {
  const isLast = i === TOTAL_EXPERIENCES - 1;
  const segmentSize = 1 / TOTAL_EXPERIENCES;
  const start = i * segmentSize;
  const mid = start + segmentSize * 0.35;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1] : [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [20, 0] : [20, 0, -20]
  );

  const dotScale = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1] : [0, 1, 0]
  );

  return (
    <motion.div style={{ opacity, y, top: `${topPercent}%` }} className="absolute w-full flex items-start gap-6">
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-[27px] top-6 w-3 h-3 bg-white rounded-full border-2 border-[#020617] z-10"
      />
      <ExperienceCardContent exp={exp} />
    </motion.div>
  );
});

// Header content compartido
const HeaderContent = memo(function HeaderContent() {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
        <Clock className="w-4 h-4" />
        Trayectoria
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
        Trayectoria Profesional
      </h2>
      <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
        Desarrollador Frontend con base en Backend, egresado como Técnico en Informática y con
        experiencia en Oracle Argentina.
      </p>
    </>
  );
});

// Header animado
const AnimatedHeader = memo(function AnimatedHeader({
  headerOpacity,
  headerY,
}: {
  headerOpacity: MotionValue<number>;
  headerY: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity: headerOpacity, y: headerY }}
      className="text-center mt-5 mb-8 sm:mb-16 w-full max-w-3xl mx-auto"
    >
      <HeaderContent />
    </motion.div>
  );
});

// Header estático
const StaticHeader = memo(function StaticHeader() {
  return (
    <div className="text-center mt-5 mb-8 sm:mb-16 w-full max-w-3xl mx-auto">
      <HeaderContent />
    </div>
  );
});

// Contenedor de tarjetas
const CardsContainer = memo(function CardsContainer({
  enableAnimations,
  scrollYProgress,
}: {
  enableAnimations: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <>
      {experiences.map((exp, i) => {
        const topPercent = (i % VISIBLE_SLOTS) * CARD_HEIGHT;

        if (!enableAnimations) {
          return <StaticExperienceCard key={i} exp={exp} topPercent={topPercent} />;
        }

        return (
          <AnimatedExperienceCard
            key={i}
            exp={exp}
            i={i}
            scrollYProgress={scrollYProgress}
            topPercent={topPercent}
          />
        );
      })}
    </>
  );
});

export default function Exp() {
  const ref = useRef<HTMLElement>(null);
  const [enableAnimations, setEnableAnimations] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const timer = setTimeout(() => setEnableAnimations(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Always create the motion values to keep hook order stable.
  const lineScaleMV = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const headerOpacityMV = useTransform(scrollYProgress, [0.1, 1], [0, 1]);
  const headerYMV = useTransform(scrollYProgress, [0, 0.12], [0, -24]);

  const sectionHeight = `calc(100vh + ${TOTAL_EXPERIENCES * 70}vh)`;
  const containerHeight = `${VISIBLE_SLOTS * CARD_HEIGHT}vh`;

  return (
    <section
      ref={ref}
      id="experience"
      style={{ height: sectionHeight, contain: "layout style paint" }}
      className="relative"
    >
      <div className="sticky top-0 py-5 md:pb-0 h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-10 overflow-hidden">
        {/* Renderizar header animado o estático */}
        {enableAnimations ? (
          <AnimatedHeader headerOpacity={headerOpacityMV} headerY={headerYMV} />
        ) : (
          <StaticHeader />
        )}

        {/* Timeline con línea animada */}
        <div className="relative mb-10 w-full max-w-3xl md:max-w-5xl" style={{ height: containerHeight }}>
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#1D2A3A]/80">
            {enableAnimations ? (
              <motion.div
                style={{ scaleY: lineScaleMV, transformOrigin: "top" }}
                className="absolute inset-0 bg-white"
              />
            ) : null}
          </div>

          {/* Contenedor de tarjetas - dinámico basado en animaciones */}
          <CardsContainer enableAnimations={enableAnimations} scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}