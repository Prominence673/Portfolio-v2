import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowLeft, ArrowRight, Mail, Github, Linkedin, Send } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const contactSteps = [
  { key: "name", label: "¿Cómo te llamás?", placeholder: "Tu nombre" },
  { key: "subject", label: "¿Sobre qué querés hablar?", placeholder: "Asunto del mensaje" },
  { key: "idea", label: "Contame tu idea", placeholder: "Descripción, objetivos o detalles del proyecto" },
] as const;

function ContactWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", subject: "", idea: "" });
  const current = contactSteps[step];
  const value = form[current.key];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;

    if (step < contactSteps.length - 1) {
      setStep((currentStep) => currentStep + 1);
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
    <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-2xl border border-[#1D2A3A]/70 bg-gradient-to-br from-[#071426]/90 via-[#020617]/85 to-black/75 p-5 backdrop-blur-xl">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/70 to-transparent" />
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#7dd3fc]/65">INICIAR CONVERSACIÓN</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Tu próximo proyecto</h3>
        </div>
        <span className="font-mono text-xs text-white/35">0{step + 1} / 03</span>
      </div>

      <div className="mb-5 flex gap-1.5">
        {contactSteps.map((item, index) => (
          <span key={item.key} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${index <= step ? "bg-[#7dd3fc]" : "bg-white/10"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={current.key} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
          <label htmlFor={`contact-${current.key}`} className="mb-3 block text-sm font-medium text-zinc-200">{current.label}</label>
          {current.key === "idea" ? (
            <textarea
              id={`contact-${current.key}`}
              value={value}
              onChange={(event) => setForm({ ...form, [current.key]: event.target.value })}
              placeholder={current.placeholder}
              rows={4}
              className="w-full resize-none rounded-xl border border-[#1D2A3A]/70 bg-black/25 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7dd3fc]/55"
            />
          ) : (
            <input
              id={`contact-${current.key}`}
              value={value}
              onChange={(event) => setForm({ ...form, [current.key]: event.target.value })}
              placeholder={current.placeholder}
              className="w-full rounded-xl border border-[#1D2A3A]/70 bg-black/25 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7dd3fc]/55"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-between">
        <button type="button" onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))} disabled={step === 0} className="flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0">
          <ArrowLeft className="h-3.5 w-3.5" /> Anterior
        </button>
        <button type="submit" disabled={!value.trim()} className="flex items-center gap-2 rounded-full border border-[#1D2A3A]/70 bg-[#0F2742] px-5 py-2.5 text-xs font-medium text-white transition-all hover:border-[#7dd3fc]/45 hover:bg-[#123252] disabled:cursor-not-allowed disabled:opacity-40">
          {step === contactSteps.length - 1 ? <><Send className="h-3.5 w-3.5" /> Abrir Gmail</> : <>Siguiente <ArrowRight className="h-3.5 w-3.5" /></>}
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
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
        className="scroll-scene
          min-h-screen lg:h-screen lg:overflow-hidden
          flex flex-col justify-center items-center
          px-4 sm:px-8 lg:px-10
          py-12 lg:py-8
        "
      >
      {/* Header */}
      <ScrollReveal y={44} className="text-center mb-7 w-full max-w-xl mx-auto" scrollYProgress={scrollYProgress} range={[0, 0.4]}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/70 border border-[#1D2A3A]/60 text-zinc-200 text-sm mb-4">
          <Mail className="w-4 h-4" />
          Contacto
        </div>

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-4xl
            font-bold
            mb-3
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
      <div className="w-full max-w-6xl">
        <ScrollReveal x={-40} y={32} className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]" scrollYProgress={scrollYProgress} range={[0.3, 1]}>
          <div className="space-y-5">
          {/* Socials */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white text-center sm:text-left">
              Mis Redes
            </h3>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:lautarosouza58@gmail.com"
                className="
                  flex items-center gap-4
                  p-3
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
                  p-3
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
                  p-3
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
          <div className="bg-black/50 backdrop-blur-md border border-[#1D2A3A]/60 rounded-2xl p-4">
            <h4 className="font-semibold text-white mb-3">
              Disponibilidad
            </h4>
            <p className="text-zinc-200/90 text-sm leading-relaxed">
              Actualmente disponible para proyectos freelance y colaboraciones
              a largo plazo. Respuesta en menos de 24 horas.
            </p>
          </div>
          </div>

          <ContactWizard />
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
