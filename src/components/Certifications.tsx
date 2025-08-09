import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Red_Hat_Logo_2019.svg/920px-Red_Hat_Logo_2019.svg.png',
      name: 'Red Hat Certified System Administrator',
      issuer: 'Red Hat',
      year: '2025',
      status: 'Active',
      category: 'Security',
      verifyLink: 'https://rhtapps.redhat.com/verify?certId=250-100-229',
      downloadLink: 'https://www.credly.com/badges/9b57150a-2294-460c-8f1e-c76b38f34851/'
    },
    {
      logo: 'https://partners.comptia.org/docs/default-source/resources/securityplus-logo.png',
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      year: '2023',
      status: 'In Progress',
      category: 'Security',
      verifyLink: 'https://www.credly.com/badges/security-plus',
      downloadLink: 'https://www.comptia.org/certifications/security'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png',
      name: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      year: '2023',
      status: 'In Progress',
      category: 'Security',
      verifyLink: 'https://aspen.eccouncil.org/VerifyBadge',
      downloadLink: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2022',
      status: 'In Progress',
      category: 'Cloud',
      verifyLink: 'https://www.credly.com/badges/aws-solutions-architect',
      downloadLink: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png',
      name: 'CompTIA Linux+',
      issuer: 'CompTIA',
      year: '2022',
      status: 'In Progress',
      category: 'Systems',
      verifyLink: 'https://www.credly.com/badges/linux-plus',
      downloadLink: 'https://www.comptia.org/certifications/linux'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
      name: 'Docker Certified Associate',
      issuer: 'Docker',
      year: '2022',
      status: 'In Progress',
      category: 'DevOps',
      verifyLink: 'https://credentials.docker.com/verify',
      downloadLink: 'https://www.docker.com/certification'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/9ba1e4d9-299e-47ac-b2c9-161212998e91/image.png',
      name: 'CISSP (In Progress)',
      issuer: 'ISC²',
      year: '2024',
      status: 'In Progress',
      category: 'Security',
      verifyLink: null,
      downloadLink: 'https://www.isc2.org/Certifications/CISSP'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-security-engineer-associate-600x600.png',
      name: 'Azure Security Engineer',
      issuer: 'Microsoft',
      year: '2023',
      status: 'In Progress',
      category: 'Cloud',
      verifyLink: 'https://docs.microsoft.com/en-us/learn/certifications/azure-security-engineer',
      downloadLink: 'https://docs.microsoft.com/en-us/learn/certifications/azure-security-engineer'
    },
    {
      logo: 'https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
      name: 'Kubernetes Administrator',
      issuer: 'CNCF',
      year: '2023',
      status: 'In Progress',
      category: 'DevOps',
      verifyLink: 'https://www.credly.com/badges/kubernetes-administrator',
      downloadLink: 'https://www.cncf.io/certification/cka/'
    }
  ];

  const categories = {
    Security: { color: 'primary', count: 0 },
    Cloud: { color: 'blue-500', count: 0 },
    Systems: { color: 'green-500', count: 0 },
    DevOps: { color: 'yellow-500', count: 0 }
  };

  // Count certifications by category
  certifications.forEach(cert => {
    if (categories[cert.category as keyof typeof categories]) {
      categories[cert.category as keyof typeof categories].count++;
    }
  });

  return (
    <section id="certifications" className="py-20 bg-muted/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4" id="certifications-heading">
            {'> certifications'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Professional certifications demonstrating expertise across cybersecurity, cloud, and DevOps domains
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(categories).map(([category, { color, count }]) => (
              <div key={category} className="bg-card border border-primary/20 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold font-mono mb-2 ${
                  color === 'primary' ? 'text-primary' :
                  color === 'blue-500' ? 'text-blue-500' :
                  color === 'green-500' ? 'text-green-500' :
                  'text-yellow-500'
                }`}>
                  {count}
                </div>
                <div className="text-muted-foreground font-mono text-sm">{category}</div>
              </div>
            ))}
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <img 
                    src={cert.logo} 
                    alt={`${cert.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      cert.status === 'Active' 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {cert.status}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {cert.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors duration-300" id={`cert-${cert.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}>
                  {cert.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-mono text-sm">Issuer:</span>
                    <span className="text-muted-foreground font-mono text-sm">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-mono text-sm">Year:</span>
                    <span className="text-muted-foreground font-mono text-sm">{cert.year}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {cert.verifyLink && (
                    <a 
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-primary hover:bg-primary/80 text-primary-foreground font-mono text-xs rounded transition-colors duration-300 text-center"
                    >
                      Verify
                    </a>
                  )}
                  <a 
                    href={cert.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground font-mono text-xs rounded transition-colors duration-300 text-center"
                  >
                    Info
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-card border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-primary font-mono mb-4">{'> continuous_learning'}</div>
              <p className="text-muted-foreground font-mono text-sm mb-4">
                Currently pursuing advanced certifications in cloud security and threat intelligence
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['CISSP', 'GSEC', 'AWS Security Specialty', 'SANS GIAC'].map((cert, index) => (
                  <span 
                    key={index}
                    className="text-xs font-mono px-3 py-1 bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 rounded"
                  >
                    {cert} (Planned)
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

export default Certifications;