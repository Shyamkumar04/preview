// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-', {
      page_title,
      page_location,
    });
  }
};

export const trackDownload = (filename: string) => {
  trackEvent('download', 'engagement', filename);
};

export const trackContact = (method: string) => {
  trackEvent('contact', 'engagement', method);
};

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', 'engagement', projectName);
};

export const trackTerminalCommand = (command: string) => {
  trackEvent('terminal_command', 'interaction', command);
};

export const trackThemeChange = (theme: string) => {
  trackEvent('theme_change', 'preference', theme);
};