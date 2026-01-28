import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import heroBg from './assets/hero-bg.jpg';
import wavingHand from './assets/waving-hand.png';
import signature from './assets/signature.png';

async function preloadImage(url: string) {
  return new Promise<void>(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}

async function bootstrap() {
  try {
    await Promise.all([
      document.fonts?.ready || Promise.resolve(),
      preloadImage(heroBg),
      preloadImage(wavingHand),
      preloadImage(signature),
    ]);
  } catch (e) {}

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
