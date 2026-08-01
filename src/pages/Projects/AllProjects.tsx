import { useState, useRef, useEffect, useMemo } from "react";
import { useScroll, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Project } from "./interface/Projects-interface";
import { ArrowRight, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
  const allTechs = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))), []);
  const statuses = useMemo(() => Array.from(new Set(projects.map((p) => p.status))), []);

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQueryDebounced.toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.desc.toLowerCase().includes(normalizedQuery);
      const matchesStatus = !selectedStatus || project.status === selectedStatus;
      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.some((tech) => project.tech.includes(tech));

      return matchesSearch && matchesStatus && matchesTech;
    });
  }, [searchQueryDebounced, selectedStatus, selectedTechs]);

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
        
        {/* Botón Volver Flotante */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/#projects")}
          className="fixed left-4 top-[calc(env(safe-area-inset-top)+1rem)] z-50 flex min-h-11 items-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 sm:left-6 sm:top-6"
        >
          <span>← Volver</span>
        </motion.button>

        <section
          ref={ref}
          id="all-projects"
          className="relative flex min-h-screen w-full flex-col pb-20 pt-[calc(env(safe-area-inset-top)+6rem)] sm:py-10"
        >
          {/* Header */}
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-6">
              <ScrollReveal
                y={24}
                className="w-full text-left sm:text-center"
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
          <div className="mx-auto mb-4 w-full max-w-6xl px-4 sm:mb-6 sm:px-6">
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
                className="w-full rounded-2xl border border-[#1D2A3A]/50 bg-[#0A192F]/50 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[#0ea5e9]/60 sm:rounded-xl sm:py-3"
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:gap-6">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              aria-expanded={mobileFiltersOpen}
              aria-controls="mobile-project-filters"
              className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-[#1D2A3A]/60 bg-[#020617]/65 px-4 text-sm text-zinc-200 lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#7dd3fc]" />
                Filtros
                {(selectedStatus || selectedTechs.length > 0) && (
                  <span className="rounded-full bg-[#0ea5e9]/20 px-2 py-0.5 font-mono text-[10px] text-[#7dd3fc]">
                    {(selectedStatus ? 1 : 0) + selectedTechs.length}
                  </span>
                )}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileFiltersOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Filtros - Izquierda */}
            <motion.div
              id="mobile-project-filters"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${mobileFiltersOpen ? "block" : "hidden"} flex-shrink-0 lg:block lg:w-56`}
            >
              <div>
                <div className="rounded-2xl border border-[#1D2A3A]/50 bg-[#020617]/50 p-4 lg:rounded-lg">
                  {/* Limpiar filtros */}
                  {(searchQuery || selectedStatus || selectedTechs.length > 0) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="mb-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#1D2A3A]/70 bg-[#0F2742]/50 px-3 py-1.5 text-xs text-white transition-all hover:bg-[#0F2742] lg:min-h-0"
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
                    <div className="flex flex-wrap gap-2 lg:block lg:space-y-1.5">
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => handleStatusChange(null)}
                        className={`min-h-11 rounded-full px-3 py-2 text-left text-xs transition-all lg:min-h-0 lg:w-full lg:rounded lg:px-2.5 lg:py-1.5 ${
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
                          className={`min-h-11 rounded-full px-3 py-2 text-left text-xs transition-all lg:min-h-0 lg:w-full lg:rounded lg:px-2.5 lg:py-1.5 ${
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
                    <div
                      data-lenis-prevent
                      style={{ overscrollBehaviorY: "auto" }}
                      className="flex max-h-48 flex-wrap gap-2 overflow-y-auto pr-1 lg:block lg:max-h-none lg:space-y-1.5 lg:overflow-visible lg:pr-0"
                    >
                      {allTechs.map((tech) => (
                        <motion.label
                          key={tech}
                          whileHover={{ x: 4 }}
                          className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors lg:min-h-0 lg:rounded-none lg:border-0 lg:px-0 lg:py-0 ${selectedTechs.includes(tech) ? "border-[#0ea5e9]/45 bg-[#0ea5e9]/12" : "border-white/[0.06]"}`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedTechs.includes(tech)}
                            onChange={() => handleTechToggle(tech)}
                            className="h-4 w-4 rounded accent-[#0ea5e9] lg:h-3 lg:w-3"
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
                  <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
                    {paginatedProjects.map((project, index) => (
                      <div key={`${project.title}-${index}`}>
                        <AllProjectCard
                          project={project}
                          index={index}
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
                      className="mt-auto flex w-full items-center justify-center gap-1 border-t border-[#1D2A3A]/50 pb-20 pt-6 sm:gap-2 sm:pb-0"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        aria-label="Pagina anterior"
                        className="min-h-11 shrink-0 rounded border border-[#1D2A3A]/70 bg-[#0F2742]/80 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#0F2742] disabled:cursor-not-allowed disabled:opacity-50 md:min-h-0 md:px-4"
                      >
                        ← Ant
                      </motion.button>

                      <div
                        data-lenis-prevent
                        style={{ overscrollBehaviorY: "auto" }}
                        className="flex max-w-[55vw] items-center gap-1 overflow-x-auto overscroll-x-contain sm:max-w-none sm:overflow-visible"
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              aria-label={`Ir a la pagina ${page}`}
                              aria-current={currentPage === page ? "page" : undefined}
                              className={`min-h-11 min-w-11 rounded text-xs font-medium transition-all md:min-h-0 md:min-w-0 md:h-7 md:w-7 ${
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
                        aria-label="Pagina siguiente"
                        className="min-h-11 shrink-0 rounded border border-[#1D2A3A]/70 bg-[#0F2742]/80 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#0F2742] disabled:cursor-not-allowed disabled:opacity-50 md:min-h-0 md:px-4"
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
                    className="min-h-11 rounded border border-[#1D2A3A]/70 bg-[#0F2742] px-4 py-1.5 text-xs font-medium text-white transition-all hover:scale-105 md:min-h-0"
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
  navigate: ReturnType<typeof useNavigate>;
}

function AllProjectCard({
  project,
  index,
  navigate,
}: AllProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onClick={() => Fetch_info(project, navigate)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") Fetch_info(project, navigate);
      }}
      role="button"
      tabIndex={0}
      className="mobile-project-card group relative h-[58svh] min-h-[390px] max-h-[520px] cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#1D2A3A]/50 transition-all duration-300 hover:border-[#1D2A3A]/80 md:h-56 md:min-h-0 md:max-h-none md:rounded-lg"
    >
      {/* Imagen de fondo */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Contenido */}
      <div className="relative flex h-full flex-col justify-between p-6">
        {/* Estado */}
        <div className="flex justify-end">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-[#0A192F]/90 text-zinc-200 border border-[#1D2A3A]/80">
            {project.status}
          </span>
        </div>

        {/* Información */}
        <div>
          <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#0ea5e9] md:mb-1 md:text-base">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-3 text-sm leading-6 text-zinc-300/80 md:mb-2 md:line-clamp-2 md:text-xs md:leading-normal">
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
            <span className="text-sm font-medium md:text-xs">Ver proyecto</span>
            <ArrowRight className="h-4 w-4 md:h-3 md:w-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
