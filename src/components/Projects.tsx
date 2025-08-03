import React from 'react';
import { ExternalLink, Github, Shield, Server, Lock, Activity } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      icon: Shield,
      title: 'Home Lab Infrastructure',
      description: 'Complete cybersecurity lab environment with Proxmox virtualization, Docker containers, and Kubernetes cluster for testing security tools and techniques.',
      technologies: ['Proxmox', 'Docker', 'Kubernetes', 'pfSense', 'ELK Stack'],
      github: 'https://github.com/mohanishk/homelab-infrastructure',
      demo: null,
      category: 'Infrastructure'
    },
    {
      icon: Lock,
      title: 'Penetration Testing Framework',
      description: 'Automated penetration testing framework with custom Python scripts for reconnaissance, vulnerability scanning, and exploitation reporting.',
      technologies: ['Python', 'Nmap', 'Metasploit', 'Custom APIs', 'HTML Reports'],
      github: 'https://github.com/mohanishk/pentest-framework',
      demo: 'https://pentest-demo.mohanishk.dev',
      category: 'Security'
    },
    {
      icon: Activity,
      title: 'SOC Dashboard',
      description: 'Real-time security operations center dashboard using Elastic Stack for log aggregation, threat detection, and incident visualization.',
      technologies: ['Elasticsearch', 'Logstash', 'Kibana', 'Beats', 'Python'],
      github: null,
      demo: 'https://soc-dashboard.mohanishk.dev',
      category: 'Monitoring'
    },
    {
      icon: Server,
      title: 'Secure CI/CD Pipeline',
      description: 'DevSecOps pipeline implementation with automated security scanning, container vulnerability assessment, and compliance reporting.',
      technologies: ['Jenkins', 'Docker', 'OWASP ZAP', 'SonarQube', 'AWS'],
      github: 'https://github.com/mohanishk/secure-cicd',
      demo: null,
      category: 'DevOps'
    },
    {
      icon: Shield,
      title: 'Network Hardening Scripts',
      description: 'Collection of automated scripts for network device hardening, compliance checking, and security baseline enforcement.',
      technologies: ['Bash', 'Python', 'Ansible', 'NIST Framework', 'CIS Controls'],
      github: 'https://github.com/mohanishk/network-hardening',
      demo: null,
      category: 'Automation'
    },
    {
      icon: Lock,
      title: 'Threat Intelligence Platform',
      description: 'Custom threat intelligence aggregation platform that collects, analyzes, and correlates IOCs from multiple feeds for proactive defense.',
      technologies: ['Python', 'Redis', 'PostgreSQL', 'STIX/TAXII', 'REST APIs'],
      github: 'https://github.com/mohanishk/threat-intel-platform',
      demo: 'https://threat-intel.mohanishk.dev',
      category: 'Intelligence'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
            {'> projects'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            A showcase of cybersecurity, DevOps, and infrastructure projects demonstrating practical skills and real-world applications
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-card border border-primary/20 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <project.icon className="w-8 h-8 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-mono text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded font-mono text-sm transition-colors duration-300 border border-border hover:border-primary"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded font-mono text-sm transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {!project.github && !project.demo && (
                      <span className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded font-mono text-sm cursor-not-allowed">
                        Private Project
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-card border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-primary font-mono mb-4">{'> more_projects'}</div>
              <p className="text-muted-foreground font-mono text-sm mb-4">
                Additional projects and contributions available on GitHub
              </p>
              <a 
                href="https://github.com/Mohanish7777777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono font-bold rounded transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;