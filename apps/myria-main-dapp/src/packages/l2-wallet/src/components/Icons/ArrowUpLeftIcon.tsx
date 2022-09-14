import React from 'react';

const ArrowUpLeftIcon: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6665 18.6704L45.3332 45.3371"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.6665 18.6704L18.6665 18.6704L18.6665 42.6704"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpLeftIcon;
