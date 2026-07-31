import './App.css'
import ScrollToHash from '@/components/Hash.tsx'
import Mouse from '@/components/Mouse.tsx'
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import RootLayout from '@/pages/RootLayout';
import ProjectsInfo from '@/pages/Projects/modal/Projects-info';
import AllProjects from '@/pages/Projects/AllProjects';

function App() {
  const [performanceMode, setPerformanceMode] = useState(() => localStorage.getItem('portfolio-performance-mode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('performance-mode', performanceMode);
    localStorage.setItem('portfolio-performance-mode', String(performanceMode));
  }, [performanceMode]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: performanceMode ? 0.9 : 1.65,
      smoothWheel: true,
      wheelMultiplier: performanceMode ? 0.95 : 0.82,
      touchMultiplier: performanceMode ? 1 : 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let animationFrame: number;
    const raf = (time: number) =>  {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }
    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [performanceMode]);

  return (
    <>
      <div className="min-h-screen w-full text-white app-gradient">
        <meta name="app" content="Portafolio"/>
        {!performanceMode && <Mouse />}
        {/* Router */}
        <ScrollToHash/>
        <Routes>
          <Route path="/" element={<RootLayout performanceMode={performanceMode} onTogglePerformance={() => setPerformanceMode((current) => !current)} />} />
          <Route path="/projects" element={<ProjectsInfo />} />
          <Route path="/all-projects" element={<AllProjects />} />
        </Routes>
      </div>
    </>
  )
}

export default App
