import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowLeft, ArrowRight, Mail, Github, Linkedin, Send } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const contactSteps = [
  { key: "name", label: "¿Cómo te llamás?", placeholder: "Tu nombre" },
  { key: "subject", label: "¿Sobre qué querés hablar?", placeholder: "Asunto del mensaje" },
  { key: "idea", label: "Contame tu idea", placeholder: "Descripción, objetivos o detalles del proyecto" },
] as const;

const contactStepNames = ["Nombre", "Asunto", "Idea"];

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

function ContactWizard({ isDesktop }: { isDesktop: boolean }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", subject: "", idea: "" });
  const activeFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const pendingFocusStepRef = useRef<number | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const current = contactSteps[step];
  const value = form[current.key];

  const setActiveField = useCallback((node: HTMLInputElement | HTMLTextAreaElement | null) => {
    activeFieldRef.current = node;
    if (!node || pendingFocusStepRef.current === null) return;

    const mountedStep = Number(node.dataset.contactStep);
    if (mountedStep !== pendingFocusStepRef.current) return;

    pendingFocusStepRef.current = null;
    focusFrameRef.current = window.requestAnimationFrame(() => {
      if (node.isConnected && activeFieldRef.current === node) {
        node.focus({ preventScroll: true });
      }
      focusFrameRef.current = null;
    });
  }, []);

  useEffect(() => () => {
    if (focusFrameRef.current !== null) {
      window.cancelAnimationFrame(focusFrameRef.current);
    }
  }, []);

  const goToStep = (nextStep: number) => {
    if (nextStep === step) return;
    pendingFocusStepRef.current = nextStep;
    setStep(nextStep);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;

    if (step < contactSteps.length - 1) {
      goToStep(step + 1);
      return;
    }

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "lautarosouza58@gmail.com",
      su: form.subject,
      body: `Hola Lautaro,\n\nMi nombre es ${form.name}.\n\n${form.idea}\n\nSaludos,\n${form.name}`,
    });
    window.open(`https://mail.google.com/mail/?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex min-h-[31rem] flex-col overflow-hidden rounded-[1.75rem] border border-[#1D2A3A]/70 bg-gradient-to-br from-[#071426]/95 via-[#020617]/95 to-black/90 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.3)] sm:p-6 lg:block lg:min-h-0 lg:rounded-2xl lg:bg-gradient-to-br lg:from-[#071426]/90 lg:via-[#020617]/85 lg:to-black/75 lg:p-5 lg:shadow-none lg:backdrop-blur-xl">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/70 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70 lg:hidden"
        style={{ background: "radial-gradient(circle at 92% 3%, rgba(14,165,233,0.13), transparent 32%)" }}
      />
      <div className="mb-5 flex items-center justify-between">
        <div className="relative z-10">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#7dd3fc]/65">INICIAR CONVERSACIÓN</p>
          <h3 className="mt-1.5 text-xl font-semibold text-white lg:mt-1 lg:text-lg">Tu próximo proyecto</h3>
        </div>
        <span className="relative z-10 font-mono text-xs text-white/35">0{step + 1} / 03</span>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Paso {step + 1} de {contactSteps.length}: {current.label}
      </p>

      <div className="mb-5 hidden gap-1.5 lg:flex">
        {contactSteps.map((item, index) => (
          <span key={item.key} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${index <= step ? "bg-[#7dd3fc]" : "bg-white/10"}`} />
        ))}
      </div>

      <ol className="relative z-10 mb-7 space-y-1 lg:hidden">
        {contactStepNames.map((name, index) => {
          const completed = index < step;
          const active = index === step;

          return (
            <li key={name} className="relative flex min-h-8 items-center gap-3">
              {index < contactStepNames.length - 1 && (
                <span className={`absolute left-[0.4375rem] top-6 h-4 w-px transition-colors duration-500 ${index < step ? "bg-[#7dd3fc]/70" : "bg-white/10"}`} />
              )}
              <span className={`relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${active ? "border-[#7dd3fc] bg-[#7dd3fc]/20 shadow-[0_0_16px_rgba(125,211,252,0.28)]" : completed ? "border-[#7dd3fc]/60 bg-[#7dd3fc]" : "border-white/15 bg-[#020617]"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#7dd3fc]" : completed ? "bg-[#020617]" : "bg-white/10"}`} />
              </span>
              <span className={`text-xs transition-colors duration-500 ${active ? "text-white" : completed ? "text-[#bae6fd]/65" : "text-white/25"}`}>
                {name}
              </span>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.key}
          initial={isDesktop ? { opacity: 0, x: 12 } : { opacity: 0, y: 14 }}
          animate={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
          exit={isDesktop ? { opacity: 0, x: -8 } : { opacity: 0, y: -10 }}
          transition={{ duration: isDesktop ? 0.3 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex-1 lg:flex-none"
        >
          <label htmlFor={`contact-${current.key}`} className="mb-3 block text-base font-medium text-zinc-100 lg:text-sm lg:text-zinc-200">{current.label}</label>
          {current.key === "idea" ? (
            <textarea
              ref={setActiveField}
              data-contact-step={step}
              id={`contact-${current.key}`}
              value={value}
              onChange={(event) => setForm({ ...form, [current.key]: event.target.value })}
              placeholder={current.placeholder}
              rows={4}
              className="h-36 w-full resize-none rounded-2xl border border-[#1D2A3A]/80 bg-black/30 px-4 py-4 text-base leading-6 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7dd3fc]/60 lg:h-auto lg:rounded-xl lg:border-[#1D2A3A]/70 lg:px-4 lg:py-3 lg:text-sm lg:leading-5 lg:focus:border-[#7dd3fc]/55"
            />
          ) : (
            <input
              ref={setActiveField}
              data-contact-step={step}
              id={`contact-${current.key}`}
              value={value}
              onChange={(event) => setForm({ ...form, [current.key]: event.target.value })}
              placeholder={current.placeholder}
              className="min-h-[3.25rem] w-full rounded-2xl border border-[#1D2A3A]/80 bg-black/30 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7dd3fc]/60 lg:min-h-0 lg:rounded-xl lg:border-[#1D2A3A]/70 lg:text-sm lg:focus:border-[#7dd3fc]/55"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mt-auto grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 pt-6 lg:mt-5 lg:flex lg:justify-between lg:gap-0 lg:pt-0">
        <button type="button" onClick={() => goToStep(step - 1)} disabled={step === 0} className="flex min-h-12 items-center gap-2 rounded-full px-2 text-xs text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:min-h-0 lg:p-0">
          <ArrowLeft className="h-3.5 w-3.5" /> Anterior
        </button>
        <button type="submit" disabled={!value.trim()} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1D2A3A]/80 bg-[#0F2742] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#7dd3fc]/45 hover:bg-[#123252] disabled:cursor-not-allowed disabled:opacity-40 lg:min-h-0 lg:flex-none lg:border-[#1D2A3A]/70 lg:py-2.5 lg:text-xs lg:transition-all">
          {step === contactSteps.length - 1 ? <><Send className="h-3.5 w-3.5" /> Abrir Gmail</> : <>Siguiente <ArrowRight className="h-3.5 w-3.5" /></>}
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  });

  return (
    <>
      <Helmet>
        <title>Contacto | Lautaro Souza - Prominence673</title>
        <meta name="description" content="Contáctame para proyectos de desarrollo frontend y backend. Disponible para colaboraciones freelance y a largo plazo. Email, GitHub y LinkedIn para conectar." />
        <link rel="canonical" href="https://portfoliov2-prominence.netlify.app/contact" />
      </Helmet>
      <section
        ref={ref}
        id="contact"
        className="mobile-safe-section scroll-scene relative
          min-h-[100svh] lg:h-screen lg:overflow-hidden
          flex flex-col justify-start items-stretch lg:justify-center lg:items-center
          px-4 sm:px-8 lg:px-10
          pb-20 pt-24 sm:pt-28 lg:py-8
        "
      >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] opacity-80 lg:hidden"
        style={{ background: "radial-gradient(ellipse at 82% 10%, rgba(14,165,233,0.1), transparent 48%)" }}
      />
      {/* Header */}
      <ScrollReveal y={44} className="mb-10 w-full max-w-xl text-left lg:mx-auto lg:mb-7 lg:text-center" scrollYProgress={scrollYProgress} range={[0, 0.4]}>
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#7dd3fc]/70">06</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#7dd3fc]/55 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/35">CONTACTO</span>
        </div>
        <div className="mb-4 hidden items-center gap-2 rounded-full border border-[#1D2A3A]/60 bg-[#020617]/70 px-4 py-2 text-sm text-zinc-200 lg:inline-flex">
          <Mail className="w-4 h-4" />
          Contacto
        </div>

        <h2
          className="
            text-4xl leading-[1.08]
            sm:text-4xl
            md:text-4xl
            font-bold
            mb-4 lg:mb-3
            text-white
          "
        >
          Trabajemos Juntos
        </h2>

        <p className="max-w-md text-sm leading-7 text-zinc-200/80 sm:text-base lg:mx-auto lg:text-lg lg:leading-normal lg:text-zinc-200/90">
          ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a
          hacerlo realidad.
        </p>
      </ScrollReveal>

      {/* Content */}
      <div className="w-full max-w-6xl">
        <ScrollReveal x={isDesktop ? -40 : 0} y={isDesktop ? 32 : 28} className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6" scrollYProgress={scrollYProgress} range={[0.3, 1]}>
          <div className="order-2 space-y-5 lg:order-1">
          {/* Socials */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white lg:text-xl">
              Mis Redes
              </h3>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/25 lg:hidden">CONECTEMOS</span>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:lautarosouza58@gmail.com"
                className="
                  flex min-h-16 items-center gap-3.5
                  p-3 lg:gap-4
                  bg-[#030b19]/90 lg:bg-black/50 lg:backdrop-blur-md
                  rounded-2xl lg:rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1D2A3A]/70 bg-[#071426]/85 transition-colors duration-300 group-hover:bg-black/60 group-hover:text-white lg:h-12 lg:w-12 lg:rounded-lg lg:border-[#1D2A3A]/60 lg:bg-[#020617]/70">
                  <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-white lg:text-base">Email</p>
                  <p className="truncate text-xs text-zinc-200/70 sm:text-sm lg:break-all lg:text-base lg:text-zinc-200/90">
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
                  flex min-h-16 items-center gap-3.5
                  p-3 lg:gap-4
                  bg-[#030b19]/90 lg:bg-black/50 lg:backdrop-blur-md
                  rounded-2xl lg:rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1D2A3A]/70 bg-[#071426]/85 transition-colors duration-300 group-hover:bg-black/60 group-hover:text-white lg:h-12 lg:w-12 lg:rounded-lg lg:border-[#1D2A3A]/60 lg:bg-[#020617]/70">
                  <Github className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-white lg:text-base">GitHub</p>
                  <p className="truncate text-xs text-zinc-200/70 sm:text-sm lg:break-all lg:text-base lg:text-zinc-200/90">
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
                  flex min-h-16 items-center gap-3.5
                  p-3 lg:gap-4
                  bg-[#030b19]/90 lg:bg-black/50 lg:backdrop-blur-md
                  rounded-2xl lg:rounded-xl
                  border border-[#1D2A3A]/60
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  group
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1D2A3A]/70 bg-[#071426]/85 transition-colors duration-300 group-hover:bg-black/60 group-hover:text-white lg:h-12 lg:w-12 lg:rounded-lg lg:border-[#1D2A3A]/60 lg:bg-[#020617]/70">
                  <Linkedin className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-white lg:text-base">LinkedIn</p>
                  <p className="truncate text-xs text-zinc-200/70 sm:text-sm lg:break-all lg:text-base lg:text-zinc-200/90">
                    linkedin.com/in/lautaro-souza-3069a5398
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1D2A3A]/60 bg-[#030b19]/90 p-5 lg:bg-black/50 lg:p-4 lg:backdrop-blur-md">
            <span className="absolute bottom-5 left-0 top-5 w-px bg-gradient-to-b from-transparent via-emerald-300/70 to-transparent lg:hidden" />
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.55)] lg:hidden" />
              <h4 className="font-semibold text-white">
                Disponibilidad
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-zinc-200/75 lg:text-zinc-200/90">
                Actualmente disponible para proyectos freelance y colaboraciones
                a largo plazo. Respuesta en menos de 24 horas.
              </p>
          </div>
          </div>

          <div className="order-1 lg:order-2">
            <ContactWizard isDesktop={isDesktop} />
          </div>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
