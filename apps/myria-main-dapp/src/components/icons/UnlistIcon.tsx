import React from 'react';
interface IProp {
  size?: number;
  className?: string;
}
const UnlistIcon: React.FC<IProp> = ({ size = 22, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 5.20101 16.799 0.5 11 0.5C5.20101 0.5 0.5 5.20101 0.5 11C0.5 16.799 5.20101 21.5 11 21.5ZM11 5.25C11.4142 5.25 11.75 5.58579 11.75 6V12C11.75 12.4142 11.4142 12.75 11 12.75C10.5858 12.75 10.25 12.4142 10.25 12V6C10.25 5.58579 10.5858 5.25 11 5.25ZM10 15C10 14.4477 10.4477 14 11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15Z"
        fill="#F2DC8A"
      />
    </svg>
  );
};

export default UnlistIcon;
