export default function Footer(){
    return(
        <>
        <footer className="mobile-safe-section mobile-view-reveal relative flex min-h-[52svh] w-full items-center overflow-hidden border-t border-[#1D2A3A]/60 bg-black/60 py-14 text-left text-zinc-300 backdrop-blur-md md:min-h-0 md:py-10 md:text-center">
            <div className="pointer-events-none absolute -right-20 top-10 h-52 w-52 rounded-full bg-[#0ea5e9]/5 blur-2xl md:hidden" />
            <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8 flex flex-col items-start justify-between md:mb-6 md:flex-row md:items-center">
                <div className="mb-8 md:mb-0">
                  <p className="mb-2 font-mono text-[10px] tracking-[0.28em] text-[#7dd3fc]/55 md:hidden">FIN DE TRANSMISIÓN / 07</p>
                  <p className="text-2xl font-semibold text-white md:text-xl">Lautaro Souza</p>
                  <span className="mt-3 block h-px w-16 bg-gradient-to-r from-[#7dd3fc] to-transparent md:hidden" />
                </div>
                <nav aria-label="Enlaces del pie" className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:gap-6">
                <a href="#home" className="rounded-xl border border-white/[0.06] px-4 py-3 text-sm transition-colors hover:text-white md:border-0 md:p-0">Inicio</a>
                <a href="#about" className="rounded-xl border border-white/[0.06] px-4 py-3 text-sm transition-colors hover:text-white md:border-0 md:p-0">Sobre mí</a>
                <a href="#projects" className="rounded-xl border border-white/[0.06] px-4 py-3 text-sm transition-colors hover:text-white md:border-0 md:p-0">Proyectos</a>
                <a href="#contact" className="rounded-xl border border-white/[0.06] px-4 py-3 text-sm transition-colors hover:text-white md:border-0 md:p-0">Contacto</a>
                </nav>
            </div>
            <p className="border-t border-white/[0.06] pt-5 text-xs text-zinc-300/65 md:border-0 md:pt-0 md:text-base md:text-zinc-300/80">© {new Date().getFullYear()} Lautaro Souza — Built with React & Tailwind</p>
            </div>
        </footer>
        </>
    );
}
