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
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
      <ul className="w-full h-full flex justify-around md:justify-end md:px-10 md:gap-3 items-center text-white">
        <Navlink to="#home" label="Inicio"><Home /></Navlink>
        <Navlink to="#about" label="Sobre mí"><UserRound /></Navlink>
        <Navlink to="#skills" label="Habilidades"><Code2 /></Navlink>
        <Navlink to="#projects" label="Proyectos"><FolderGit2 /></Navlink>
        <Navlink to="#experience" label="Experiencia"><Briefcase /></Navlink>
        <Navlink to="#contact" label="Contacto"><Mail /></Navlink>
        <Navlink to="#services" label="Servicios"><CardSim /></Navlink>
      </ul>
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
