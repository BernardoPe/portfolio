import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/HeroSection';

const AboutSection = lazy(() => import('./components/AboutSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const EducationSection = lazy(() => import('./components/EducationSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const ChatSection = lazy(() => import('./components/ChatSection'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const path = window.location.pathname;

  if (path !== '/' && path !== '/r') {
    return (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <MainApp />
    </Suspense>
  );
}

function MainApp(): React.JSX.Element {
  return (
    <div className="bg-primary min-h-screen text-white">
      <Header />
      <HeroSection />
      <Suspense>
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <ChatSection />
        <ContactSection />
      </Suspense>
    </div>
  );
}

export default App;
