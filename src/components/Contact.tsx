import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (in a real app, you'd handle this properly)
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="py-20 bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
            {'> contact'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Ready to collaborate on cybersecurity projects or discuss security solutions? Let's connect.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h3 className="text-2xl font-bold font-mono text-foreground mb-6">{'> get_in_touch'}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-primary mr-4" />
                    <div>
                      <div className="text-muted-foreground font-mono text-sm">Email</div>
                      <div className="text-foreground font-mono">mohanish.k@cybersec.dev</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-primary mr-4" />
                    <div>
                      <div className="text-muted-foreground font-mono text-sm">Phone</div>
                      <div className="text-foreground font-mono">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-primary mr-4" />
                    <div>
                      <div className="text-muted-foreground font-mono text-sm">Location</div>
                      <div className="text-foreground font-mono">Remote / Global</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold font-mono text-foreground mb-4">{'> social_links'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </div>
              </div>

              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold font-mono text-foreground mb-4">{'> download_cv'}</h3>
                <p className="text-muted-foreground font-mono text-sm mb-4">
                  Get a detailed overview of my experience and qualifications
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold rounded transition-all duration-300">
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="text-2xl font-bold font-mono text-foreground mb-6">{'> send_message'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-muted-foreground font-mono text-sm mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-muted-foreground font-mono text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none"
                    placeholder="your.email@domain.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-muted-foreground font-mono text-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none resize-none"
                    placeholder="Describe your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-muted text-primary-foreground font-mono font-bold rounded transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-primary font-mono text-sm mb-2">{'> response_time'}</div>
                <p className="text-muted-foreground font-mono text-xs">
                  I typically respond within 24 hours. For urgent security matters, please call directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;