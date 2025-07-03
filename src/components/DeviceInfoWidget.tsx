import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Globe, Shield, AlertTriangle, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DeviceInfo {
  ipString: string;
  ipNumeric: number;
  ipType: string;
  isBehindProxy: boolean;
  device: string;
  os: string;
  userAgent: string;
  family: string;
  versionMajor: string;
  versionMinor: string;
  versionPatch: string;
  isSpider: boolean;
  isMobile: boolean;
  userAgentDisplay: string;
  userAgentRaw: string;
  userLanguages: string[];
}

const DeviceInfoWidget: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const { theme } = useTheme();

  const fetchDeviceInfo = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://us1.api-bdc.net/data/client-info', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DeviceInfo = await response.json();
      setDeviceInfo(data);
      
      // Check if user is behind proxy/VPN and block access
      if (data.isBehindProxy) {
        setIsBlocked(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch device info');
      console.error('Error fetching device info:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, []);

  const getDeviceIcon = () => {
    if (!deviceInfo) return <Monitor className="w-3 h-3" />;
    return deviceInfo.isMobile ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />;
  };

  const formatIP = (ip: string) => {
    return ip.replace(/\./g, '·');
  };

  const getLocationFromLanguages = (languages: string[]) => {
    const primaryLang = languages[0];
    const langMap: { [key: string]: string } = {
      'en-US': '🇺🇸',
      'en-GB': '🇬🇧',
      'en-CA': '🇨🇦',
      'en-AU': '🇦🇺',
      'en-IN': '🇮🇳',
      'ta': '🇮🇳',
      'hi': '🇮🇳',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'es': '🇪🇸',
      'it': '🇮🇹',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'zh': '🇨🇳',
      'ru': '🇷🇺',
    };
    
    return langMap[primaryLang] || '🌍';
  };

  // Proxy/VPN Block Screen
  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card border-2 border-red-500 rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-4 font-mono">ACCESS BLOCKED</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="font-mono">
              🚫 Proxy/VPN detected on your connection
            </p>
            <p className="text-sm">
              For security reasons, this portfolio requires direct internet access.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 text-left">
              <div className="text-primary font-mono text-sm mb-2">To access this site:</div>
              <ul className="text-xs space-y-1 font-mono">
                <li>• Disable your VPN/Proxy</li>
                <li>• Use your direct internet connection</li>
                <li>• Refresh the page</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary hover:bg-primary/80 text-primary-foreground font-mono rounded transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Compact Bottom Bar */}
      <div 
        className="fixed bottom-0 left-0 z-40 cursor-pointer transition-all duration-300 hover:shadow-lg"
        style={{
          width: '194.46px',
          height: '13.07px',
        }}
        onClick={() => setIsExpanded(true)}
      >
        <div 
          className="w-full h-full flex items-center justify-between px-2 text-xs font-mono"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(81, 255, 0, 0.41)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="flex items-center gap-1">
            {getDeviceIcon()}
            <span className="text-black text-[8px] font-bold">
              {isLoading ? 'Loading...' : deviceInfo ? `${formatIP(deviceInfo.ipString)}` : 'Error'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {deviceInfo && (
              <span className="text-black text-[8px]">
                {getLocationFromLanguages(deviceInfo.userLanguages)}
              </span>
            )}
            <ChevronUp className="w-2 h-2 text-black" />
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-primary/30 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-primary/10 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold font-mono text-foreground">Visitor Analytics Dashboard</h2>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <div className="text-red-400 font-mono mb-2">Connection Error</div>
                  <div className="text-red-300 text-sm">{error}</div>
                </div>
              ) : deviceInfo ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Network Information */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="font-bold font-mono text-foreground">Network Info</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">IP Address</div>
                        <div className="text-lg font-mono text-foreground">{deviceInfo.ipString}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">IP Type</div>
                        <div className="text-sm text-foreground">{deviceInfo.ipType}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Proxy Status</div>
                        <div className={`text-sm font-medium ${deviceInfo.isBehindProxy ? 'text-red-400' : 'text-green-400'}`}>
                          {deviceInfo.isBehindProxy ? '🚫 Behind Proxy' : '✅ Direct Connection'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">IP Numeric</div>
                        <div className="text-sm font-mono text-foreground">{deviceInfo.ipNumeric}</div>
                      </div>
                    </div>
                  </div>

                  {/* Device Information */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      {deviceInfo.isMobile ? (
                        <Smartphone className="w-5 h-5 text-primary" />
                      ) : (
                        <Monitor className="w-5 h-5 text-primary" />
                      )}
                      <h3 className="font-bold font-mono text-foreground">Device Info</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Device Type</div>
                        <div className="text-sm text-foreground">{deviceInfo.device}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Operating System</div>
                        <div className="text-sm text-foreground">{deviceInfo.os}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Browser</div>
                        <div className="text-sm text-foreground">
                          {deviceInfo.family} {deviceInfo.versionMajor}.{deviceInfo.versionMinor}.{deviceInfo.versionPatch}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Mobile Device</div>
                        <div className={`text-sm ${deviceInfo.isMobile ? 'text-blue-400' : 'text-gray-400'}`}>
                          {deviceInfo.isMobile ? '📱 Yes' : '🖥️ No'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Bot/Spider</div>
                        <div className={`text-sm ${deviceInfo.isSpider ? 'text-yellow-400' : 'text-green-400'}`}>
                          {deviceInfo.isSpider ? '🤖 Yes' : '👤 No'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location & Languages */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="font-bold font-mono text-foreground">Location & Languages</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Estimated Region</div>
                        <div className="text-lg">
                          {getLocationFromLanguages(deviceInfo.userLanguages)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">User Languages</div>
                        <div className="flex flex-wrap gap-2">
                          {deviceInfo.userLanguages.map((lang, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-mono"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="text-muted-foreground font-mono">Loading visitor analytics...</div>
                </div>
              )}

              {/* User Agent Display */}
              {deviceInfo && (
                <div className="mt-6 pt-4 border-t border-primary/20">
                  <div className="text-xs text-muted-foreground mb-2">Full User Agent String:</div>
                  <div className="bg-muted/30 rounded p-3 text-xs font-mono text-foreground break-all">
                    {deviceInfo.userAgentRaw}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceInfoWidget;