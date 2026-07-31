import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

export default function RootLayout({ performanceMode, onTogglePerformance }: { performanceMode: boolean; onTogglePerformance: () => void }) {
  const [particlesReady, setParticlesReady] = useState(false);
  const [isAllProjects, setIsAllProjects] = useState(false);
  const location = useLocation();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);
  useEffect(() => {
    setIsAllProjects(location.pathname === "/all-projects" || location.pathname === "/projects");
  }, [location.pathname]);

  useEffect(() => {
    if (!particlesReady || location.pathname !== "/" || location.hash) return;

    const resetToHome = () => {
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousBehavior;
    };

    const frame = requestAnimationFrame(resetToHome);
    const timer = window.setTimeout(resetToHome, 150);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [particlesReady, location.pathname, location.hash]);
  
  if (!particlesReady) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen w-full text-white app-gradient">
      {/* One Page Style */}
      {!isAllProjects && (
        <>
          <Stars />
          {!performanceMode && <Fog />}
        </>
      )}
      <Suspense fallback={<Loading />}>
        <Navbar performanceMode={performanceMode} onTogglePerformance={onTogglePerformance} />
        <Home />
        <About performanceMode={performanceMode} />
        {!performanceMode && <CosmicInterlude variant="orbit" />}
        <Skills />
        <Exp />
        {!performanceMode && <CosmicInterlude variant="voyage" />}
        <Services />
        {!performanceMode && <CosmicInterlude variant="singularity" />}
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
