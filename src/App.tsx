import './App.css'
import ScrollToHash from '@/components/Hash.tsx'
import Mouse from '@/components/Mouse.tsx'
import Lenis from '@studio-freight/lenis';
import { useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import RootLayout from '@/pages/RootLayout';
import ProjectsInfo from '@/pages/Projects/modal/Projects-info';
import AllProjects from '@/pages/Projects/AllProjects';

function App() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
  });
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
        <meta name="app" content="Portafolio"/>
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