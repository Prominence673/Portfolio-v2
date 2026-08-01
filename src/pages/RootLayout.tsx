import { lazy, Suspense, useEffect, useState } from 'react';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import Loading from '@/components/Loading.tsx';

const Stars = lazy(() => import('@/components/Stars.tsx'));
const Fog = lazy(() => import('@/components/Fog.tsx'));
const Navbar = lazy(() => import('@/components/Navbar'));
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Skills = lazy(() => import('@/pages/Skills'));
const Exp = lazy(() => import('@/pages/Exp'));
const Services = lazy(() => import('@/pages/Services'));
const Projects = lazy(() => import('@/pages/Projects/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const CosmicInterlude = lazy(() => import('@/components/CosmicInterlude'));

let particlesEnginePromise: Promise<void> | null = null;

function ensureParticlesEngine() {
  if (!particlesEnginePromise) {
    particlesEnginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }
  return particlesEnginePromise;
}

export default function RootLayout({ performanceMode, onTogglePerformance }: { performanceMode: boolean; onTogglePerformance: () => void }) {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    let active = true;
    ensureParticlesEngine().then(() => {
      if (active) setParticlesReady(true);
    });

    return () => {
      active = false;
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full text-white app-gradient">
      <Suspense fallback={null}>
        {particlesReady && <Stars />}
        {particlesReady && !performanceMode && <Fog />}
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Navbar performanceMode={performanceMode} onTogglePerformance={onTogglePerformance} />
        <Home />
        <About performanceMode={performanceMode} />
        {!performanceMode && <CosmicInterlude variant="orbit" />}
        <Skills />
        <Exp performanceMode={performanceMode} />
        {!performanceMode && <CosmicInterlude variant="voyage" />}
        <Services performanceMode={performanceMode} />
        {!performanceMode && <CosmicInterlude variant="singularity" />}
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
