export default function Footer(){
    return(
        <>
        <footer className="w-full py-10 text-center bg-black/60 text-zinc-300 border-t border-[#1D2A3A]/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <p className="text-xl font-semibold text-white mb-4 md:mb-0">Lautaro Souza</p>
                <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors duration-300">Inicio</a>
                <a href="#about" className="hover:text-white transition-colors duration-300">Sobre mí</a>
                <a href="#projects" className="hover:text-white transition-colors duration-300">Proyectos</a>
                <a href="#contact" className="hover:text-white transition-colors duration-300">Contacto</a>
                </div>
            </div>
            <p className="text-zinc-300/80">© {new Date().getFullYear()} Lautaro Souza — Built with React & Tailwind</p>
            </div>
        </footer>
        </>
    );
}