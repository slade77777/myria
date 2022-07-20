import React, { useState } from 'react';

interface TProps {
  max: number;
  onChangeHandle: any;
}

export default function MaxInput({ max = 100, onChangeHandle }: TProps) {
  const [inputValue, setInputValue] = useState<number>();
  const setMax = () => {
    setInputValue(max);
  };
  return (
    <div className="relative">
      <input
        placeholder="Enter an amount"
        type="number"
        min="0"
        className="h-[48px] w-full rounded-[8px] bg-[#132533] pl-4 pr-[45px] text-white"
        value={inputValue}
        onChange={(event: any) => {
          if (event.target.value < 0) return;
          setInputValue(event.target.value);
          onChangeHandle(event.target.value);
        }}
      />
      <div
        className="absolute top-[14px] right-4 cursor-pointer text-[#777777]"
        onClick={() => {
          setMax();
        }}
      >
        Max
      </div>
    </div>
  );
}
