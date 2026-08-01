import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { startScrollActivity } from '@/lib/scrollActivity';

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Corrige la posición antes de que Lenis, Framer o cualquier lazy component
// mida el documento. Los hashes explícitos conservan su navegación normal.
if (window.location.pathname === "/" && !window.location.hash) {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

startScrollActivity();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
