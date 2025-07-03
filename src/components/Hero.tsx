import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Terminal, Instagram, Twitter } from 'lucide-react';
import { trackDownload, trackContact } from '../utils/analytics';

const Hero = () => {
  const roles = [
    'Cybersecurity Learner',
    'DevOps Engineer', 
    'System Administrator',
    'Network Engineer',
    'SoC Learner',
    'Freelancer'
  ];

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole, roles]);

  const handleDownloadCV = () => {
    trackDownload('mohanish-k-cv.pdf');
    // Add actual download logic here
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackContact(platform);
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Theme-aware background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-muted/80 to-background/80"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Terminal className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 font-mono">
              <span className="text-foreground">MOHANISH</span>
              <span className="text-primary ml-4">K</span>
            </h1>
          </div>

          <div className="mb-8">
            <div className="text-2xl md:text-3xl font-mono text-muted-foreground mb-2">
              {'> I am a'}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary font-mono h-16 flex items-center justify-center">
              {displayText}
              <span className="animate-pulse ml-1">|</span>
            </div>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground font-mono leading-relaxed">
              Securing digital landscapes, automating infrastructure, and protecting against cyber threats. 
              Passionate about ethical hacking and building resilient systems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={handleDownloadCV}
              className="px-8 py-4 bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold rounded border-2 border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </button>
            
            <div className="flex gap-4">
              <button 
                onClick={() => handleSocialClick('github', 'https://github.com')}
                className="p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
              >
                <Github className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin', 'https://linkedin.com')}
                className="p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
              >
                <Linkedin className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('instagram', 'https://instagram.com')}
                className="p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
              >
                <Instagram className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter', 'https://twitter.com')}
                className="p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
              >
                <Twitter className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;