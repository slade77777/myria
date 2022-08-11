import React, { useState } from 'react';
import InputErrorIcon from '../Icons/InputErrorIcon';

interface TProps {
  max: number;
  onChangeHandle: any;
}

export default function MaxInput({ max = 100, onChangeHandle }: TProps) {
  const [inputValue, setInputValue] = useState<number>();
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const setMax = () => {
    setInputValue(max);
    onChangeHandle(max);
  };

  const onHandleValiteInput = (value: number) => {
    if (value <= max) {
      setErrorInput(false);
      onChangeHandle(value);
    } else {
      onChangeHandle(0);
      setErrorInput(true);
    }
  };
  return (
    <div className="relative">
      <input
        placeholder="Enter an amount"
        type="number"
        min="0"
        className={`bg-input h-12 w-full rounded-lg pl-4 pr-[45px] text-white focus-visible:outline-none ${
          errorInput ? 'border border-red-600' : ''
        }`}
        value={inputValue}
        onChange={(event: any) => {
          if (event.target.value < 0) return;
          onHandleValiteInput(event.target.value);
          setInputValue(event.target.value);
        }}
      />
      {errorInput ? (
        <div className="text-base/10 absolute top-[14px] right-4">
          <InputErrorIcon />
        </div>
      ) : (
        <div
          className="text-base/10 absolute top-[14px] right-4 cursor-pointer text-base font-medium"
          onClick={() => {
            setMax();
          }}
        >
          Max
        </div>
      )}
    </div>
  );
}
