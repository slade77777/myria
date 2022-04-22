import React from 'react';
import style from './loading.module.css';

interface Props {
  loadingSize?: number;
  labelSize?: number;
  label?: string;
}

function Loading({ loadingSize = 24, labelSize = 14, label }: Props) {
  return (
    <div
      className="flex flex-col items-center w-fit"
      style={{
        fontSize: loadingSize
      }}>
      <div className={`${style.loadingRing}`}></div>
      {label && <span className={`text-[${labelSize}px] mt-6`}>Stand by</span>}
    </div>
  );
}

export default Loading;
