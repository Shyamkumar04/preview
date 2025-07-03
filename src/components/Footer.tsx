import React from 'react';
import { Terminal, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/80 border-t border-primary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Terminal className="w-5 h-5 text-primary mr-2" />
            <span className="text-muted-foreground font-mono text-sm">
              {'> Designed and developed by '}
              <span className="text-primary font-bold">Mohanish K</span>
            </span>
          </div>

          <div className="flex items-center text-muted-foreground font-mono text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary mx-2 animate-pulse" />
            <span>for cybersecurity excellence</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-muted-foreground font-mono text-xs mb-2">
              {'> system_status: SECURE | uptime: 99.9% | last_updated: 2024'}
            </div>
            <div className="text-muted-foreground font-mono text-xs">
              © 2025 Mohanish K. All rights reserved. | Powered by React & Tailwind CSS
            </div>
          </div>
        </div>

        {/* Terminal-style copyright */}
        <div className="mt-4 text-center">
          <div className="bg-card border border-border rounded px-4 py-2 inline-block">
            <span className="text-green-500 font-mono text-xs">root@cybersec:~$</span>
            <span className="text-muted-foreground font-mono text-xs ml-2">
              echo "Cybersecurity isn't just my career—it's how I think." | cowsay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;