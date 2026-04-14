import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading.tsx';

const Navbar = lazy(() => import('@/components/Navbar'));
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Skills = lazy(() => import('@/pages/Skills'));
const Exp = lazy(() => import('@/pages/Exp'));
const Services = lazy(() => import('@/pages/Services'));
const Projects = lazy(() => import('@/pages/Projects/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

export default function RootLayout() {
  return (
    <div className="min-h-screen w-full text-white app-gradient">
      {/* One Page Style */}
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Exp />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}