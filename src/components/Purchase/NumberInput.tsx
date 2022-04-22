import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const NumberInput: React.FC = () => {
  return (
    <div
      className={clsx(
        'relative mt-1 flex h-8 w-full flex-row rounded-lg border border-[#0F2F45] bg-transparent md:h-[48px]',
        styles['custom-input-number']
      )}>
      <button
        data-action="decrement"
        className=" h-full w-8 shrink-0 cursor-pointer rounded-l bg-brand-dark-blue text-white outline-none hover:bg-gray-400 hover:text-gray-700 md:w-12">
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        defaultValue={0}
        className="flex w-full items-center bg-transparent text-center text-base font-semibold text-white outline-none md:body-lg"></input>
      <button
        data-action="increment"
        className="h-full w-8 shrink-0 cursor-pointer rounded-r bg-brand-dark-blue text-white hover:bg-gray-400 hover:text-gray-700 md:w-12">
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};

export default NumberInput;
