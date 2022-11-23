import React, { useState, useEffect } from 'react';
import ChevronIcon from '../Icons/ChevronIcon';

export interface TOption {
  id: number;
  name: string;
  short: string;
  ico: string;
  tokenAddress: string;
  assetType?: string;
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
          className={`relative flex h-[52px] w-full cursor-pointer items-center justify-between bg-[#132533] px-4 ${
            !isOpen ? 'rounded-lg' : 'rounded-t-lg'
          }`}
        >
          <div>
            {!isOpen ? (
              <div>
                {selectedItem ? (
                  <div className="flex items-center">
                    <img
                      className="mr-[11px] w-6"
                      src={selectedItem.ico}
                      alt="currency_avatar"
                    />
                    <span className="text-base/10 mr-2 text-base">
                      {selectedItem.name}
                    </span>
                    <div className="text-base/9 flex items-center justify-center rounded-[4px] bg-[#0A1F2E] px-2 py-1">
                      {selectedItem.short}
                    </div>
                  </div>
                ) : (
                  'Select Currency'
                )}
              </div>
            ) : (
              <span className="text-base/9 text-sm">Select an asset</span>
            )}
          </div>
          <button aria-label="toggle menu">
            <ChevronIcon />
          </button>
        </div>
        {isOpen && (
          <ul className="absolute z-[10] w-full rounded-br-[10px] rounded-bl-[10px] bg-[#132533] pb-3">
            {options.map((item: any, index: number) => (
              <div
                key={`${index}${JSON.stringify(item)}`}
                className="cursor-pointer pr-4 pl-2"
                onClick={() => {
                  selectItem(item);
                }}
              >
                <li className="hover:bg-base/5 rounded-lg py-2 pl-3">
                  <div className="font-normal">
                    <div className="flex items-center">
                      <img
                        className="mr-[11px] w-[24px]"
                        src={item.ico}
                        alt="currency_avatar_2"
                      />
                      <span className="text-base/10 mr-2 text-base">
                        {item.name}
                      </span>
                      <span className="text-base/9 flex items-center justify-center rounded-[4px] bg-[#0A1F2E] px-2 py-1">
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
