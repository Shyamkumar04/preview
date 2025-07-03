import React from 'react';
import { User, Shield, Code, Server } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
            {'> about_me'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-card border border-primary/20 rounded-lg p-6 font-mono">
                <div className="text-primary mb-2">{'> whoami'}</div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a passionate cybersecurity professional with expertise spanning multiple domains - 
                  from threat hunting and incident response to DevOps automation and system administration. 
                  My journey began with a curiosity about how systems work and evolved into a mission to 
                  protect digital infrastructure.
                </p>
                
                <div className="text-primary mb-2">{'> current_focus'}</div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Currently focused on advanced persistent threat detection, cloud security architecture, 
                  and building automated security pipelines. I believe in the power of automation to 
                  enhance security operations while maintaining the human insight necessary for complex 
                  threat analysis.
                </p>

                <div className="text-primary mb-2">{'> mission'}</div>
                <p className="text-muted-foreground leading-relaxed">
                  To bridge the gap between security and operations, creating resilient systems that 
                  can defend against evolving threats while enabling business innovation.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-300">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground font-mono font-bold mb-2">Security</h3>
                  <p className="text-muted-foreground font-mono text-sm">Threat Detection & Response</p>
                </div>

                <div className="bg-card border border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-300">
                  <Code className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground font-mono font-bold mb-2">DevOps</h3>
                  <p className="text-muted-foreground font-mono text-sm">CI/CD & Automation</p>
                </div>

                <div className="bg-card border border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-300">
                  <Server className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground font-mono font-bold mb-2">SysAdmin</h3>
                  <p className="text-muted-foreground font-mono text-sm">Infrastructure & Networks</p>
                </div>

                <div className="bg-card border border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-300">
                  <User className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground font-mono font-bold mb-2">Consultant</h3>
                  <p className="text-muted-foreground font-mono text-sm">Independent & Freelance</p>
                </div>
              </div>

              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <div className="text-primary font-mono mb-4">{'> quick_stats'}</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground font-mono">2+</div>
                    <div className="text-muted-foreground font-mono text-sm">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground font-mono">15+</div>
                    <div className="text-muted-foreground font-mono text-sm">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground font-mono">8+</div>
                    <div className="text-muted-foreground font-mono text-sm">Certifications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;