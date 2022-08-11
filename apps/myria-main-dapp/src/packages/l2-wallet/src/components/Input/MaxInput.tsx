import React, { useState } from 'react';
import InputErrorIcon from '../Icons/InputErrorIcon';

import NumberFormat from 'react-number-format';
interface TProps {
  max: number;
  onChangeHandle: any;
  isValidForm?: boolean
}

export default function MaxInput({ max = 100, onChangeHandle, isValidForm = true }: TProps) {
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
      <NumberFormat
        placeholder="Enter an amount"
        className={`bg-input h-12 w-full rounded-lg pl-4 pr-[45px] text-white focus-visible:outline-none ${
          !isValidForm && 'border border-red-600'
        }`}
        displayType={'input'}
        min={0}
        allowNegative={false}
        thousandSeparator={true}
        onValueChange={({floatValue}) => {
          setInputValue(floatValue);
          onChangeHandle(floatValue);
        }}
      />
      {!isValidForm ? (
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
