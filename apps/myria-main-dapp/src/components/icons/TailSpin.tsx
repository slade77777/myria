import * as React from 'react';

const TailSpin = ({}) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28 16c0 6.628-5.373 12-12 12-6.527 0-11.836-5.21-11.997-11.696A1.424 1.424 0 0 1 4 16.149V16h.014a1.4 1.4 0 0 1 2.771 0H6.8A9.2 9.2 0 1 0 16 6.8v-.014a1.4 1.4 0 1 1 0-2.772V4c6.628 0 12 5.373 12 12Z"
      fill="#5C7988"
    />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-10.00004 -.9333 .9398 -10.06964 16 16)">
        <stop offset={0} stopColor="#8BB5CC" />
        <stop offset={0.819} stopColor="#8BB5CC" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);

export default TailSpin;
