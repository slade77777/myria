import React from 'react';

interface IProp {
  size: number;
}
const CompleteIcon: React.FC<IProp> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="32"
        cy="31.9995"
        r="24"
        stroke="#81CA95"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31.9995L29.3333 37.3328L40 26.6661"
        stroke="#81CA95"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CompleteIcon;
