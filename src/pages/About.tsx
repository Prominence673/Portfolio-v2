import Balancer from "react-wrap-balancer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, Users, Target } from "lucide-react";
import { useRef, memo, useMemo, useState, useEffect } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

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

interface AboutSlideProps {
  about: (typeof about_data)[0];
  i: number;
  scrollYProgress: MotionValue<number>;
  enableAnimations: boolean;
}

const AboutSlide = memo(function AboutSlide({ about, i, scrollYProgress, enableAnimations }: AboutSlideProps) {
  const isLast = i === TOTAL_SLIDES - 1;
  const direction = i % 2 === 0 ? 1 : -1;

  const segmentSize = 1 / TOTAL_SLIDES;
  const start = i * segmentSize;
  const mid = start + segmentSize * 0.4;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1] : [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [30, 0] : [30, 0, -30]
  );

  // Solo renderizar con animación si está habilitada
  if (!enableAnimations) {
    return (
      <div className={`absolute w-full max-w-3xl px-4 sm:px-0 translate-x-0 ${direction === 1 ? "2xl:left-0 2xl:pr-10" : "2xl:right-0 2xl:pl-10"}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">{about.title}</h2>
        <Balancer>
          <p className="text-base sm:text-lg text-zinc-200/90 mb-4 sm:mb-6">{about.description}</p>
          {about.description2 && (
            <p className="text-base sm:text-lg text-zinc-200/90 mb-6 sm:mb-8">{about.description2}</p>
          )}
        </Balancer>
        {i === 0 && <FirstSlideContent about={about} />}
      </div>
    );
  }

  return (
    <motion.div style={{ opacity, y }} className={`absolute w-full max-w-3xl px-4 sm:px-0 translate-x-0 ${direction === 1 ? "2xl:left-0 2xl:pr-10" : "2xl:right-0 2xl:pl-10"}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">{about.title}</h2>
      <Balancer>
        <p className="text-base sm:text-lg text-zinc-200/90 mb-4 sm:mb-6">{about.description}</p>
        {about.description2 && (
          <p className="text-base sm:text-lg text-zinc-200/90 mb-6 sm:mb-8">{about.description2}</p>
        )}
      </Balancer>
      {i === 0 && <FirstSlideContent about={about} />}
    </motion.div>
  );
});

const FirstSlideContent = memo(function FirstSlideContent({ about }: { about: (typeof about_data)[0] }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
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
        <p className="text-zinc-200/90 italic text-base sm:text-lg text-center">{about.quote}</p>
      </div>
    </>
  );
});

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [enableAnimations, setEnableAnimations] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Lazy load animaciones después de 1s
  useEffect(() => {
    const timer = setTimeout(() => setEnableAnimations(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionHeight = useMemo(() => `calc(100vh + ${(TOTAL_SLIDES - 1) * 80}vh)`, []);

  return (
    <section
      ref={ref}
      id="about"
      style={{ height: sectionHeight, contain: "layout style" }}
    >
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

        {/* Timeline line - solo animada si las animaciones están habilitadas */}
        <div className="left-0 2xl:left-1/2 absolute top-10 bottom-10 w-0.5 bg-[#1D2A3A]/80">
          {enableAnimations ? (
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-white"
            />
          ) : null}
        </div>

        <div className="relative w-full flex items-center justify-center">
          {about_data.map((about, i) => (
            <AboutSlide
              key={i}
              about={about}
              i={i}
              scrollYProgress={scrollYProgress}
              enableAnimations={enableAnimations}
            />
          ))}
        </div>
      </div>
    </section>
  );
}