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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.65,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 0.9,
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
