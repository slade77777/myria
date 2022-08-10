import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function EthereumIcon({ size = 12, className }: Props) {
  return (
    <div className={className}>
      <svg
        fill="gray"
        viewBox="-38.39985 -104.22675 332.7987 625.3605"
        width={size}
      >
        <path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z" />
        <path d="M127.962 287.959V0L0 212.32z" />
        <path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z" />
        <path d="M0 236.585l127.962 180.32v-104.72z" />
        <path d="M127.961 154.159v133.799l127.96-75.637z" />
        <path d="M127.96 154.159L0 212.32l127.96 75.637z" />
      </svg>
    </div>
  );
}
