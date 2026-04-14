import './App.css'
import Stars from '@/components/Stars.tsx';
import Fog from '@/components/Fog.tsx'
import ScrollToHash from '@/components/Hash.tsx'
import Mouse from '@/components/Mouse.tsx'
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import RootLayout from '@/pages/RootLayout';
import ProjectsInfo from '@/pages/Projects/modal/Projects-info';
import AllProjects from '@/pages/Projects/AllProjects';

function App() {
  const [isAllProjects, setIsAllProjects] = useState(false);
  const location = useLocation();
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
  });
  useEffect(() => {
    setIsAllProjects(location.pathname === "/all-projects" || location.pathname === "/projects");
  }, [location.pathname]);

  useEffect(() => {
    const raf = (time: number) =>  {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="min-h-screen w-full text-white app-gradient">
        {/* Global Effects */}
        {!isAllProjects && (
          <>
            <Stars />
            <Fog />
          </>
        )}
        <Mouse />
        {/* Router */}
        <ScrollToHash/>
        <Routes>
          <Route path="/" element={<RootLayout />} />
          <Route path="/projects" element={<ProjectsInfo />} />
          <Route path="/all-projects" element={<AllProjects />} />
        </Routes>
      </div>
    </>
  )
}

export default App