import React from 'react';

const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#6D28D9"/>
      <path d="M10 15H30M10 20H20M10 25H25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Logo;