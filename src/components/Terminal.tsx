import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { trackTerminalCommand, trackThemeChange } from '../utils/analytics';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: string;
  timestamp: string;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const portfolioData = {
    home: `
╔══════════════════════════════════════════════════════════════╗
║                        MOHANISH K                            ║
║                 Cybersecurity Analyst                       ║
║                   DevOps Engineer                           ║
║                System Administrator                         ║
╚══════════════════════════════════════════════════════════════╝

> Securing digital landscapes and automating infrastructure
> Passionate about ethical hacking and building resilient systems
> Location: Remote / Global
> Status: Available for freelance projects
    `,
    about: `
╔══════════════════════════════════════════════════════════════╗
║                        ABOUT ME                              ║
╚══════════════════════════════════════════════════════════════╝

> whoami
Cybersecurity professional with expertise in threat hunting,
incident response, DevOps automation, and system administration.

> mission
Bridge the gap between security and operations, creating resilient
systems that defend against evolving threats while enabling
business innovation.

> experience: 2+ years
> projects: 15+ completed
> certifications: 8+ active
    `,
    skills: `
╔══════════════════════════════════════════════════════════════╗
║                        SKILLS                                ║
╚══════════════════════════════════════════════════════════════╝

🛡️  CYBERSECURITY
    ├── Threat Hunting ████████████████████ 90%
    ├── SIEM Analysis ████████████████████ 85%
    ├── Penetration Testing ████████████████ 80%
    ├── Incident Response ██████████████████ 88%
    └── Vulnerability Assessment ████████████████ 85%

⚙️  DEVOPS & AUTOMATION
    ├── Docker & Kubernetes ████████████████████ 85%
    ├── CI/CD Pipelines ████████████████████ 90%
    ├── Infrastructure as Code ████████████████ 80%
    ├── Cloud Security (AWS/Azure) ██████████████ 75%
    └── Monitoring & Alerting ████████████████████ 85%

🖥️  SYSTEM ADMINISTRATION
    ├── Linux Administration ████████████████████ 90%
    ├── Windows Server/AD ████████████████████ 85%
    ├── Network Security ██████████████████ 88%
    ├── Virtualization ████████████████ 80%
    └── Backup & Recovery ████████████████████ 85%
    `,
    projects: `
╔══════════════════════════════════════════════════════════════╗
║                       PROJECTS                               ║
╚══════════════════════════════════════════════════════════════╝

🏠 Home Lab Infrastructure
   Technologies: Proxmox, Docker, Kubernetes, pfSense, ELK Stack
   Status: Active

🔒 Penetration Testing Framework
   Technologies: Python, Nmap, Metasploit, Custom APIs
   Status: Production Ready

📊 SOC Dashboard
   Technologies: Elasticsearch, Logstash, Kibana, Beats, Python
   Status: Live Demo Available

🔧 Secure CI/CD Pipeline
   Technologies: Jenkins, Docker, OWASP ZAP, SonarQube, AWS
   Status: Enterprise Ready

🛡️ Network Hardening Scripts
   Technologies: Bash, Python, Ansible, NIST Framework
   Status: Open Source

🎯 Threat Intelligence Platform
   Technologies: Python, Redis, PostgreSQL, STIX/TAXII
   Status: Beta Testing
    `,
    experience: `
╔══════════════════════════════════════════════════════════════╗
║                      EXPERIENCE                              ║
╚══════════════════════════════════════════════════════════════╝

📍 Cybersecurity Intern | Ladera Technology
   Duration: June 2024 - August 2024
   Location: Remote
   
   > Assisted in threat analysis and vulnerability assessments
   > Learned SIEM tools and security monitoring techniques
   > Participated in incident response procedures
   > Gained hands-on experience with penetration testing tools

📍 Virtual Cybersecurity Intern | HCL Technologies
   Duration: March 2024 - May 2024
   Location: Virtual
   
   > Completed virtual cybersecurity training modules
   > Learned enterprise security frameworks and compliance
   > Studied cloud security best practices
   > Developed SOC workflow understanding
    `,
    certifications: `
╔══════════════════════════════════════════════════════════════╗
║                   CERTIFICATIONS                             ║
╚══════════════════════════════════════════════════════════════╝

🏆 ACTIVE CERTIFICATIONS:
    ├── CompTIA Security+ (2023)
    ├── Certified Ethical Hacker - CEH (2023)
    ├── AWS Solutions Architect (2022)
    ├── CompTIA Linux+ (2022)
    ├── Docker Certified Associate (2022)
    ├── Azure Security Engineer (2023)
    └── Kubernetes Administrator - CKA (2023)

🎯 IN PROGRESS:
    └── CISSP (2024)

📚 PLANNED:
    ├── GSEC
    ├── AWS Security Specialty
    └── SANS GIAC
    `,
    contact: `
╔══════════════════════════════════════════════════════════════╗
║                       CONTACT                                ║
╚══════════════════════════════════════════════════════════════╝

📧 Email: mohanish.k@cybersec.dev
📱 Phone: +1 (555) 123-4567
🌍 Location: Remote / Global
⏰ Response Time: Within 24 hours

🔗 SOCIAL LINKS:
    ├── GitHub: github.com/mohanishk
    ├── LinkedIn: linkedin.com/in/mohanishk
    ├── Instagram: @mohanishk_cyber
    └── Twitter: @mohanishk_sec

💼 Available for:
    ├── Cybersecurity Consulting
    ├── Penetration Testing
    ├── DevOps Implementation
    └── Security Audits
    `
  };

  const commands = {
    help: `
╔══════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                        ║
╚══════════════════════════════════════════════════════════════╝

📋 CORE COMMANDS:
    ├── get_Home           → Display Home section
    ├── get_About          → Display About section  
    ├── get_Skills         → Display Skills list
    ├── get_Projects       → Display Projects
    ├── get_Experience     → Show Experience details
    ├── get_Certification  → Show certifications
    ├── get_Contact        → Show contact info
    ├── clear              → Clear terminal output
    ├── help               → Show this help menu
    └── exit               → Close terminal

🎉 FUN COMMANDS:
    ├── sudo get_Coffee    → Get virtual coffee
    ├── theme_dark         → Switch to dark mode
    ├── theme_light        → Switch to light mode
    ├── play_sound         → Toggle typing sounds
    └── version            → Show portfolio version

💡 TIP: Use arrow keys to navigate command history
    `,
    version: `
Portfolio Terminal v2.0.1
Built with React + TypeScript
Last Updated: January 2025
Theme Engine: Advanced
Security Level: Maximum
Analytics: Google Analytics 4
SEO Optimized: Yes
    `
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const loadingSequence = [
        'Loading portfolio engine...',
        'Initializing security modules...',
        'Connecting to visitor@portfolio...',
        'Terminal ready!'
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < loadingSequence.length) {
          setHistory(prev => [...prev, {
            command: '',
            output: loadingSequence[index],
            timestamp: new Date().toLocaleTimeString()
          }]);
          index++;
        } else {
          setIsLoading(false);
          clearInterval(interval);
          setHistory(prev => [...prev, {
            command: '',
            output: 'Type "help" to see available commands.',
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const playTypingSound = () => {
    if (soundEnabled) {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    // Track command usage
    trackTerminalCommand(command);
    playTypingSound();

    switch (command) {
      case 'get_home':
        output = portfolioData.home;
        break;
      case 'get_about':
        output = portfolioData.about;
        break;
      case 'get_skills':
        output = portfolioData.skills;
        break;
      case 'get_projects':
        output = portfolioData.projects;
        break;
      case 'get_experience':
        output = portfolioData.experience;
        break;
      case 'get_certification':
        output = portfolioData.certifications;
        break;
      case 'get_contact':
        output = portfolioData.contact;
        break;
      case 'help':
        output = commands.help;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case 'sudo get_coffee':
        output = '☕ Here\'s your virtual coffee! *brewing sounds* Enjoy your caffeine boost!';
        break;
      case 'theme_dark':
        setTheme('dark');
        trackThemeChange('dark');
        output = '🌙 Switched to dark mode. Welcome to the dark side!';
        break;
      case 'theme_light':
        setTheme('light');
        trackThemeChange('light');
        output = '☀️ Switched to light mode. Let there be light!';
        break;
      case 'play_sound':
        setSoundEnabled(!soundEnabled);
        output = `🔊 Typing sounds ${!soundEnabled ? 'enabled' : 'disabled'}.`;
        break;
      case 'version':
        output = commands.version;
        break;
      case '':
        return;
      default:
        output = `Command not found: ${cmd}\nType "help" to see available commands.`;
    }

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-4xl h-3/4 bg-black border border-green-500 rounded-lg shadow-2xl flex flex-col ${isMinimized ? 'h-12' : ''} transition-all duration-300`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-green-500 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-mono text-sm ml-4">visitor@portfolio:~</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-green-400 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Terminal Output */}
            <div 
              ref={outputRef}
              className="flex-1 p-4 overflow-y-auto bg-black text-green-400 font-mono text-sm"
            >
              {history.map((entry, index) => (
                <div key={index} className="mb-2">
                  {entry.command && (
                    <div className="text-green-300">
                      <span className="text-green-500">visitor@portfolio:~$</span> {entry.command}
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap text-green-400">{entry.output}</pre>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center">
                  <span className="animate-pulse">Loading</span>
                  <span className="animate-bounce ml-1">.</span>
                  <span className="animate-bounce ml-1" style={{ animationDelay: '0.1s' }}>.</span>
                  <span className="animate-bounce ml-1" style={{ animationDelay: '0.2s' }}>.</span>
                </div>
              )}
            </div>

            {/* Terminal Input */}
            {!isLoading && (
              <form onSubmit={handleSubmit} className="border-t border-green-500 p-4 bg-black">
                <div className="flex items-center">
                  <span className="text-green-500 font-mono mr-2">visitor@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-green-400 font-mono outline-none"
                    placeholder="Type a command..."
                    autoComplete="off"
                  />
                  <span className="text-green-400 animate-pulse">|</span>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;