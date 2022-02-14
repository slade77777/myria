import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const NumberInput: React.FC = () => {
  return (
    <div
      className={clsx(
        'relative mt-1 flex h-[48px] w-full flex-row rounded-lg border border-[#0F2F45] bg-transparent',
        styles['custom-input-number']
      )}>
      <button
        data-action="decrement"
        className=" h-full w-20 cursor-pointer rounded-l bg-brand-dark-blue text-white outline-none hover:bg-gray-400 hover:text-gray-700">
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        className="body-lg flex w-full items-center bg-transparent text-center font-semibold text-white outline-none"
        value="0"></input>
      <button
        data-action="increment"
        className="h-full w-20 cursor-pointer rounded-r bg-brand-dark-blue text-white hover:bg-gray-400 hover:text-gray-700">
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};

export default NumberInput;
