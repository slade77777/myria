import React, { useState, useEffect } from 'react';
import ChevronIcon from '../Icons/ChevronIcon';

export interface TOption {
  id: number;
  name: string;
  short: string;
  ico: string;
  tokenAddress: string;
}

interface TProp {
  selectHandle: any;
  options: Array<TOption>;
}

export default function CurrencySelector({ selectHandle, options }: TProp) {
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(options[0]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (!dropdownRef || dropdownRef.contains(event.target as Node)) {
        return;
      }
      handleClose();
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [dropdownRef]);

  const selectItem = (item: any) => {
    setSelectedItem(item);
    selectHandle(item);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={setDropdownRef}>
      <div className="relative">
        <div
          onClick={() => {
            toggleDropDown();
          }}
          className="cursor-pointer relative flex items-center bg-[#132533] w-full h-[52px] rounded-[8px] px-4 justify-between"
        >
          <div>
            {selectedItem ? (
              <div className="flex items-center">
                <img
                  className="w-[24px] mr-[11px]"
                  src={selectedItem.ico}
                  alt="currency_avatar"
                />
                <span className="text-[16px] text-white mr-2">
                  {selectedItem.name}
                </span>
                <span className="text-white rounded-[4px] bg-[#0A1F2E] w-[47px] h-[24px] flex justify-center items-center">
                  {selectedItem.short}
                </span>
              </div>
            ) : (
              'Select Currency'
            )}
          </div>
          <button aria-label="toggle menu">
            <ChevronIcon />
          </button>
        </div>
        {isOpen && (
          <ul className="absolute border w-full z-[10] bg-[#132533] rounded-[10px]">
            {options.map((item: any, index: number) => (
              <div
                className="cursor-pointer"
                onClick={() => {
                  selectItem(item);
                }}
              >
                <li className="px-4 py-2">
                  <div>
                    <div className="flex items-center">
                      <img
                        className="w-[24px] mr-[11px]"
                        src={item.ico}
                        alt="currency_avatar_2"
                      />
                      <span className="text-[16px] text-white mr-2">
                        {item.name}
                      </span>
                      <span className="text-white rounded-[4px] bg-[#0A1F2E] w-[47px] h-[24px] flex justify-center items-center">
                        {item.short}
                      </span>
                    </div>
                  </div>
                  {item.value}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
