import * as React from 'react';

const ETHIcon = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4117_22607)">
        <path
          d="M11.9978 0L11.8368 0.546927V16.4161L11.9978 16.5767L19.364 12.2225L11.9978 0Z"
          fill="#A1AFBA"
        />
        <path
          d="M11.9978 0L4.63147 12.2225L11.9978 16.5767V8.87428V0Z"
          fill="#E7EBEE"
        />
        <path
          d="M11.9979 17.9716L11.9071 18.0822V23.735L11.9979 24L19.3685 13.6196L11.9979 17.9716Z"
          fill="#A1AFBA"
        />
        <path
          d="M11.9978 24V17.9716L4.63147 13.6196L11.9978 24Z"
          fill="#E7EBEE"
        />
        <path
          opacity="0.5"
          d="M11.9978 16.577L19.364 12.2228L11.9978 8.87451V16.577Z"
          fill="#0F2F45"
        />
        <path
          opacity="0.3"
          d="M4.63147 12.2228L11.9978 16.577V8.87451L4.63147 12.2228Z"
          fill="#2B4C63"
        />
      </g>
      <defs>
        <clipPath id="clip0_4117_22607">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ETHIcon;
