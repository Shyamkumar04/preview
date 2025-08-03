import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Terminal, Instagram, Twitter } from 'lucide-react';
import { trackDownload, trackContact } from '../utils/analytics';

interface HeroProps {
  showProfilePicture?: boolean;
  profileImageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  showProfilePicture = false, 
  profileImageUrl = 'https://mohanish.in/Mohanish.jpg' 
}) => {
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
    trackDownload('Mohanish-Resume.pdf');
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

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-7xl mx-auto ${showProfilePicture ? '' : 'text-center'}`}>
          <div className={`grid ${showProfilePicture ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
            
            {/* Content Section */}
            <div className={`${showProfilePicture ? 'lg:text-left text-center' : 'text-center mx-auto max-w-4xl'}`}>
              <div className="mb-8">
                <Terminal className={`w-16 h-16 text-primary ${showProfilePicture ? 'lg:mx-0 mx-auto' : 'mx-auto'} mb-4 animate-pulse`} />
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 font-mono">
                  <span className="text-foreground">MOHANISH</span>
                  <span className="text-primary ml-2 md:ml-4">K</span>
                </h1>
              </div>

              <div className="mb-8">
                <div className="text-xl md:text-2xl lg:text-3xl font-mono text-muted-foreground mb-2">
                  {'> I am a'}
                </div>
                <div className={`text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-mono h-12 md:h-16 flex items-center ${showProfilePicture ? 'lg:justify-start justify-center' : 'justify-center'}`}>
                  {displayText}
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </div>

              <div className="mb-12 max-w-2xl">
                <p className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed">
                  Securing digital landscapes, automating infrastructure, and protecting against cyber threats. 
                  Passionate about ethical hacking and building resilient systems.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 ${showProfilePicture ? 'lg:justify-start justify-center' : 'justify-center'} items-center mb-8`}>
                <button 
                  onClick={handleDownloadCV}
                  className="px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold rounded border-2 border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
                >
                  <Download className="w-4 md:w-5 h-4 md:h-5" />
                  Download CV
                </button>
                
                <div className="flex gap-3 md:gap-4">
                  <button 
                    onClick={() => handleSocialClick('github', 'https://github.com/Mohanish7777777')}
                    className="p-2 md:p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
                  >
                    <Github className="w-5 md:w-6 h-5 md:h-6" />
                  </button>
                  <button 
                    onClick={() => handleSocialClick('linkedin', 'https://linkedin.com/in/mohanish7777777')}
                    className="p-2 md:p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
                  >
                    <Linkedin className="w-5 md:w-6 h-5 md:h-6" />
                  </button>
                  <button 
                    onClick={() => handleSocialClick('instagram', 'https://instagram.com/_mohanish_cybersec')}
                    className="p-2 md:p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
                  >
                    <Instagram className="w-5 md:w-6 h-5 md:h-6" />
                  </button>
                  <button 
                    onClick={() => handleSocialClick('twitter', 'https://x.com/MohanishK3')}
                    className="p-2 md:p-3 border-2 border-muted hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300 rounded"
                  >
                    <Twitter className="w-5 md:w-6 h-5 md:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Picture Section - Only shown when showProfilePicture is true */}
            {showProfilePicture && (
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Geometric background decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  
                  {/* Main profile image container */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-2xl">
                    <img 
                      src={profileImageUrl} 
                      alt="Mohanish K - Cybersecurity Professional"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay with geometric pattern */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Floating geometric elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/4 -left-6 w-4 h-4 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Status indicator */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-foreground">Available</span>
                  </div>
                </div>
              </div>
            )}
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