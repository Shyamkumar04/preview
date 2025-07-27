import React from 'react';

interface TerminalIconProps {
  onClick: () => void;
}

const TerminalIcon: React.FC<TerminalIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-black-500 to-black-600 hover:from-black-400 hover:to-black-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
      title="Open Terminal"
    >
      <img 
        src="https://cdn-icons-png.flaticon.com/512/11949/11949209.png" 
        alt="Terminal" 
        className="w-8 h-8 filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
    </button>
  );
};

export default TerminalIcon;