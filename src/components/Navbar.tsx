import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Home,
  UserRound,
  Code2,
  FolderGit2,
  Briefcase,
  Mail,
  CardSim,
  Gauge,
} from "lucide-react";

export default function Navbar({ performanceMode, onTogglePerformance }: { performanceMode: boolean; onTogglePerformance: () => void }) {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-1 z-50 h-[4.25rem] md:hidden bottom-[max(0.75rem,env(safe-area-inset-bottom))]"
        aria-label="Navegación principal"
      >
        <ul className="grid h-full grid-cols-7 items-center rounded-[1.6rem] border border-white/10 bg-[#020617]/88 px-0.5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <Navlink mobile index={0} to="#home" label="Inicio"><Home /></Navlink>
          <Navlink mobile index={1} to="#about" label="Sobre mí"><UserRound /></Navlink>
          <Navlink mobile index={2} to="#skills" label="Habilidades"><Code2 /></Navlink>
          <Navlink mobile index={3} to="#experience" label="Experiencia"><Briefcase /></Navlink>
          <Navlink mobile index={4} to="#services" label="Servicios"><CardSim /></Navlink>
          <Navlink mobile index={5} to="#projects" label="Proyectos"><FolderGit2 /></Navlink>
          <Navlink mobile index={6} to="#contact" label="Contacto"><Mail /></Navlink>
        </ul>
      </motion.nav>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed left-1/2 top-2 z-50 hidden h-14 w-full -translate-x-1/2 md:block"
        aria-label="Navegación principal"
      >
        <ul className="flex h-full w-full items-center justify-end gap-3 px-10 text-white">
          <Navlink to="#home" label="Inicio"><Home /></Navlink>
          <Navlink to="#about" label="Sobre mí"><UserRound /></Navlink>
          <Navlink to="#skills" label="Habilidades"><Code2 /></Navlink>
          <Navlink to="#projects" label="Proyectos"><FolderGit2 /></Navlink>
          <Navlink to="#experience" label="Experiencia"><Briefcase /></Navlink>
          <Navlink to="#contact" label="Contacto"><Mail /></Navlink>
          <Navlink to="#services" label="Servicios"><CardSim /></Navlink>
        </ul>
      </motion.nav>

      <button
        type="button"
        onClick={onTogglePerformance}
        aria-pressed={performanceMode}
        title={performanceMode ? "Desactivar modo rendimiento" : "Activar modo rendimiento"}
        className={`fixed right-4 top-[calc(1rem+env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full border text-xs shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors md:right-8 md:top-20 md:h-auto md:w-auto md:gap-2 md:px-3 md:py-2 ${performanceMode ? "border-emerald-400/45 bg-emerald-950/80 text-emerald-200" : "border-[#1D2A3A]/80 bg-[#020617]/80 text-zinc-300 hover:text-white"}`}
      >
        <Gauge className="h-4 w-4" />
        <span className="sr-only md:not-sr-only">{performanceMode ? "Legacy activo" : "Modo rendimiento"}</span>
      </button>
    </>
  );
}

function Navlink({
  to,
  children,
  label,
  mobile = false,
  index = 0,
}: {
  to: string;
  children: ReactNode;
  label: string;
  mobile?: boolean;
  index?: number;
}) {
  return (
    <motion.li
      initial={mobile ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={mobile ? undefined : { y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={mobile
        ? { duration: 0.35, delay: 0.12 + index * 0.035 }
        : { type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex cursor-pointer items-center justify-center rounded-full ${mobile ? "h-12 min-w-0 p-0" : "px-3 py-2"}`}
    >
      <a href={to} aria-label={label} className={`flex items-center justify-center ${mobile ? "h-11 w-11 rounded-2xl active:bg-white/10" : ""}`}>
        <span className={`${mobile ? "[&>svg]:h-5 [&>svg]:w-5" : "transition-transform duration-300 group-hover:scale-110"}`}>
          {children}
        </span>

        <span
          className={mobile
            ? "sr-only"
            : "hidden w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 md:block"}
        >
          {label}
        </span>
      </a>
    </motion.li>
  );
}
