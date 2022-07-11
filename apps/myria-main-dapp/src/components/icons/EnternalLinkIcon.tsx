import React from 'react';

const EnternalLinkIcon: React.FC<{ size?: number; stroke?: string }> = ({
  size = 24,
  stroke = '#9AC9E3'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 7H6C4.89543 7 4 7.89543 4 9V18C4 19.1046 4.89543 20 6 20H15C16.1046 20 17 19.1046 17 18V13"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L20 4"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 4H20V9"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EnternalLinkIcon;
