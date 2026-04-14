import { useRef, useState } from "react";
import { useScroll, motion, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { Zap, Code, Smartphone, Cpu, CardSim } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
  color: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Aplicaciones Web",
    description: "Desarrollo de aplicaciones web modernas, escalables y de alto rendimiento. Desde páginas estáticas hasta plataformas complejas con funcionalidades avanzadas. Implemento arquitecturas limpias, optimizaciones de performance y experiencias de usuario excepcionales.",
    icon: <Code className="w-12 h-12" />,
    technologies: ["React", "TypeScript", "Node.js", "PHP", "Tailwind CSS"],
    color: "#ffff",
    gradient: "from-[#0ea5e9] to-[#6366f1]",
  },
  {
    id: 2,
    title: "Aplicaciones de Escritorio",
    description: "Desarrollo de herramientas y aplicaciones de escritorio con interfaces intuitivas y rendimiento optimizado. Creo soluciones robustas que funcionan de manera fluida en diferentes sistemas operativos, con enfoque en usabilidad y eficiencia.",
    icon: <Cpu className="w-12 h-12" />,
    technologies: ["Electron", "C#", "Python", "ASP.NET", "WPF"],
    color: "#ffff",
    gradient: "from-[#6366f1] to-[#7c3aed]",
  },
  {
    id: 3,
    title: "Aplicaciones Móvil",
    description: "Creación de aplicaciones móviles nativas y multiplataforma con experiencia de usuario excepcional. Diseño responsive, animaciones fluidas y funcionalidades que mantienen a los usuarios enganchados en tus aplicaciones.",
    icon: <Smartphone className="w-12 h-12" />,
    technologies: ["React Native", "Flutter", "TypeScript", "Firebase"],
    color: "#ffff",
    gradient: "from-[#7c3aed] to-[#00f5ff]",
  },
  {
    id: 4,
    title: "Automatización e IA",
    description: "Soluciones inteligentes mediante automatización de procesos y integración de modelos de inteligencia artificial. Optimizo workflows, reduzco tiempos de procesamiento y agrego capacidades inteligentes a tus sistemas.",
    icon: <Zap className="w-12 h-12" />,
    technologies: ["Python", "TensorFlow", "JavaScript", "Machine Learning", "N8N"],
    color: "#ffff",
    gradient: "from-[#00f5ff] to-[#0ea5e9]",
  },
];

interface ServicePanelProps {
  service: Service;
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ServicePanel({ service, i, total, scrollYProgress }: ServicePanelProps) {
  const isLast = i === total - 1;
  const segmentSize = 1 / total;

  const start = i * segmentSize;
  const mid = start + segmentSize * 0.4;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [0, 1] : [0, 1, 0]
  );

  const x = useTransform(
    scrollYProgress,
    isLast ? [start, mid] : [start, mid, end],
    isLast ? [30, 0] : [30, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute w-full"
    >
      <div className="flex flex-col justify-center px-6 lg:px-0">
        {/* Card con descripción */}
        <div className="relative p-8 rounded-2xl border border-[#1D2A3A]/50 bg-[#020617]/50 backdrop-blur-sm hover:border-[#1D2A3A]/80 transition-all duration-300">
          {/* Gradiente de fondo */}
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl pointer-events-none`}
          />

          {/* Línea decorativa superior */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/50 to-transparent" />

          {/* Icono */}
          <div
            className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${service.gradient} text-white mb-6`}
          >
            {service.icon}
          </div>

          {/* Contenido */}
          <div className="relative z-10">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
              {service.title}
            </h3>

            <p className="text-zinc-300/90 text-base leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Tecnologías */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">
                Stack Tecnológico
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${service.gradient} text-white/90 border border-[#1D2A3A]/50 backdrop-blur-sm`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Indicador de progreso */}
            <div className="pt-6 border-t border-[#1D2A3A]/50">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span>{i + 1}</span>
                <div className="flex gap-1">
                  {services.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === i
                          ? `w-8 bg-gradient-to-r ${service.gradient}`
                          : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span>/ {services.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceList({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.floor(latest * services.length);
    setActiveIndex(Math.min(index, services.length - 1));
  });

  return (
    <div className="flex flex-col justify-center space-y-6 px-6 lg:px-0">
      {services.map((s, index) => (
        <div
          key={s.id}
          className={`text-left transition-all duration-300 ${
            index === activeIndex ? "opacity-100" : "opacity-50"
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span
              className={`text-4xl md:text-5xl font-bold transition-all duration-300 ${
                index === activeIndex
                  ? "text-transparent bg-clip-text bg-gradient-to-r " + s.gradient
                  : "text-white/30"
              }`}
            >
              {String(s.id).padStart(2, "0")}
            </span>
            <h3
              className={`text-xl md:text-2xl font-semibold transition-all duration-300 ${
                index === activeIndex ? "text-white" : "text-white/60"
              }`}
            >
              {s.title}
            </h3>
          </div>

          {/* Línea decorativa */}
          {index === activeIndex && (
            <motion.div
              layoutId="underline"
              className={`h-1 mt-3 rounded-full bg-gradient-to-r ${s.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function MobileServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 rounded-2xl border border-[#1D2A3A]/50 bg-[#020617]/50 backdrop-blur-sm hover:border-[#1D2A3A]/80 transition-all duration-300"
    >
      {/* Gradiente de fondo */}
      <div
        className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl pointer-events-none`}
      />

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/50 to-transparent" />

      {/* Icono */}
      <div
        className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.gradient} text-white mb-4`}
      >
        {service.icon}
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <h3 className={`text-lg sm:text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
          {service.title}
        </h3>

        <p className="text-zinc-300/90 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tecnologías */}
        <div>
          <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
            Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.map((tech, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${service.gradient} text-white/90 border border-[#1D2A3A]/50 backdrop-blur-sm`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Versión Desktop */}
      <section
        ref={ref}
        id="services"
        style={{ height: `calc(100vh + ${(services.length - 1) * 80}vh)` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <ScrollReveal
            y={24}
            className="text-center mb-16 w-full max-w-3xl mx-auto px-6 absolute top-5 z-10"
            scrollYProgress={scrollYProgress}
            range={[0, 0.15]}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
              <CardSim className="w-4 h-4" />
              Servicios
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
              Soluciones Personalizadas
            </h2>
            <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
              Transformo ideas en realidad con tecnología moderna.
            </p>
          </ScrollReveal>

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f5ff]/10 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl opacity-20" />
          </div>

          {/* Services */}
          <div className="w-full relative flex items-center justify-center mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full">
              {/* Lista - Izquierda (Fija) */}
              <ServiceList scrollYProgress={scrollYProgress} />

              {/* Panel - Derecha (Animada) */}
              <div className="relative h-96 lg:h-auto flex items-center">
                {services.map((service, i) => (
                  <ServicePanel
                    key={service.id}
                    service={service}
                    i={i}
                    total={services.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Versión Mobile */}
      <section
        id="services"
        className="relative lg:hidden min-h-screen py-20 w-full"
      >
        {/* Header */}
        <ScrollReveal
          y={24}
          className="text-center mb-12 w-full max-w-3xl mx-auto px-6"
          scrollYProgress={scrollYProgress}
          range={[0, 0.3]}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
            <CardSim className="w-4 h-4" />
            Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Soluciones Personalizadas
          </h2>
          <p className="text-base sm:text-lg text-zinc-200/90 max-w-2xl mx-auto">
            Transformo ideas en realidad con tecnología moderna.
          </p>
        </ScrollReveal>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 bg-[#00f5ff]/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-[#7c3aed]/10 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Services Grid */}
        <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service) => (
              <MobileServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}