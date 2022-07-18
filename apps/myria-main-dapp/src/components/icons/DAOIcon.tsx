import React from 'react';

const DAOIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g clipPath="url(#clip0_2574_9572)">
        <path
          d="M7.99895 0.5L7.8916 0.864618V11.4441L7.99895 11.5512L12.9097 8.64836L7.99895 0.5Z"
          fill="white"
        />
        <path
          d="M7.99878 0.5L3.08789 8.64836L7.99878 11.5512V6.41618V0.5Z"
          fill="white"
          fillOpacity="0.5"
        />
        <path
          d="M7.99898 12.4809L7.93848 12.5546V16.3232L7.99898 16.4998L12.9127 9.57959L7.99898 12.4809Z"
          fill="white"
        />
        <path
          d="M7.99878 16.4998V12.4809L3.08789 9.57959L7.99878 16.4998Z"
          fill="white"
          fillOpacity="0.5"
        />
        <path d="M7.99854 11.5512L12.9093 8.64843L7.99854 6.41626V11.5512Z" fill="#A1AFBA" />
        <path d="M3.08789 8.64843L7.99878 11.5512V6.41626L3.08789 8.64843Z" fill="#E7EBEE" />
      </g>
      <defs>
        <clipPath id="clip0_2574_9572">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DAOIcon;
