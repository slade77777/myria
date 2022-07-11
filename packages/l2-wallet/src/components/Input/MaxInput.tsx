import React, { useState } from 'react';

interface TProps {
  max: number;
  onChangeHandle: any;
}

export default function MaxInput({ max = 100, onChangeHandle }: TProps) {
  const [inputValue, setInputValue] = useState<number>(0);
  const setMax = () => {
    setInputValue(max);
  };
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        className="text-white w-full h-[48px] bg-[#132533] rounded-[8px] pl-4 pr-[45px]"
        value={inputValue}
        onChange={(event: any) => {
          if (event.target.value < 0) return;
          setInputValue(event.target.value);
          onChangeHandle(event.target.value);
        }}
      />
      <div
        className="text-[#777777] absolute top-[10px] right-4 cursor-pointer"
        onClick={() => {
          setMax();
        }}
      >
        Max
      </div>
    </div>
  );
}
