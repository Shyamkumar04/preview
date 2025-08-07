import React, { useState } from 'react';
import { usePageTracking } from './hooks/usePageTracking';
import { ThemeProvider } from './contexts/ThemeContext';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';
import Terminal from './components/Terminal';
import TerminalIcon from './components/TerminalIcon';
import DeviceInfoWidget from './components/DeviceInfoWidget';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  // Track page visits and user behavior
  usePageTracking();
  
  // Check if current path should show 404
  const currentPath = window.location.pathname;
  const validPaths = ['/', '/index.html'];
  const shouldShow404 = !validPaths.includes(currentPath) && currentPath !== '/';
  
  // Configuration for Hero section
  const showProfilePicture = true; // Set to true to show profile picture
  const profileImageUrl = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800'; // Custom profile image URL

  // Show 404 page for invalid routes
  if (shouldShow404) {
    return (
      <ThemeProvider>
        <div className="bg-background text-foreground overflow-x-hidden relative min-h-screen transition-colors duration-300">
          <MatrixBackground />
          <NotFound />
          <DeviceInfoWidget />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground overflow-x-hidden relative min-h-screen transition-colors duration-300">
        <MatrixBackground />
        <div className="relative z-10">
          <Navbar />
          <Hero 
            showProfilePicture={showProfilePicture}
            profileImageUrl={profileImageUrl}
          />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
          <Footer />
        </div>
        <TerminalIcon onClick={() => setIsTerminalOpen(true)} />
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        <DeviceInfoWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;