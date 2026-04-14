import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Github, ExternalLink } from "lucide-react";
import type { Project } from "../interface/Projects-interface";

export default function ProjectsInfo() {
  const [project, setProject] = useState<Project | null>(null);
  const [searchParams] = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
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
    navigate("/#projects");
  };

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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 w-full h-screen bg-[#020617] z-50 overflow-hidden"
        >
          {/* Header con botón cerrar */}
          <div className="sticky top-0 left-0 right-0 h-20 flex items-center justify-between px-6 sm:px-10 md:px-20 z-20 border-b border-[#1D2A3A]/50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">Volver</span>
            </motion.button>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[#0A192F]/90 text-zinc-200 border border-[#1D2A3A]/80">
              {project.status}
            </span>
          </div>

          {/* Contenido principal */}
          <div className="pb-10 w-full h-[calc(100vh-80px)] flex justify-center items-center overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
              {/* Carrusel de imágenes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Imagen principal */}
                <div 
                  onClick={() => setFullscreenIndex(currentImageIndex)}
                  className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#0A192F] to-[#020617] border border-[#1D2A3A]/50 group cursor-pointer hover:border-[#0ea5e9]/50 transition-all duration-300"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F2742]/80 hover:bg-[#0ea5e9]/60 border border-[#1D2A3A]/70 text-white transition-all duration-300 backdrop-blur-md hover:scale-105"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleNextImage(e)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F2742]/80 hover:bg-[#0ea5e9]/60 border border-[#1D2A3A]/70 text-white transition-all duration-300 backdrop-blur-md hover:scale-105"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}

                  {/* Indicadores */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-[#0ea5e9] w-6"
                              : "bg-white/40 w-2 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Miniaturas */}
                {project.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {project.images.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? "border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/30"
                            : "border-[#1D2A3A]/50 hover:border-[#1D2A3A]"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Información del proyecto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-start lg:justify-center"
              >
                {/* Encabezado */}
                <div className="mb-8 lg:mb-12">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
                    {project.title}
                  </h1>

                  <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  {/* Tecnologías */}
                  <div className="mb-10">
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
                          className="px-4 py-2 rounded-full text-sm font-medium text-white/70 bg-[#0A192F]/90 border border-[#1D2A3A]/80 hover:border-[#0ea5e9]/60 transition-all duration-300 backdrop-blur-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 flex-wrap pt-8 border-t border-[#1D2A3A]/50">
                  {project.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 sm:px-10 sm:py-4 bg-[#0F2742] text-white text-sm sm:text-base rounded-full border border-[#1D2A3A]/70 transition-all hover:scale-105 font-medium flex items-center gap-2"
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
                      className="px-8 py-3 sm:px-10 sm:py-4 text-white/60 border border-white/15 text-sm sm:text-base rounded-full hover:border-white/40 hover:text-white transition-all hover:scale-105 font-medium flex items-center gap-2"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenIndex(null)}
                className="fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex items-center justify-center p-4"
              >
                {/* Botón cerrar */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFullscreenIndex(null)}
                  className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#0F2742]/80 hover:bg-[#0ea5e9]/60 border border-[#1D2A3A]/70 text-white transition-all duration-300 backdrop-blur-md"
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F2742]/80 hover:bg-[#0ea5e9]/60 border border-[#1D2A3A]/70 text-white transition-all duration-300 backdrop-blur-md hover:scale-105 z-50"
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
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F2742]/80 hover:bg-[#0ea5e9]/60 border border-[#1D2A3A]/70 text-white transition-all duration-300 backdrop-blur-md hover:scale-105 z-50"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </>
                  )}

                  {/* Indicador de página */}
                  {project!.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full z-50">
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