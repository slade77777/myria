import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import { valueSort } from '../Collection';

type Props = {
  data: valueSort[];
  selectedDefault: valueSort;
  changeHandler: (value: valueSort) => void;
  onCloseModal: any;
};

const SortMobile = ({ data, changeHandler, onCloseModal }: Props) => {
  const handleSelectedValue = (item: valueSort) => {
    changeHandler(item);
    onCloseModal();
  };

  return (
    <div className="relative">
      <div className="bg-base/3 text-base/10 py-6">
        {data.map((item: valueSort, index: number) => {
          return (
            <div
              key={index}
              className="p-4 text-base font-medium"
              onClick={() => handleSelectedValue(item)}>
              {item.name}
            </div>
          );
        })}
      </div>
      <button
        className="absolute right-0 top-5 h-[24px] w-[24px] text-base/9 hover:cursor-pointer focus:outline-none"
        onClick={() => onCloseModal()}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default SortMobile;
