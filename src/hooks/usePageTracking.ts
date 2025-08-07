import { useEffect } from 'react';

interface PageTrackingData {
  timestamp: string;
  page_url: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  screen_resolution: string;
  viewport_size: string;
  timezone: string;
  session_id: string;
  page_reload_count: number;
  visit_duration: number;
  scroll_depth: number;
  page_visibility: string;
}

export const usePageTracking = () => {
  useEffect(() => {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let visitStartTime = Date.now();
    
    // Track scroll depth
    const trackScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      scrollDepth = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
    };

    // Send page tracking data
    const sendPageTrackingData = async () => {
      const trackingData: PageTrackingData = {
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        session_id: sessionStorage.getItem('session_id') || Math.random().toString(36).substr(2, 9),
        page_reload_count: parseInt(sessionStorage.getItem('page_reload_count') || '0') + 1,
        visit_duration: Date.now() - visitStartTime,
        scroll_depth: maxScrollDepth,
        page_visibility: document.visibilityState
      };

      try {
        await fetch('https://mohanishx-n8n.koyeb.app/webhook/bf13dd13-00b0-4f66-ba46-829eaf49a73a', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'page_tracking',
            data: trackingData
          })
        });
      } catch (error) {
        console.log('Page tracking failed:', error);
      }
    };

    // Track page load
    sendPageTrackingData();

    // Add scroll listener
    window.addEventListener('scroll', trackScrollDepth);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendPageTrackingData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track page unload
    const handleBeforeUnload = () => {
      sendPageTrackingData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};