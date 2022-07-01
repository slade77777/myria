import React from 'react';

const ETH: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 15, ...props }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M14.4 11.6364L7.37561 0L0 11.6364L7.37561 16.3636L14.4 11.6364Z" fill="white" />
      <path d="M0 13.4545L7.37561 24L14.4 13.4545L7.37561 17.8182L0 13.4545Z" fill="white" />
    </svg>
  );
};

export default ETH;
