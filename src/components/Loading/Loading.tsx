import React from 'react';
import style from './loading.module.css';

interface Props {
  loadingSize?: number;
  labelSize?: number;
  label?: string;
  className?: string;
  color?: string;
}

function Loading({ loadingSize = 24, labelSize = 14, label, className, color }: Props) {
  return (
    <div
      className={`flex w-fit flex-col items-center ${className}`}
      style={{
        fontSize: loadingSize,
        borderColor: color || 'inherit'
      }}>
      <div className={`${style.loadingRing}`}></div>
      {label && (
        <span
          className="mt-6"
          style={{
            fontSize: labelSize
          }}>
          Stand by
        </span>
      )}
    </div>
  );
}

export default Loading;
