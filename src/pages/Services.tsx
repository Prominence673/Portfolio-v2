import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, useScroll, motion, useMotionValueEvent } from "framer-motion";
import { Zap, Code, Smartphone, Cpu, CardSim } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useQueuedScene } from "@/lib/useQueuedScene";

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
    color: "#ffffff",
    gradient: "from-[#020617] to-[#05103d]",
  },
  {
    id: 2,
    title: "Aplicaciones de Escritorio",
    description: "Desarrollo de herramientas y aplicaciones de escritorio con interfaces intuitivas y rendimiento optimizado. Creo soluciones robustas que funcionan de manera fluida en diferentes sistemas operativos, con enfoque en usabilidad y eficiencia.",
    icon: <Cpu className="w-12 h-12" />,
    technologies: ["Electron", "C#", "Python", "ASP.NET", "WPF"],
    color: "#ffffff",
    gradient: "from-[#020617] to-[#05103d]",
  },
  {
    id: 3,
    title: "Aplicaciones Móvil",
    description: "Creación de aplicaciones móviles nativas y multiplataforma con experiencia de usuario excepcional. Diseño responsive, animaciones fluidas y funcionalidades que mantienen a los usuarios enganchados en tus aplicaciones.",
    icon: <Smartphone className="w-12 h-12" />,
    technologies: ["React Native", "Flutter", "TypeScript", "Firebase"],
    color: "#ffffff",
    gradient: "from-[#020617] to-[#05103d]",
  },
  {
    id: 4,
    title: "Automatización e IA",
    description: "Soluciones inteligentes mediante automatización de procesos y integración de modelos de inteligencia artificial. Optimizo workflows, reduzco tiempos de procesamiento y agrego capacidades inteligentes a tus sistemas.",
    icon: <Zap className="w-12 h-12" />,
    technologies: ["Python", "TensorFlow", "JavaScript", "ML", "N8N"],
    color: "#ffffff",
    gradient: "from-[#020617] to-[#05103d]",
  },
];

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

function ActiveServicePanel({ service, index, performanceMode = false }: { service: Service; index: number; performanceMode?: boolean }) {
  return (
    <motion.div
      key={service.id}
      initial={performanceMode ? false : { opacity: 0, x: 16, filter: "blur(3px)" }}
      animate={performanceMode ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={performanceMode ? undefined : { opacity: 0, x: -12, filter: "blur(2px)" }}
      transition={performanceMode ? { duration: 0 } : { duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#1D2A3A]/70 bg-gradient-to-br from-[#071426]/90 via-[#020617]/88 to-black/80 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0ea5e9]/10 blur-[90px]" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#4338ca]/10 blur-[100px]" />
        <div className="absolute -right-8 -top-12 select-none font-mono text-[11rem] font-bold leading-none text-white/[0.025]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 grid h-full grid-cols-[0.72fr_1.45fr] items-center gap-10 xl:gap-16">
          <div className="flex h-full flex-col items-center justify-center border-r border-white/[0.07] pr-10 text-center">
            <div className="mb-7 inline-flex rounded-[1.4rem] border border-[#1D2A3A]/70 bg-[#0A192F]/80 p-5 text-[#bae6fd] shadow-[0_0_40px_rgba(14,165,233,0.1)]">
              {service.icon}
            </div>
            <span className="font-mono text-6xl font-bold tracking-tight text-white/10 xl:text-7xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 font-mono text-[10px] tracking-[0.25em] text-[#7dd3fc]/55">
              CAPACIDAD / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#7dd3fc]/70">SERVICIO DESTACADO</p>
            <h3 className="mb-5 max-w-2xl text-3xl font-bold leading-tight text-white lg:text-5xl">{service.title}</h3>
            <p className="max-w-3xl text-sm leading-7 text-zinc-300/80 lg:text-base">{service.description}</p>

            <div className="mt-7 border-t border-[#1D2A3A]/50 pt-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Tecnologías</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-[#1D2A3A]/70 bg-[#0A192F]/70 px-3 py-1.5 text-xs text-zinc-200">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceList({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {services.map((s, index) => (
        <div
          key={s.id}
          className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-500 ${
            index === activeIndex
              ? "border-[#1D2A3A] bg-[#0A192F]/75"
              : "border-transparent bg-transparent opacity-45"
          }`}
        >
          <motion.div
            className="absolute inset-x-5 bottom-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#7dd3fc] to-[#818cf8]"
            animate={{ opacity: index === activeIndex ? 1 : 0, scaleX: index === activeIndex ? 1 : 0.25 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <div className="flex items-center gap-4">
            <span
              className={`font-mono text-sm transition-colors duration-500 ${index === activeIndex ? "text-[#7dd3fc]" : "text-white/30"}`}
            >
              {String(s.id).padStart(2, "0")}
            </span>
            <h3
              className={`truncate text-sm font-medium transition-colors duration-500 xl:text-base ${
                index === activeIndex ? "text-white" : "text-white/60"
              }`}
            >
              {s.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileServiceCard({
  service,
  index,
  performanceMode,
}: {
  service: Service;
  index: number;
  performanceMode: boolean;
}) {
  return (
    <motion.article
      initial={performanceMode ? false : { opacity: 0.25, y: 42 }}
      whileInView={performanceMode ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={performanceMode ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[68svh] overflow-hidden rounded-[1.75rem] border border-[#1D2A3A]/70 bg-[#030b19]/90 px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.26)] sm:min-h-[34rem] sm:px-7 sm:py-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 88% 4%, rgba(14,165,233,0.13), transparent 35%), linear-gradient(155deg, rgba(7,20,38,0.82), rgba(2,6,23,0.94) 58%, rgba(0,0,0,0.88))",
        }}
      />
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent" />
      <div className="pointer-events-none absolute -right-5 top-10 font-mono text-[7.5rem] font-bold leading-none text-white/[0.025]">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex min-h-[calc(68svh-3rem)] flex-col sm:min-h-[30rem]">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className={`inline-flex rounded-2xl border border-[#1D2A3A]/80 bg-gradient-to-br ${service.gradient} p-3.5 text-[#bae6fd] shadow-[0_0_30px_rgba(14,165,233,0.08)] [&_svg]:h-7 [&_svg]:w-7`}>
              {service.icon}
            </div>
            <div className="text-right">
              <span className="block font-mono text-2xl font-semibold text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#7dd3fc]/55">
                DE {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-[#7dd3fc]/65">
            CAPACIDAD DIGITAL
          </p>
          <h3 className="max-w-sm text-2xl font-bold leading-tight text-white sm:text-3xl">
            {service.title}
          </h3>

          <p className="mt-5 text-sm leading-7 text-zinc-300/80 sm:text-[0.95rem]">
            {service.description}
          </p>
        </div>

        <div className="mt-auto border-t border-white/[0.07] pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Tecnologías
            </h4>
            <span className="h-px w-10 bg-gradient-to-r from-[#7dd3fc]/50 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#1D2A3A]/80 bg-[#08172a]/75 px-3 py-1.5 text-xs font-medium text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services({ performanceMode = false }: { performanceMode?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktopLayout();
  const isNearViewport = useInView(ref, { margin: "75% 0px" });
  const nearViewportRef = useRef(isNearViewport);
  nearViewportRef.current = isNearViewport;
  const {
    activeIndex,
    handleExitComplete,
    queueScene,
  } = useQueuedScene({
    animated: isDesktop && !performanceMode,
    isNearViewport: isDesktop && isNearViewport,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;

    const nextIndex = Math.min(
      Math.floor(latest * services.length),
      services.length - 1
    );
    queueScene(nextIndex, !nearViewportRef.current);
  });

  return (
    <>
      <Helmet>
        <title>Servicios | Lautaro Souza - Prominence673</title>
        <meta name="description" content="Servicios de desarrollo: aplicaciones web, móvil y de escritorio, automatización e integración de IA. Soluciones personalizadas con enfoque en rendimiento y UX." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/services" />
      </Helmet>
      <div ref={ref} id="services">
      {isDesktop ? (
        /* Versión Desktop */
        <section
          style={{ height: `calc(100vh + ${(services.length - 1) * 80}vh)` }}
          className="scroll-scene relative"
        >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f5ff]/10 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl opacity-20" />
          </div>

          {/* Services */}
          <div className="relative flex w-full items-center justify-center px-8">
            <div className="flex h-[42rem] w-full max-w-7xl flex-col justify-center">
              <header className="mb-7 flex items-end justify-between gap-12">
                <div>
                  <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-[#7dd3fc]/70">05 — SERVICIOS</span>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/60 bg-[#020617]/70 px-4 py-2 text-sm text-zinc-200">
                    <CardSim className="h-4 w-4" />
                    Servicios
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-white xl:text-4xl">Soluciones Personalizadas</h2>
                </div>
                <p className="max-w-md pb-1 text-right text-sm leading-6 text-zinc-300/70">Transformo ideas en productos digitales con tecnología moderna, una dirección clara y atención por cada detalle.</p>
              </header>

              <ServiceList activeIndex={activeIndex} />

              {/* Escenario panorámico */}
              <div className="relative mt-5 h-[27rem] min-w-0">
                <AnimatePresence
                  initial={false}
                  presenceAffectsLayout={false}
                  onExitComplete={handleExitComplete}
                >
                  <ActiveServicePanel
                    key={services[activeIndex].id}
                    service={services[activeIndex]}
                    index={activeIndex}
                    performanceMode={performanceMode}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        </section>
      ) : (
        /* Versión Mobile */
        <section
          className="mobile-safe-section scroll-scene relative min-h-[100svh] w-full overflow-hidden py-20"
        >
        <motion.header
          initial={performanceMode ? false : { opacity: 0, y: 30 }}
          whileInView={performanceMode ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={performanceMode ? { duration: 0 } : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto flex min-h-[58svh] w-full max-w-2xl flex-col justify-end px-6 pb-14 pt-8 sm:min-h-[32rem] sm:px-8"
        >
          <div className="mb-7 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.28em] text-[#7dd3fc]/70">05</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#7dd3fc]/55 to-transparent" />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#020617]/75 px-3.5 py-2 text-xs text-zinc-200">
              <CardSim className="h-4 w-4" />
              Servicios
            </div>
          </div>
          <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-white/35">SOLUCIONES A MEDIDA</p>
          <h2 className="max-w-md text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
            Soluciones Personalizadas
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-300/75 sm:text-base">
            Transformo ideas en productos digitales con tecnología moderna, una dirección clara y atención por cada detalle.
          </p>
          <div className="mt-9 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span className="h-8 w-px bg-gradient-to-b from-[#7dd3fc]/70 to-transparent" />
            Deslizá para explorar
          </div>
        </motion.header>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-[12rem] h-px w-32 bg-gradient-to-r from-[#7dd3fc]/20 to-transparent" />
          <div className="absolute right-0 top-[42rem] h-px w-28 bg-gradient-to-l from-[#818cf8]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-8">
          <div className="relative space-y-10 pb-10">
            <div className="absolute bottom-10 left-[1.1rem] top-6 w-px bg-gradient-to-b from-[#7dd3fc]/60 via-[#1D2A3A]/80 to-transparent" />
            {services.map((service, index) => (
              <div key={service.id} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 sm:gap-5">
                <div className="relative z-10 pt-7">
                  <motion.span
                    initial={performanceMode ? false : { scale: 0.65, opacity: 0 }}
                    whileInView={performanceMode ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={performanceMode ? { duration: 0 } : { duration: 0.45, delay: 0.08, ease: "easeOut" }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7dd3fc]/45 bg-[#051225] font-mono text-[10px] text-[#bae6fd] shadow-[0_0_20px_rgba(14,165,233,0.1)]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </div>
                <MobileServiceCard
                  service={service}
                  index={index}
                  performanceMode={performanceMode}
                />
              </div>
            ))}
          </div>
        </div>
        </section>
      )}
      </div>
    </>
  );
}
