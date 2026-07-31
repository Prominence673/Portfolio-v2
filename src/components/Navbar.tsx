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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed z-50
        w-full bottom-0 left-0 h-16
        md:top-2 md:bottom-auto md:left-1/2 md:-translate-x-1/2
        md:w-full md:flex md:h-14 md:rounded-full
      "
    >
      <ul className="w-full h-full grid grid-cols-7 md:flex md:justify-end md:px-10 md:gap-3 items-center text-white bg-[#020617]/85 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-t border-white/10 md:border-0">
        <Navlink to="#home" label="Inicio"><Home /></Navlink>
        <Navlink to="#about" label="Sobre mí"><UserRound /></Navlink>
        <Navlink to="#skills" label="Habilidades"><Code2 /></Navlink>
        <Navlink to="#projects" label="Proyectos"><FolderGit2 /></Navlink>
        <Navlink to="#experience" label="Experiencia"><Briefcase /></Navlink>
        <Navlink to="#contact" label="Contacto"><Mail /></Navlink>
        <Navlink to="#services" label="Servicios"><CardSim /></Navlink>
      </ul>
      <button
        type="button"
        onClick={onTogglePerformance}
        aria-pressed={performanceMode}
        title={performanceMode ? "Desactivar modo rendimiento" : "Activar modo rendimiento"}
        className={`fixed right-4 bottom-20 flex items-center gap-2 rounded-full border px-3 py-2 text-xs backdrop-blur-xl transition-colors md:bottom-auto md:right-8 md:top-20 ${performanceMode ? "border-emerald-400/45 bg-emerald-950/80 text-emerald-200" : "border-[#1D2A3A]/80 bg-[#020617]/80 text-zinc-300 hover:text-white"}`}
      >
        <Gauge className="h-4 w-4" />
        <span className="hidden sm:inline">{performanceMode ? "Legacy activo" : "Modo rendimiento"}</span>
      </button>
    </motion.nav>
  );
}

function Navlink({
  to,
  children,
  label,
}: {
  to: string;
  children: ReactNode;
  label: string;
}) {
  return (
    <motion.li
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        group relative flex items-center justify-center
        rounded-full px-3 py-2 cursor-pointer
      "
    >
      <a href={to} className="flex items-center justify-center">
        <span className="transition-transform duration-300 group-hover:scale-110">
          {children}
        </span>

        {/* TEXTO SOLO EN DESKTOP */}
        <span
          className="
            hidden md:block text-sm font-medium opacity-0 w-0 overflow-hidden
            group-hover:opacity-100 group-hover:w-auto group-hover:ml-2
            whitespace-nowrap transition-all duration-300
          "
        >
          {label}
        </span>
      </a>
    </motion.li>
  );
}
