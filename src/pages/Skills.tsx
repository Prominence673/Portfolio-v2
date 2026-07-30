import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, useScroll } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Code, Database, Palette, Server, BookMarked } from "lucide-react";
import { useRef } from "react";
import { Helmet } from 'react-helmet-async';

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
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
        className="scroll-scene relative min-h-screen lg:h-screen flex flex-col justify-center items-center px-5 sm:px-10 py-12 lg:py-8 overflow-hidden"
      >
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

        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#0F2742]/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#020617]/25 rounded-full blur-3xl"></div>
      </section>
    </>
  );
}
