import React from 'react';

const CircleCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 53,
  height = 52,
  ...props
}) => {
  return (
    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="32.5"
        cy="32.0039"
        r="24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 32.0039L29.8333 37.3372L40.5 26.6706"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleCheckIcon;
