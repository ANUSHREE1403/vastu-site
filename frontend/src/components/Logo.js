import React from 'react';

const Logo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Main Logo Container */}
      <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
        {/* Inner Circle */}
        <div className="w-3/4 h-3/4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          {/* Vastu Symbol - Simplified Mandala */}
          <div className="relative">
            {/* Center Dot */}
            <div className="w-2 h-2 bg-white rounded-full"></div>
            {/* Outer Ring */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border border-white border-opacity-60 rounded-full"></div>
            {/* Corner Elements */}
            <div className="absolute -top-2 -left-2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 rounded-lg opacity-30 blur-sm -z-10"></div>
    </div>
  );
};

export default Logo;

