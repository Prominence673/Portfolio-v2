import { ScrollReveal } from "@/components/ScrollReveal";
import { Palette, ArrowRight } from "lucide-react";
import { useScroll, motion } from "framer-motion";
import { useState, useRef } from "react";
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
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      {/* PROYECTOS */}
      <section
        ref={ref}
        id="projects"
        className="relative min-h-screen flex flex-col items-center py-20 w-full"
      >
        <ScrollReveal y={24} className="text-center mb-10 sm:mb-16 w-full max-w-3xl mx-auto px-6" scrollYProgress={scrollYProgress} range={[0, 0.3]}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-6 w-full lg:h-[900px]">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
              state={showDetails}
              setState={setShowDetails}
            />
          ))}
        </div>

        {/* Botón Ver todos los proyectos */}
        <ScrollReveal y={24} className="mt-16 w-full flex justify-center" scrollYProgress={scrollYProgress} range={[0.6, 0.9]}>
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
  state: boolean;
  setState: (value: boolean) => void;
}

function ProjectCard({
  title,
  desc,
  tech,
  status,
  image,
  index,
}: ProjectCardProps) {
  let gridClass = "w-full h-full relative ";
  if (index === 0) gridClass += "lg:col-span-1 lg:row-span-6 md:col-span-2 min-h-[400px] lg:min-h-0";
  else if (index === 1 || index === 2) gridClass += "lg:col-span-1 lg:row-span-3 min-h-[350px] lg:min-h-0";
  else gridClass += "lg:col-span-1 lg:row-span-2 min-h-[300px] lg:min-h-0";
  const navigate = useNavigate();
  return (
    <>
      <div 
        className={`group cursor-pointer flex flex-col justify-end bg-[#020617] overflow-hidden ${gridClass}`}
        onClick={() => Fetch_info(projects[index], navigate)}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-[#0A192F]/90 text-zinc-200 border border-[#1D2A3A]/80 shadow-sm">
            {status}
          </span>
        </div>

        <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end h-full">
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h3>
          {index < 3 && (
            <p className="text-zinc-300/90 text-sm mb-4 line-clamp-2 md:line-clamp-3">{desc}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-auto">
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
      </div>
    </>
  );
}

function ViewAllButton() {
  const navigate = useNavigate();
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/all-projects")}
      className="px-8 py-3 sm:px-10 sm:py-4 bg-[#0F2742] text-white text-sm sm:text-base rounded-full border border-[#1D2A3A]/70 transition-all hover:scale-105 font-medium flex items-center gap-2"
    >
      <span>Ver todos los proyectos</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
}
