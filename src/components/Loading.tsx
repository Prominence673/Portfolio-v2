export default function Loading(){
    return(
        <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-6 bg-[#020617]">
            <div className="relative h-44 w-24 sm:h-32 sm:w-32">
                <div className="absolute inset-0 animate-spin rounded-[50%] border border-[#7dd3fc]/25 border-t-[#7dd3fc] sm:rounded-full" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_22px_rgba(125,211,252,0.8)]" />
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/35">CARGANDO ESCENA</p>
        </div>
    )
}
