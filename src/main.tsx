import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

function preloadImage(url: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
}

import heroBg from './assets/hero-bg.jpg';
import wavingHand from './assets/waving-hand.png';
import signature from './assets/signature.png';
preloadImage(heroBg);
preloadImage(wavingHand);
preloadImage(signature);

async function bootstrap() {
  try {
    await (document.fonts?.ready || Promise.resolve());
  } catch {
    // no-op
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
