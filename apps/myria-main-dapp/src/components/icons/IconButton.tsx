import clsx from 'clsx';
import React from 'react';

interface objectButton {
  FILL: string,
  COLOR: string,
  TEXT_COLOR: string
  ID: string,
}
interface IProp {
  status: objectButton,
  isActive: boolean
}

const IconButton: React.FC<IProp> = ({ status, isActive }) => {

  return (
    <svg
      style={{
        'strokeWidth': '1px',
        'transition': '.2s ease-in-out'
      }} className={clsx(`absolute top-0 left-0 right-0 bottom-0 ${isActive && 'group-hover:drop-shadow-[0px_0px_10px_rgba(158,206,171,0.5)]'}`)}
      width="204"
      height="50"
      viewBox="0 0 204 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.65627 1H195.697H198.977C201.186 1 202.977 2.79086 202.977 5V37.9102C202.977 38.7718 202.698 39.6104 202.183 40.3012L196.897 47.391C196.142 48.4035 194.953 49 193.69 49H4.97656C2.76743 49 0.976562 47.2091 0.976562 45V11.2762C0.976562 10.4146 1.25479 9.576 1.76984 8.88524L6.44954 2.609C7.20448 1.59649 8.39328 1 9.65627 1Z"
        fill={status.FILL}
        fillOpacity="0.2"
        stroke={status.COLOR}
      />
      <defs>
        <linearGradient
          id={status.ID}
          x1="101.977"
          y1="1"
          x2="101.977"
          y2="49"
          gradientUnits="userSpaceOnUse">
          <stop stopColor={status.COLOR} />
          <stop offset="1" stopColor={status.COLOR} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconButton;
