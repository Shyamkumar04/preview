import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
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
  
  // Configuration for Hero section
  const showProfilePicture = false; // Set to true to show profile picture
  const profileImageUrl = 'https://mohanish.in/Mohanish.jpg'; // Custom profile image URL

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