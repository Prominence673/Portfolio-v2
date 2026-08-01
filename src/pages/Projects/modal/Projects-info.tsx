import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Github, ExternalLink } from "lucide-react";
import type { Project } from "../interface/Projects-interface";

export default function ProjectsInfo() {
  const [project, setProject] = useState<Project | null>(null);
  const [searchParams] = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const fullscreenTriggerRef = useRef<HTMLDivElement>(null);
  const fullscreenDialogRef = useRef<HTMLDivElement>(null);
  const fullscreenCloseRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const projectObject = {
      title: searchParams.get("title"),
      desc: searchParams.get("desc"),
      tech: searchParams.get("tech")?.split(",") || [],
      status: searchParams.get("status"),
      github: searchParams.get("github"),
      demo: searchParams.get("demo"),
      image: searchParams.get("image"),
      images: searchParams.get("images")?.split(",") || [],
    } as Project;

    if (projectObject.title) {
      setProject(projectObject);
    } else {
      navigate("/");
    }
  }, [navigate, searchParams]);

  const handlePrevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? (project?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === (project?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    navigate("/all-projects");
  };

  const closeFullscreen = useCallback(() => {
    setFullscreenIndex(null);
    window.requestAnimationFrame(() => fullscreenTriggerRef.current?.focus());
  }, []);

  const handleFullscreenPrev = () => {
    setFullscreenIndex((prev) =>
      prev === 0 ? (project?.images.length || 1) - 1 : prev! - 1
    );
  };

  const handleFullscreenNext = () => {
    setFullscreenIndex((prev) =>
      prev === (project?.images.length || 1) - 1 ? 0 : prev! + 1
    );
  };

  const fullscreenOpen = fullscreenIndex !== null;
  const fullscreenImageCount = project?.images.length ?? 0;

  useEffect(() => {
    if (!fullscreenOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      fullscreenCloseRef.current?.focus();
    });

    const handleFullscreenKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeFullscreen();
        return;
      }

      if (event.key === "ArrowLeft" && fullscreenImageCount > 1) {
        event.preventDefault();
        setFullscreenIndex((current) =>
          current === null || current === 0
            ? fullscreenImageCount - 1
            : current - 1
        );
        return;
      }

      if (event.key === "ArrowRight" && fullscreenImageCount > 1) {
        event.preventDefault();
        setFullscreenIndex((current) =>
          current === null || current === fullscreenImageCount - 1
            ? 0
            : current + 1
        );
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = fullscreenDialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleFullscreenKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleFullscreenKeyDown);
    };
  }, [closeFullscreen, fullscreenImageCount, fullscreenOpen]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex h-[100svh] w-full flex-col overflow-hidden bg-[#020617]"
        >
          {/* Header con botón cerrar */}
          <div className="sticky left-0 right-0 top-0 z-20 flex min-h-[calc(4rem+env(safe-area-inset-top))] shrink-0 items-center justify-between border-b border-[#1D2A3A]/50 px-4 pt-[env(safe-area-inset-top)] sm:h-20 sm:min-h-20 sm:px-10 sm:pt-0 md:px-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="flex min-h-11 items-center gap-2 px-1 text-white/60 transition-colors duration-300 hover:text-white"
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">Volver</span>
            </motion.button>
            <span className="rounded-full border border-[#1D2A3A]/80 bg-[#0A192F]/90 px-3 py-1.5 text-[10px] font-semibold text-zinc-200 backdrop-blur-md sm:px-4 sm:text-xs">
              {project.status}
            </span>
          </div>

          {/* Contenido principal */}
          <div
            data-lenis-prevent
            className="flex min-h-0 w-full flex-1 items-start justify-center overflow-y-auto overscroll-contain pb-24 sm:items-center sm:pb-10"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-4 sm:gap-6 sm:p-6 md:p-8 lg:grid-cols-2 lg:gap-10">
              {/* Carrusel de imágenes */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Imagen principal */}
                <div
                  ref={fullscreenTriggerRef}
                  onClick={() => setFullscreenIndex(currentImageIndex)}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setFullscreenIndex(currentImageIndex);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir imagen ${currentImageIndex + 1} de ${project.images.length} en pantalla completa`}
                  className="group relative h-[38svh] min-h-[260px] w-full cursor-pointer overflow-hidden rounded-2xl border border-[#1D2A3A]/50 bg-gradient-to-br from-[#0A192F] to-[#020617] transition-all duration-300 hover:border-[#0ea5e9]/50 focus-visible:border-[#0ea5e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]/60 sm:h-auto sm:min-h-0 sm:aspect-video sm:rounded-xl"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  {/* Botones de navegación */}
                  {project.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handlePrevImage(e)}
                        aria-label="Ver imagen anterior"
                        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/80 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#0ea5e9]/60 sm:left-4 sm:h-12 sm:w-12"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleNextImage(e)}
                        aria-label="Ver imagen siguiente"
                        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/80 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#0ea5e9]/60 sm:right-4 sm:h-12 sm:w-12"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}

                  {/* Indicadores */}
                  {project.images.length > 1 && (
                    <div
                      data-lenis-prevent
                      className="absolute bottom-1 left-1/2 flex max-w-[calc(100%-1rem)] -translate-x-1/2 overflow-x-auto overscroll-contain sm:bottom-1"
                    >
                      {project.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={(event) => {
                            event.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          aria-label={`Ver imagen ${index + 1} de ${project.images.length}`}
                          aria-current={index === currentImageIndex ? "true" : undefined}
                          className="group/dot flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                        >
                          <span
                            aria-hidden="true"
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "w-6 bg-[#0ea5e9]"
                                : "w-2 bg-white/40 group-hover/dot:bg-white/70"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Miniaturas */}
                {project.images.length > 1 && (
                  <div
                    data-lenis-prevent
                    className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-contain pb-2"
                  >
                    {project.images.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Seleccionar imagen ${index + 1} de ${project.images.length}`}
                        aria-current={index === currentImageIndex ? "true" : undefined}
                        className={`h-16 w-28 flex-shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-14 sm:w-24 sm:rounded-lg ${
                          index === currentImageIndex
                            ? "border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/30"
                            : "border-[#1D2A3A]/50 hover:border-[#1D2A3A]"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Información del proyecto */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-start lg:justify-center"
              >
                {/* Encabezado */}
                <div className="mb-6 lg:mb-12">
                  <p className="mb-3 font-mono text-[10px] tracking-[0.26em] text-[#7dd3fc]/55 sm:hidden">DETALLE DE PROYECTO</p>
                  <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                    {project.title}
                  </h1>

                  <p className="mb-7 text-sm leading-7 text-white/55 sm:text-lg sm:leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tecnologías */}
                  <div className="mb-7 sm:mb-10">
                    <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
                      Stack Tecnológico
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        className="rounded-full border border-[#1D2A3A]/80 bg-[#0A192F]/90 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#0ea5e9]/60 sm:px-4 sm:py-2 sm:text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-3 border-t border-[#1D2A3A]/50 pt-6 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-8">
                  {project.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#0F2742] px-8 py-3.5 text-sm font-medium text-white transition-all hover:scale-105 sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Demo
                    </motion.a>
                  )}

                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white/60 transition-all hover:scale-105 hover:border-white/40 hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Visualizador Fullscreen */}
          <AnimatePresence>
            {fullscreenIndex !== null && (
              <motion.div
                ref={fullscreenDialogRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeFullscreen}
                role="dialog"
                aria-modal="true"
                aria-labelledby="fullscreen-project-title"
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-4"
              >
                <h2 id="fullscreen-project-title" className="sr-only">
                  Galeria de {project.title}
                </h2>

                {/* Botón cerrar */}
                <motion.button
                  ref={fullscreenCloseRef}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeFullscreen();
                  }}
                  aria-label="Cerrar imagen en pantalla completa"
                  className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/80 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#0ea5e9]/60 sm:right-6 sm:top-6"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Imagen fullscreen */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={fullscreenIndex}
                      src={project!.images[fullscreenIndex]}
                      alt={`${project!.title} fullscreen`}
                      decoding="async"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </AnimatePresence>

                  {/* Botones de navegación fullscreen */}
                  {project!.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFullscreenPrev();
                        }}
                        aria-label="Ver imagen anterior"
                        className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/80 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#0ea5e9]/60 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFullscreenNext();
                        }}
                        aria-label="Ver imagen siguiente"
                        className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#1D2A3A]/70 bg-[#0F2742]/80 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#0ea5e9]/60 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </>
                  )}

                  {/* Indicador de página */}
                  {project!.images.length > 1 && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.75rem)] left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md sm:bottom-6"
                    >
                      <span className="text-white/80 text-sm font-medium">
                        {fullscreenIndex + 1} / {project!.images.length}
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
