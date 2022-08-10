import React from 'react';
interface IProp {
  size?: number;
}

const CircleCheckSuccessOutline: React.FC<IProp> = ({ size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="#81CA95"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31.9998L29.3333 37.3332L40 26.6665"
        stroke="#81CA95"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleCheckSuccessOutline;
