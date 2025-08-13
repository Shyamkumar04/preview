import React, { useState } from 'react';
import { useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, Instagram, Twitter, Bell } from 'lucide-react';
import Newsletter from './Newsletter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Country code mapping
  const countryCodeMap: { [key: string]: string } = {
    'US': '+1', 'CA': '+1', 'GB': '+44', 'AU': '+61', 'DE': '+49', 'FR': '+33',
    'IT': '+39', 'ES': '+34', 'NL': '+31', 'BE': '+32', 'CH': '+41', 'AT': '+43',
    'SE': '+46', 'NO': '+47', 'DK': '+45', 'FI': '+358', 'IE': '+353', 'PT': '+351',
    'GR': '+30', 'PL': '+48', 'CZ': '+420', 'HU': '+36', 'RO': '+40', 'BG': '+359',
    'HR': '+385', 'SI': '+386', 'SK': '+421', 'LT': '+370', 'LV': '+371', 'EE': '+372',
    'IN': '+91', 'CN': '+86', 'JP': '+81', 'KR': '+82', 'SG': '+65', 'MY': '+60',
    'TH': '+66', 'VN': '+84', 'PH': '+63', 'ID': '+62', 'BD': '+880', 'PK': '+92',
    'LK': '+94', 'NP': '+977', 'MM': '+95', 'KH': '+855', 'LA': '+856', 'MN': '+976',
    'BR': '+55', 'AR': '+54', 'CL': '+56', 'CO': '+57', 'PE': '+51', 'VE': '+58',
    'UY': '+598', 'PY': '+595', 'BO': '+591', 'EC': '+593', 'GY': '+592', 'SR': '+597',
    'MX': '+52', 'GT': '+502', 'BZ': '+501', 'SV': '+503', 'HN': '+504', 'NI': '+505',
    'CR': '+506', 'PA': '+507', 'CU': '+53', 'JM': '+1876', 'HT': '+509', 'DO': '+1809',
    'ZA': '+27', 'NG': '+234', 'KE': '+254', 'GH': '+233', 'UG': '+256', 'TZ': '+255',
    'ZW': '+263', 'ZM': '+260', 'MW': '+265', 'MZ': '+258', 'BW': '+267', 'NA': '+264',
    'SZ': '+268', 'LS': '+266', 'MG': '+261', 'MU': '+230', 'SC': '+248', 'RE': '+262',
    'EG': '+20', 'MA': '+212', 'DZ': '+213', 'TN': '+216', 'LY': '+218', 'SD': '+249',
    'ET': '+251', 'SO': '+252', 'DJ': '+253', 'ER': '+291', 'SS': '+211', 'TD': '+235',
    'CF': '+236', 'CM': '+237', 'GQ': '+240', 'GA': '+241', 'CG': '+242', 'CD': '+243',
    'AO': '+244', 'ST': '+239', 'CV': '+238', 'GW': '+245', 'GN': '+224', 'SL': '+232',
    'LR': '+231', 'CI': '+225', 'BF': '+226', 'ML': '+223', 'NE': '+227', 'SN': '+221',
    'GM': '+220', 'GN': '+224', 'MR': '+222', 'RU': '+7', 'KZ': '+7', 'UZ': '+998',
    'TM': '+993', 'TJ': '+992', 'KG': '+996', 'AF': '+93', 'IR': '+98', 'IQ': '+964',
    'SY': '+963', 'LB': '+961', 'JO': '+962', 'IL': '+972', 'PS': '+970', 'SA': '+966',
    'YE': '+967', 'OM': '+968', 'AE': '+971', 'QA': '+974', 'BH': '+973', 'KW': '+965',
    'TR': '+90', 'GE': '+995', 'AM': '+374', 'AZ': '+994', 'BY': '+375', 'UA': '+380',
    'MD': '+373', 'RO': '+40', 'BG': '+359', 'MK': '+389', 'AL': '+355', 'ME': '+382',
    'RS': '+381', 'BA': '+387', 'XK': '+383', 'MT': '+356', 'CY': '+357', 'IS': '+354'
  };

  // Fetch user's country code on component mount
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const code = countryCodeMap[data.country_code] || '+91';
        setCountryCode(code);
        setFormData(prev => ({ ...prev, phone: code }));
      } catch (error) {
        console.error('Failed to fetch country code:', error);
        setCountryCode('+91');
        setFormData(prev => ({ ...prev, phone: '+91' }));
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchCountryCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number: keep only digits and country code
      let formattedPhone = value.replace(/[^\d+]/g, '');
      
      // Ensure it starts with country code
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = countryCode + formattedPhone.replace(/^\+?\d{1,4}/, '');
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare payload for webhook
      const payload = {
        name: formData.name,
        mail: formData.email,  // Note: Using 'mail' as required by the webhook
        phone_number: formData.phone.replace(/[^\d]/g, ''), // Strip non-digits for submission
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
                      <div className="text-foreground font-mono">mail@mohanish.in</div>
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
                  <label htmlFor="phone" className="block text-muted-foreground font-mono text-sm mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    {isLoadingLocation && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none"
                      placeholder={`${countryCode}1234567890`}
                      disabled={isLoadingLocation}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">
                    Auto-detected country code: {countryCode}
                  </div>
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
                  disabled={isSubmitting || isLoadingLocation}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-muted text-primary-foreground font-mono font-bold rounded transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : isLoadingLocation ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Loading...
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