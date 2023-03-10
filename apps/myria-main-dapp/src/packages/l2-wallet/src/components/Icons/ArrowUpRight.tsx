import React from 'react';
interface IProps {
  size?: number;
}
const ArrowUpRight: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1667 5.8335L5.83337 14.1668"
        stroke="#9AC9E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 5.8335L14.1667 5.8335V13.3335"
        stroke="#9AC9E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpRight;
