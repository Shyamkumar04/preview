import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Create fade effect with theme-aware background
      if (theme === 'light') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Theme-aware colors with better visibility
        const isRed = Math.random() > 0.5;
        let opacity, color;
        
        if (theme === 'light') {
          opacity = '0.4';
          color = isRed ? `rgba(238, 0, 0, ${opacity})` : `rgba(34, 139, 34, ${opacity})`;
        } else {
          opacity = '0.6';
          color = isRed ? `rgba(238, 0, 0, ${opacity})` : `rgba(0, 255, 0, ${opacity})`;
        }
        
        ctx.fillStyle = color;

        // Get random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i]);

        // Reset drop to top randomly
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += fontSize;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === 'light' ? 0.3 : 0.5 }}
    />
  );
};

export default MatrixBackground;