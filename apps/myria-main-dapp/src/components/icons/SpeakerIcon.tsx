import React from 'react';

const SpeakerIcon: React.FC<React.SVGAttributes<SVGElement>> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9.99996V14C3 14.55 3.45 15 4 15H7L10.29 18.29C10.92 18.92 12 18.47 12 17.58V6.40996C12 5.51996 10.92 5.06996 10.29 5.69996L7 8.99996H4C3.45 8.99996 3 9.44996 3 9.99996ZM16.5 12C16.5 10.23 15.48 8.70996 14 7.96996V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 4.44996V4.64996C14 5.02996 14.25 5.35996 14.6 5.49996C17.18 6.52996 19 9.05996 19 12C19 14.94 17.18 17.47 14.6 18.5C14.24 18.64 14 18.97 14 19.35V19.55C14 20.18 14.63 20.62 15.21 20.4C18.6 19.11 21 15.84 21 12C21 8.15996 18.6 4.88996 15.21 3.59996C14.63 3.36996 14 3.81996 14 4.44996V4.44996Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SpeakerIcon;
