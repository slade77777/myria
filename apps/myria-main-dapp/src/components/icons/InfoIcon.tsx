import React from 'react';
interface IProp {
  size?: number;
  className?: string;
}
const InfoIcon: React.FC<IProp> = ({ size, className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.33333 4.66671H8.66666V6.00004H7.33333V4.66671ZM8 11.3334C8.36666 11.3334 8.66666 11.0334 8.66666 10.6667V8.00004C8.66666 7.63337 8.36666 7.33337 8 7.33337C7.63333 7.33337 7.33333 7.63337 7.33333 8.00004V10.6667C7.33333 11.0334 7.63333 11.3334 8 11.3334ZM8 1.33337C4.31999 1.33337 1.33333 4.32004 1.33333 8.00004C1.33333 11.68 4.31999 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00004C14.6667 4.32004 11.68 1.33337 8 1.33337ZM8 13.3334C5.06 13.3334 2.66666 10.94 2.66666 8.00004C2.66666 5.06004 5.06 2.66671 8 2.66671C10.94 2.66671 13.3333 5.06004 13.3333 8.00004C13.3333 10.94 10.94 13.3334 8 13.3334Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default InfoIcon;
