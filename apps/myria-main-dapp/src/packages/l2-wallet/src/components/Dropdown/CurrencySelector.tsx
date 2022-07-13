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
          className="relative flex h-[52px] w-full cursor-pointer items-center justify-between rounded-[8px] bg-[#132533] px-4"
        >
          <div>
            {selectedItem ? (
              <div className="flex items-center">
                <img
                  className="mr-[11px] w-[24px]"
                  src={selectedItem.ico}
                  alt="currency_avatar"
                />
                <span className="mr-2 text-[16px] text-white">
                  {selectedItem.name}
                </span>
                <span className="flex h-[24px] w-[47px] items-center justify-center rounded-[4px] bg-[#0A1F2E] text-white">
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
          <ul className="absolute z-[10] w-full rounded-[10px] border bg-[#132533]">
            {options.map((item: any, index: number) => (
              <div
                key={`${index}${JSON.stringify(item)}`}
                className="cursor-pointer"
                onClick={() => {
                  selectItem(item);
                }}
              >
                <li className="px-4 py-2">
                  <div>
                    <div className="flex items-center">
                      <img
                        className="mr-[11px] w-[24px]"
                        src={item.ico}
                        alt="currency_avatar_2"
                      />
                      <span className="mr-2 text-[16px] text-white">
                        {item.name}
                      </span>
                      <span className="flex h-[24px] w-[47px] items-center justify-center rounded-[4px] bg-[#0A1F2E] text-white">
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
