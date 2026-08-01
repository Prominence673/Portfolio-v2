import { ScrollReveal } from "@/components/ScrollReveal";
import { Helmet } from 'react-helmet-async';
import { Palette, ArrowRight } from "lucide-react";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/pages/Projects/interface/Projects-interface";
import { useNavigate } from "react-router-dom";
import { allProjects } from "./data/projectsData";

const Fetch_info = (x: Project, navigate: ReturnType<typeof useNavigate>) => {
  const params = new URLSearchParams({
    title: x.title,
    desc: x.desc,
    tech: x.tech.join(","),
    status: x.status,
    github: x.github,
    demo: x.demo,
    image: x.image,
    images: x.images.join(","),
  });
  navigate(`/projects?${params.toString()}`);
}

const projects = allProjects.slice(0, 6);

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"]
  });
  return (
    <>
      <Helmet>
        <title>Proyectos | Lautaro Souza - Prominence673</title>
        <meta name="description" content="Explora mi portafolio de proyectos destacados, combinando arquitectura sólida y diseño cautivador. Descubre soluciones innovadoras desarrolladas con tecnologías modernas en desafíos de desarrollo web y móvil." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/projects" />
      </Helmet>
      {/* PROYECTOS */}
      <section
        ref={ref}
        id="projects"
        className="mobile-safe-section relative flex min-h-[100svh] w-full flex-col items-center py-24 sm:min-h-screen sm:py-20"
      >
        <ScrollReveal y={24} className="mx-auto mb-10 w-full max-w-3xl px-6 text-left sm:mb-16 sm:text-center" scrollYProgress={scrollYProgress} range={[0, 0.3]}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
            <Palette className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
            Proyectos Destacados
          </h2>
          <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
            Cada proyecto representa un desafío único, combinando arquitectura
            sólida con interfaces que cautivan.
          </p>
        </ScrollReveal>

        <div className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-0 sm:px-0 lg:h-[900px] lg:grid-cols-3 lg:grid-rows-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* Botón Ver todos los proyectos */}
        <ScrollReveal y={24} className="mt-12 flex w-full justify-center px-4 sm:mt-16 sm:px-0" scrollYProgress={scrollYProgress} range={[0.6, 0.9]}>
          <ViewAllButton />
        </ScrollReveal>
      </section>
    </>
  );
}

interface ProjectCardProps {
  title: string;
  desc: string;
  tech: string[];
  status: string;
  image: string;
  images: string[];
  github: string;
  demo: string;
  index: number;
}

function ProjectCard({
  title,
  desc,
  tech,
  status,
  image,
  index,
}: ProjectCardProps) {
  let gridClass = "mobile-project-card mobile-view-reveal relative h-[68svh] min-h-[460px] max-h-[620px] w-full sm:h-full sm:max-h-none ";
  if (index === 0) gridClass += "sm:col-span-2 sm:min-h-[400px] lg:col-span-1 lg:row-span-6 lg:min-h-0";
  else if (index === 1 || index === 2) gridClass += "sm:min-h-[350px] lg:col-span-1 lg:row-span-3 lg:min-h-0";
  else gridClass += "sm:min-h-[300px] lg:col-span-1 lg:row-span-2 lg:min-h-0";
  const navigate = useNavigate();
  return (
      <article
        className={`group flex cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#020617] sm:rounded-none sm:border-0 ${gridClass}`}
        onClick={() => Fetch_info(projects[index], navigate)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") Fetch_info(projects[index], navigate);
        }}
        role="button"
        tabIndex={0}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#020617]/75 font-mono text-xs text-white/55 backdrop-blur-md sm:hidden">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute right-5 top-5 z-20 sm:right-4 sm:top-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-[#0A192F]/90 text-zinc-200 border border-[#1D2A3A]/80 shadow-sm">
            {status}
          </span>
        </div>

        <div className="relative z-20 flex h-full flex-col justify-end p-6 sm:p-6 md:p-8">
          <div className="mb-5 h-px w-12 bg-gradient-to-r from-[#7dd3fc] to-transparent sm:hidden" />
          <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-xl md:text-2xl">
            {title}
          </h3>
          <p className={`mb-5 line-clamp-3 text-sm leading-6 text-zinc-300/90 ${index >= 3 ? "sm:hidden" : ""}`}>{desc}</p>
          <div className="flex flex-wrap gap-2 sm:mt-auto">
            {tech.slice(0, index < 3 ? 4 : 2).map((techItem, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#0A192F]/90 backdrop-blur-md text-zinc-200 rounded-full text-xs border border-[#1D2A3A]/80 shadow-sm"
              >
                {techItem}
              </span>
            ))}
            {tech.length > (index < 3 ? 4 : 2) && (
              <span className="px-3 py-1 bg-[#0A192F]/90 backdrop-blur-md text-zinc-200 rounded-full text-xs border border-[#1D2A3A]/80 shadow-sm">
                +{tech.length - (index < 3 ? 4 : 2)}
              </span>
            )}
          </div>
        </div>
      </article>
  );
}

function ViewAllButton() {
  const navigate = useNavigate();
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/all-projects")}
      className="flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#0F2742] px-8 py-4 text-sm font-medium text-white transition-all hover:scale-105 sm:w-auto sm:px-10 sm:text-base"
    >
      <span>Ver todos los proyectos</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
}
