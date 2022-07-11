import React from 'react';
import { createPopper } from '@popperjs/core';
import type { StrictModifiers } from '@popperjs/core';
import { CrossIcon } from '../Icons';

type Props = {
  children: JSX.Element | string
};

export default function MyriaWalletPopover({children}: Props) {
  const [popoverShow, setPopoverShow] = React.useState<boolean>(false);
  const btnRef: any = React.createRef();
  const popoverRef: any = React.createRef();
  const [arrowRef, setArrow] = React.useState<HTMLDivElement | null>(null);
  const openPopover = () => {
    createPopper<StrictModifiers>(btnRef.current, popoverRef.current, {
      placement: "bottom",
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowRef, // 5px from the edges of the popper
          
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 28],
          },
        }
      ],
    });
    setPopoverShow(true);
  };

  const closePopover = () => {
    setPopoverShow(false);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full text-center">
        <div ref={btnRef} onClick={() => {
          if(popoverShow) closePopover();
          else openPopover();
        }}>
          {children}
        </div>
        <div
          className={
            (popoverShow ? '' : 'hidden ') +
            'relative bg-white shadow-popover border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
          }
          id="popper"
          ref={popoverRef}
        >
          <div data-popper-arrow ref={setArrow} id="arrow"/>
          <div className='p-[32px]'>
            <div className='absolute top-[21px] right-[21px] cursor-pointer' onClick={closePopover}>
              <CrossIcon/>
            </div>
          
            <div className='text-[#666666] font-semibold text-[16px]'>
              Your Myria Wallet
            </div>
            <div className='text-[#666666] text-[14px] mt-4'>
              You can access your wallet here to view your assets and make deposits or withdrawals. 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
