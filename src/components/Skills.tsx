import React from 'react';
import { Shield, Server, Code, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Shield,
      title: 'Cybersecurity',
      skills: [
        { name: 'Threat Hunting', level: 90 },
        { name: 'SIEM Analysis', level: 85 },
        { name: 'Penetration Testing', level: 80 },
        { name: 'Incident Response', level: 88 },
        { name: 'Vulnerability Assessment', level: 85 }
      ]
    },
    {
      icon: Code,
      title: 'DevOps & Automation',
      skills: [
        { name: 'Docker & Kubernetes', level: 85 },
        { name: 'CI/CD Pipelines', level: 90 },
        { name: 'Infrastructure as Code', level: 80 },
        { name: 'Cloud Security (AWS/Azure)', level: 75 },
        { name: 'Monitoring & Alerting', level: 85 }
      ]
    },
    {
      icon: Server,
      title: 'System Administration',
      skills: [
        { name: 'Linux Administration', level: 90 },
        { name: 'Windows Server/AD', level: 85 },
        { name: 'Network Security', level: 88 },
        { name: 'Virtualization', level: 80 },
        { name: 'Backup & Recovery', level: 85 }
      ]
    },
    {
      icon: Wrench,
      title: 'Tools & Technologies',
      skills: [
        { name: 'Python/Bash Scripting', level: 85 },
        { name: 'Splunk/ELK Stack', level: 80 },
        { name: 'Nmap/Wireshark', level: 88 },
        { name: 'Metasploit/Burp Suite', level: 75 },
        { name: 'Git/Version Control', level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
            {'> skills_matrix'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Technical expertise across cybersecurity, DevOps, and system administration domains
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <category.icon className="w-8 h-8 text-primary mr-4" />
                  <h3 className="text-2xl font-bold font-mono text-foreground">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-mono">{skill.name}</span>
                        <span className="text-primary font-mono text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-card border border-primary/20 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold font-mono text-primary mb-4">{'> key_tools'}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Nmap', 'Splunk',
                  'ELK Stack', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible',
                  'Python', 'Bash', 'PowerShell', 'Git', 'AWS', 'Azure', 'Active Directory'
                ].map((tool, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;