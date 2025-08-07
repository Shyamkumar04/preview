import React from 'react';
import { Home, ArrowLeft, Terminal, Search, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold font-mono text-primary mb-4 relative">
              4
              <span className="inline-block animate-pulse">0</span>
              4
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h1 className="text-2xl md:text-3xl font-bold font-mono text-foreground">
                Page Not Found
              </h1>
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-card border border-primary/20 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="w-12 h-12 text-primary" />
            </div>
            
            <h2 className="text-xl font-bold font-mono text-foreground mb-4">
              {'> endpoint_not_found'}
            </h2>
            
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm text-left mb-6">
              <div className="text-red-400 mb-2">ERROR: HTTP 404</div>
              <div className="text-muted-foreground mb-2">
                The requested endpoint does not exist on this server.
              </div>
              <div className="text-muted-foreground">
                URL: <span className="text-primary">{window.location.pathname}</span>
              </div>
            </div>

            <p className="text-muted-foreground font-mono mb-6">
              The page you're looking for might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold rounded transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
              
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono font-bold rounded transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="bg-card border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold font-mono text-foreground mb-4 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              {'> quick_navigation'}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a 
                href="/#about"
                className="px-3 py-2 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono text-sm rounded transition-all duration-300 text-center"
              >
                About
              </a>
              <a 
                href="/#skills"
                className="px-3 py-2 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono text-sm rounded transition-all duration-300 text-center"
              >
                Skills
              </a>
              <a 
                href="/#projects"
                className="px-3 py-2 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono text-sm rounded transition-all duration-300 text-center"
              >
                Projects
              </a>
              <a 
                href="/#contact"
                className="px-3 py-2 bg-muted hover:bg-muted/80 border border-border hover:border-primary text-muted-foreground hover:text-primary font-mono text-sm rounded transition-all duration-300 text-center"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Terminal Command Suggestion */}
          <div className="mt-8 text-center">
            <div className="bg-black border border-green-500 rounded-lg p-4 max-w-md mx-auto">
              <div className="text-green-400 font-mono text-sm text-left">
                <span className="text-green-500">visitor@portfolio:~$</span> cd /home
                <br />
                <span className="text-green-300">Redirecting to homepage...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;