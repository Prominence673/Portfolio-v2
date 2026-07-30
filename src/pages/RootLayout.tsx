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

export default function RootLayout() {
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
  
  if (!particlesReady) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen w-full text-white app-gradient">
      {/* One Page Style */}
      {!isAllProjects && (
        <>
          <Stars />
          <Fog />
        </>
      )}
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Home />
        <About />
        <CosmicInterlude variant="orbit" />
        <Skills />
        <Exp />
        <CosmicInterlude variant="voyage" />
        <Services />
        <CosmicInterlude variant="singularity" />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
