import React from 'react';
interface IProp {
  size?: number;
  className?: string;
}

const CircleCheck: React.FC<IProp> = ({ size, className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 13.875C11.0208 13.875 13.875 11.0208 13.875 7.5C13.875 3.97918 11.0208 1.125 7.5 1.125C3.97918 1.125 1.125 3.97918 1.125 7.5C1.125 11.0208 3.97918 13.875 7.5 13.875Z"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3321 6.79048C10.7226 6.39996 10.7226 5.76679 10.3321 5.37627C9.94158 4.98574 9.30842 4.98574 8.91789 5.37627L10.3321 6.79048ZM6.79167 8.91671L6.08456 9.62381C6.47508 10.0143 7.10825 10.0143 7.49877 9.62381L6.79167 8.91671ZM6.08211 6.79293C5.69158 6.40241 5.05842 6.40241 4.66789 6.79293C4.27737 7.18346 4.27737 7.81662 4.66789 8.20715L6.08211 6.79293ZM8.91789 5.37627L6.08456 8.2096L7.49877 9.62381L10.3321 6.79048L8.91789 5.37627ZM7.49877 8.2096L6.08211 6.79293L4.66789 8.20715L6.08456 9.62381L7.49877 8.2096Z"
        fill="white"
      />
    </svg>
  );
};

export default CircleCheck;
