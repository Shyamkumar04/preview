import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, X, User } from 'lucide-react';

interface NewsletterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    if (!formData.name.trim()) {
      setStatus('error');
      setMessage('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    
    try {
      const response = await fetch('https://mohanishx-n8n.koyeb.app/webhook/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('success');
      setMessage('Successfully subscribed to newsletter!');
      setFormData({ name: '', email: '' });
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card border border-primary/20 rounded-lg shadow-2xl max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-mono text-foreground mb-2">
              {'> newsletter_signup'}
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              Get exclusive cybersecurity insights and project updates
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-muted-foreground font-mono text-sm mb-2">
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-muted-foreground font-mono text-sm mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary text-foreground font-mono rounded transition-colors duration-300 focus:outline-none"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Status Messages */}
            {status !== 'idle' && (
              <div className={`flex items-center gap-2 p-3 rounded font-mono text-sm ${
                status === 'success' 
                  ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                  : 'bg-red-900/30 text-red-400 border border-red-500/30'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !formData.email || !formData.name}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-muted text-primary-foreground font-mono font-bold rounded transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-primary font-mono text-sm mb-2">{'> what_you_get'}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground font-mono">Weekly Security Tips</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground font-mono">Project Updates</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground font-mono">Industry Insights</span>
              </div>
            </div>
            <p className="text-muted-foreground font-mono text-xs mt-3">
              No spam, unsubscribe anytime. Your privacy is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;