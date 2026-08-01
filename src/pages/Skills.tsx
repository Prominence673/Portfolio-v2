import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, useScroll } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Code, Database, Palette, Server, BookMarked } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => setIsDesktop(media.matches);
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  return isDesktop;
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"]
  });
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "JavaScript ES6+",
      ],
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend",
      skills: ["ASP.NET", "Node.js", "Next.js", "C#", "PHP", "Python"],
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Bases de Datos",
      skills: ["SQL Server", "MySQL"],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design & Tools",
      skills: ["Figma", "Git", "Canva", "Photoshop", "Photopea", "N8N"],
    },
    {
      icon: <BookMarked className="w-8 h-8" />,
      title: "Learning",
      skills: ["Docker", "AWS", "Pytorch", "TensorFlow", "PostgreSQL"],
    },
  ];
  return (
    <>
      <Helmet>
        <title>Stack Tecnológico | Lautaro Souza - Portafolio</title>
        <meta name="description" content="Explora mi stack tecnológico: React, TypeScript, Node.js, ASP.NET, SQL Server, y más. Experiencia en desarrollo frontend, backend, bases de datos y herramientas de diseño. Proyectos personales y académicos con más de 3 años de experiencia." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/skills" />
      </Helmet>
      {/* HABILIDADES */}
      <section
        ref={ref}
        id="skills"
        className="mobile-safe-section scroll-scene relative flex min-h-[100svh] flex-col items-stretch justify-start overflow-hidden px-4 py-16 sm:px-8 lg:h-screen lg:items-center lg:justify-center lg:px-10 lg:py-8"
      >
        {!isDesktop ? (
        <div className="relative z-10 mx-auto w-full max-w-xl">
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mb-9"
          >
            <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[0.65rem] tracking-[0.24em] text-[#7dd3fc]/70">
              <span>03 — STACK</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#7dd3fc]/45 to-transparent" />
              <span>FULL STACK</span>
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#071426]/80 px-3 py-1.5 text-xs text-zinc-200">
              <Code className="h-3.5 w-3.5 text-[#7dd3fc]" />
              Tecnologías y herramientas
            </div>
            <h2 className="max-w-sm text-[2.4rem] font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl">
              Stack que convierte ideas en producto.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-300/75 sm:text-base">
              Del diseño al deployment, cada capa suma una herramienta precisa.
            </p>
          </motion.header>

          <div className="relative pl-9">
            <div className="absolute bottom-5 left-[0.7rem] top-5 w-px bg-gradient-to-b from-[#7dd3fc]/70 via-[#334155]/70 to-[#818cf8]/50" />
            <div className="space-y-3">
              {skillCategories.map((category, index) => (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.32 }}
                  transition={{
                    duration: 0.58,
                    delay: index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl border border-[#1D2A3A]/75 bg-gradient-to-br from-[#09182a]/92 via-[#061120]/90 to-[#020617]/92 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
                >
                  <span className="absolute left-[-2.1rem] top-7 flex h-5 w-5 items-center justify-center rounded-full border border-[#7dd3fc]/45 bg-[#020617] shadow-[0_0_16px_rgba(125,211,252,0.18)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
                  </span>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1D2A3A]/80 bg-[#0F2742]/55 text-[#bae6fd] [&_svg]:h-5 [&_svg]:w-5">
                      {category.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.6rem] tracking-[0.2em] text-white/35">
                        CAPA {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="truncate text-base font-semibold text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#7dd3fc]/55">
                      {String(category.skills.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-[0.68rem] leading-4 text-zinc-300/85"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 overflow-hidden rounded-2xl border border-[#1D2A3A]/70 bg-[#071426]/70"
          >
            {[
              ["10+", "Proyectos académicos y personales"],
              ["3+", "Años de experiencia"],
              ["10+", "Tecnologías"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`flex items-center gap-5 px-5 py-4 ${index > 0 ? "border-t border-white/[0.06]" : ""}`}
              >
                <span className="w-14 shrink-0 font-mono text-2xl font-bold text-white">
                  {value}
                </span>
                <span className="text-xs leading-5 text-zinc-300/70">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        ) : (
        <div className="contents">
          <ScrollReveal y={48} className="text-center mb-8 lg:mb-7 w-full max-w-4xl mx-auto" scrollYProgress={scrollYProgress} range={[0, 0.3]}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A192F]/70 border border-[#1D2A3A]/70 text-zinc-200 text-sm mb-4">
              <Code className="w-4 h-4" />
              Tecnologías y Herramientas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold mb-3 text-white">
              Stack Tecnológico
            </h2>
            <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
              Domino un stack moderno y diverso que me permite abordar proyectos
              desde el diseño hasta el deployment.
            </p>
          </ScrollReveal>

          <ScrollReveal y={64} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 w-full max-w-7xl mb-8 lg:mb-7" scrollYProgress={scrollYProgress} range={[0.2, 0.7]}>
            {skillCategories.map((category, index) => (
              <Tilt key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-[#0A192F]/70 backdrop-blur-md border border-[#1D2A3A]/70 rounded-2xl p-4 lg:p-5 shadow-md hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="w-11 h-11 bg-[#0F2742]/70 rounded-xl flex items-center justify-center border border-[#1D2A3A]/70 mb-3 text-zinc-200">
                    {category.icon}
                  </div>
                  <h3 className="text-lg xl:text-xl font-semibold mb-3 text-white">
                    {category.title}
                  </h3>
                  <div className="space-y-1.5 xl:space-y-2">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#0F2742] rounded-full"></div>
                        <span className="text-sm text-zinc-200/90">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </ScrollReveal>

          <ScrollReveal y={40} className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl" scrollYProgress={scrollYProgress} range={[0.5, 1]}>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-zinc-200/80">Proyectos Académicos y Personales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">3+</div>
              <div className="text-sm text-zinc-200/80">Años Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-zinc-200/80">Tecnologías</div>
            </div>
          </ScrollReveal>
        </div>
        )}

        <div className="pointer-events-none absolute left-[-7rem] top-[12%] h-56 w-56 rounded-full bg-[#0F2742]/20 blur-2xl lg:top-1/4 lg:-left-20 lg:h-64 lg:w-64 lg:bg-[#0F2742]/25 lg:blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-[4%] right-[-8rem] h-64 w-64 rounded-full bg-[#312e81]/10 blur-2xl lg:bottom-1/4 lg:-right-20 lg:h-80 lg:w-80 lg:bg-[#020617]/25 lg:blur-3xl"></div>
      </section>
    </>
  );
}
