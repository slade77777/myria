import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

interface INumberInputProps {
  setQuantityNumber: (arg: number) => void
}

const NumberInput: React.FC<INumberInputProps> = ({setQuantityNumber}) => {
  const [quantity, setQuantity] = React.useState(0);
  function increaseQuantity(){
    let quantity_temp=quantity;
    quantity_temp=quantity_temp+1;
    setQuantity(quantity_temp);
    console.log(quantity_temp);
    setQuantityNumber(quantity_temp);
  }
  function decreaseQuantity(){
    let quantity_temp=quantity;
    if(quantity_temp>0){
      quantity_temp=quantity_temp-1;
      setQuantity(quantity_temp);
      console.log(quantity_temp);
      setQuantityNumber(quantity_temp);
    }
  }
  return (
    <div
      className={clsx(
        'relative mt-1 flex h-8 w-full flex-row rounded-lg border border-[#0F2F45] bg-transparent md:h-[48px]',
        styles['custom-input-number']
      )}>
      <button
        data-action="decrement"
        onClick={() => decreaseQuantity()}
        className=" h-full w-8 shrink-0 cursor-pointer rounded-l bg-brand-dark-blue text-white outline-none hover:bg-gray-400 hover:text-gray-700 md:w-12">
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        value={quantity}
        className="flex w-full items-center bg-transparent text-center text-base font-semibold text-white outline-none md:body-lg"></input>
      <button
        data-action="increment"
        onClick={() => increaseQuantity()}
        className="h-full w-8 shrink-0 cursor-pointer rounded-r bg-brand-dark-blue text-white hover:bg-gray-400 hover:text-gray-700 md:w-12">
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};

export default NumberInput;
