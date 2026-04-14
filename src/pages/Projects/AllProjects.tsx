import { useState, useRef, useEffect } from "react";
import { useScroll, motion, MotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Project } from "./interface/Projects-interface";
import Mouse from "@/components/Mouse";
import { ArrowRight, Search, X } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { allProjects } from "./data/projectsData";

const projects = allProjects;

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
};

export default function AllProjects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"],
  });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQueryDebounced(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Obtener tecnologías únicas
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.tech)));
  const statuses = Array.from(new Set(projects.map((p) => p.status)));

  // Filtrar proyectos
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQueryDebounced.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQueryDebounced.toLowerCase());

    const matchesStatus = !selectedStatus || project.status === selectedStatus;

    const matchesTech =
      selectedTechs.length === 0 ||
      selectedTechs.some((tech) => project.tech.includes(tech));

    return matchesSearch && matchesStatus && matchesTech;
  });

  // Paginación
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleTechToggle = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus(null);
    setSelectedTechs([]);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="min-h-screen w-full text-white app-gradient">
        <Mouse />
        
        {/* Botón Volver Flotante */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/#projects")}
          className="fixed top-6 left-6 z-50 px-4 py-2 rounded-full bg-[#0F2742] border border-[#1D2A3A]/70 text-white text-sm font-medium hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>← Volver</span>
        </motion.button>

        <section
          ref={ref}
          id="all-projects"
          className="relative min-h-screen flex flex-col py-10 w-full"
        >
          {/* Header */}
          <div className="w-full max-w-6xl mx-auto px-6">
            <div className="mb-6">
              <ScrollReveal
                y={24}
                className="text-center w-full"
                scrollYProgress={scrollYProgress}
                range={[0, 0.3]}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-white">
                  Todos los Proyectos
                </h1>
                <p className="text-sm sm:text-base text-zinc-200/90 max-w-2xl mx-auto">
                  Explora el catálogo completo de mis proyectos y trabajos realizados.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-6xl mx-auto px-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0A192F]/50 border border-[#1D2A3A]/50 text-white placeholder-white/40 focus:outline-none focus:border-[#0ea5e9]/60 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-6 flex-1">
            {/* Filtros - Izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-56 flex-shrink-0"
            >
              <div>
                <div className="bg-[#020617]/50 rounded-lg border border-[#1D2A3A]/50 p-4">
                  {/* Limpiar filtros */}
                  {(searchQuery || selectedStatus || selectedTechs.length > 0) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="w-full mb-4 px-3 py-1.5 rounded-lg bg-[#0F2742]/50 hover:bg-[#0F2742] border border-[#1D2A3A]/70 text-white text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-3 h-3" />
                      Limpiar
                    </motion.button>
                  )}

                  {/* Filtro por Estado */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
                      Estado
                    </h3>
                    <div className="space-y-1.5">
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => handleStatusChange(null)}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all ${
                          selectedStatus === null
                            ? "bg-[#0ea5e9]/20 border border-[#0ea5e9]/50 text-white"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        Todos
                      </motion.button>
                      {statuses.map((status) => (
                        <motion.button
                          key={status}
                          whileHover={{ x: 4 }}
                          onClick={() => handleStatusChange(status)}
                          className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all ${
                            selectedStatus === status
                              ? "bg-[#0ea5e9]/20 border border-[#0ea5e9]/50 text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Filtro por Tecnología */}
                  <div>
                    <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
                      Tecnologías
                    </h3>
                    <div className="space-y-1.5">
                      {allTechs.map((tech) => (
                        <motion.label
                          key={tech}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 cursor-pointer text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTechs.includes(tech)}
                            onChange={() => handleTechToggle(tech)}
                            className="w-3 h-3 rounded accent-[#0ea5e9]"
                          />
                          <span className="text-white/70">{tech}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grid de proyectos - Centro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {paginatedProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                    {paginatedProjects.map((project, index) => (
                      <div key={`${project.title}-${index}`}>
                        <AllProjectCard
                          project={project}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          navigate={navigate}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 pt-6 mt-auto border-t border-[#1D2A3A]/50"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-1.5 rounded text-xs bg-[#0F2742]/80 hover:bg-[#0F2742] disabled:opacity-50 disabled:cursor-not-allowed border border-[#1D2A3A]/70 text-white font-medium transition-all"
                      >
                        ← Ant
                      </motion.button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentPage(page);
                              }}
                              className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                                currentPage === page
                                  ? "bg-[#0ea5e9] text-white"
                                  : "bg-[#0A192F]/90 border border-[#1D2A3A]/80 text-white/70 hover:text-white"
                              }`}
                            >
                              {page}
                            </motion.button>
                          )
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-1.5 rounded text-xs bg-[#0F2742]/80 hover:bg-[#0F2742] disabled:opacity-50 disabled:cursor-not-allowed border border-[#1D2A3A]/70 text-white font-medium transition-all"
                      >
                        Sig →
                      </motion.button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center flex-1 py-10"
                >
                  <p className="text-white/60 text-base mb-3">
                    No se encontraron proyectos.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={clearFilters}
                    className="px-4 py-1.5 rounded text-xs bg-[#0F2742] border border-[#1D2A3A]/70 text-white font-medium hover:scale-105 transition-all"
                  >
                    Limpiar filtros
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

interface AllProjectCardProps {
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  navigate: ReturnType<typeof useNavigate>;
}

function AllProjectCard({
  project,
  index,
  navigate,
}: AllProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onClick={() => Fetch_info(project, navigate)}
      className="group relative h-56 cursor-pointer rounded-lg overflow-hidden border border-[#1D2A3A]/50 hover:border-[#1D2A3A]/80 transition-all duration-300"
    >
      {/* Imagen de fondo */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Contenido */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Estado */}
        <div className="flex justify-end">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-[#0A192F]/90 text-zinc-200 border border-[#1D2A3A]/80">
            {project.status}
          </span>
        </div>

        {/* Información */}
        <div>
          <h3 className="text-sm md:text-base font-bold mb-1 text-white group-hover:text-[#0ea5e9] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-300/80 text-xs mb-2 line-clamp-2">
            {project.desc}
          </p>

          {/* Tecnologías */}
          <div className="flex flex-wrap gap-1 mb-2">
            {project.tech.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-[#0A192F]/90 backdrop-blur-md text-zinc-200 rounded text-xs border border-[#1D2A3A]/80"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 2 && (
              <span className="px-1.5 py-0.5 bg-[#0A192F]/90 backdrop-blur-md text-zinc-200 rounded text-xs border border-[#1D2A3A]/80">
                +{project.tech.length - 2}
              </span>
            )}
          </div>

          {/* Botón */}
          <motion.div
            whileHover={{ x: 2 }}
            className="inline-flex items-center gap-1 text-[#0ea5e9] group-hover:text-white transition-colors duration-300"
          >
            <span className="text-xs font-medium">Ver</span>
            <ArrowRight className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}