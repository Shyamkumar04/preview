import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Cybersecurity Intern',
      company: 'Ladera Technology',
      location: 'Remote',
      period: 'June 2024 - August 2024',
      type: 'Internship',
      logo: '',
      responsibilities: [
        'Assisted in threat analysis and vulnerability assessments',
        'Learned SIEM tools and security monitoring techniques',
        'Participated in incident response procedures and documentation',
        'Gained hands-on experience with penetration testing tools'
      ]
    },
    {
      title: 'Virtual Cybersecurity Intern',
      company: 'Deloitte',
      location: 'Virtual',
      period: 'July 2024 - July 2024',
      type: 'Virtual Internship',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_Deloitte.svg',
      responsibilities: [
        'Completed virtual cybersecurity training modules',
        'Learned about enterprise security frameworks and compliance',
        'Studied cloud security best practices and implementation',
        'Developed understanding of security operations center (SOC) workflows'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
            {'> experience'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Professional journey through cybersecurity internships and learning experiences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/30"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-12 md:ml-0`}>
                  <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        exp.type === 'Internship' 
                          ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                          : 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                      }`}>
                        {exp.type}
                      </span>
                      <div className="flex items-center text-muted-foreground text-sm font-mono">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-mono text-foreground mb-2">{exp.title}</h3>
                    
                    <div className="flex items-center text-primary font-mono mb-2">
                      <div className="flex items-center">
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="w-6 h-6 mr-3 object-contain bg-white rounded p-1"
                        />
                        <Briefcase className="w-4 h-4 mr-2" />
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex items-center text-muted-foreground font-mono text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>

                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-primary mr-2 font-mono">{'>'}</span>
                          <span className="font-mono">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-card border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-primary font-mono mb-4">{'> learning_highlights'}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground font-mono mb-2">100+</div>
                  <div className="text-muted-foreground font-mono text-sm">Hours of Training</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground font-mono mb-2">15+</div>
                  <div className="text-muted-foreground font-mono text-sm">Security Tools Learned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground font-mono mb-2">5+</div>
                  <div className="text-muted-foreground font-mono text-sm">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;