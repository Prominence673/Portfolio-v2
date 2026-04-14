import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import { useScroll } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="
        min-h-screen
        flex flex-col justify-center items-center
        px-4 sm:px-8 lg:px-10
        py-16 sm:py-20
      "
    >
      {/* Header */}
      <ScrollReveal y={44} className="text-center mb-12 w-full max-w-xl mx-auto" scrollYProgress={scrollYProgress} range={[0, 0.4]}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-6">
          <Mail className="w-4 h-4" />
          Contacto
        </div>

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            mb-4
            text-white
          "
        >
          Trabajemos Juntos
        </h2>

        <p className="text-base sm:text-lg text-zinc-200/90 max-w-md mx-auto">
          ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a
          hacerlo realidad.
        </p>
      </ScrollReveal>

      {/* Content */}
      <div className="w-full max-w-4xl">
        <ScrollReveal x={-40} y={32} className="space-y-10" scrollYProgress={scrollYProgress} range={[0.3, 1]}>
          {/* Socials */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center sm:text-left">
              Mis Redes
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:lautarosouza58@gmail.com"
                className="
                  flex items-center gap-4
                  p-4
                  bg-black/50 backdrop-blur-md
                  rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="w-12 h-12 bg-[#020617]/70 rounded-lg flex items-center justify-center border border-[#1D2A3A]/60 group-hover:bg-black/60 group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Email</p>
                  <p className="text-zinc-200/90 text-sm sm:text-base break-all">
                    lautarosouza58@gmail.com
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Prominence673"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-4
                  p-4
                  bg-black/50 backdrop-blur-md
                  rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="w-12 h-12 bg-[#020617]/70 rounded-lg flex items-center justify-center border border-[#1D2A3A]/60 group-hover:bg-black/60 group-hover:text-white transition-colors duration-300">
                  <Github className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">GitHub</p>
                  <p className="text-zinc-200/90 text-sm sm:text-base break-all">
                    github.com/Prominence673
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/lautaro-souza-3069a5398/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-4
                  p-4
                  bg-black/50 backdrop-blur-md
                  rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="w-12 h-12 bg-[#020617]/70 rounded-lg flex items-center justify-center border border-[#1D2A3A]/60 group-hover:bg-black/60 group-hover:text-white transition-colors duration-300">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">LinkedIn</p>
                  <p className="text-zinc-200/90 text-sm sm:text-base break-all">
                    linkedin.com/in/lautaro-souza-3069a5398
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-black/50 backdrop-blur-md border border-[#1D2A3A]/60 rounded-2xl p-6">
            <h4 className="font-semibold text-white mb-3">
              Disponibilidad
            </h4>
            <p className="text-zinc-200/90 text-sm leading-relaxed">
              Actualmente disponible para proyectos freelance y colaboraciones
              a largo plazo. Respuesta en menos de 24 horas.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
