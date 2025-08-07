import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, Instagram, Twitter, Bell } from 'lucide-react';
import Newsletter from './Newsletter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

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
    
    try {
      // Prepare payload for webhook
      const payload = {
        name: formData.name,
        mail: formData.email,  // Note: Using 'mail' as required by the webhook
        message: formData.message
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin', 'https://mohanish.in');

      // Send data to webhook
      const response = await fetch(
        'https://mohanishx-n8n.koyeb.app/webhook/f6b5ef8c-0bb1-4b86-8d39-a8c02e6407c0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error sending message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4" id="contact-heading">
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
                <h3 className="text-2xl font-bold font-mono text-foreground mb-6" id="contact-info">{'> get_in_touch'}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-primary mr-4" />
                    <div>
                      <div className="text-muted-foreground font-mono text-sm">Email</div>
                      <div className="text-foreground font-mono">mohanish@mohanish.in</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-primary mr-4" />
                    <div>
                      <div className="text-muted-foreground font-mono text-sm">Phone</div>
                      <div className="text-foreground font-mono">+91-7904707229</div>
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
                <h3 className="text-xl font-bold font-mono text-foreground mb-4" id="social-links">{'> social_links'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/Mohanish7777777" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mohanish7777777/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.instagram.com/_mohanish_cybersec/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border hover:border-primary text-muted-foreground hover:text-primary rounded font-mono text-sm transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                  <a 
                    href="https://x.com/MohanishK3" 
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
                <h3 className="text-xl font-bold font-mono text-foreground mb-4" id="resources">{'> resources'}</h3>
                <p className="text-muted-foreground font-mono text-sm mb-4">
                  Download resume or subscribe to newsletter for updates
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://mohanish.in/Mohanish-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold rounded transition-all duration-300 justify-center"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                  <button 
                    onClick={() => setIsNewsletterOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono font-bold rounded transition-all duration-300 justify-center"
                  >
                    <Bell className="w-4 h-4" />
                    Subscribe Newsletter
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="text-2xl font-bold font-mono text-foreground mb-6" id="contact-form">{'> send_message'}</h3>
              
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
      
      {/* Newsletter Modal */}
      <Newsletter isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </section>
  );
};

export default Contact;