import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { createPopper } from '@popperjs/core';
import type { StrictModifiers } from '@popperjs/core';

type Props = {
  children: JSX.Element | string;
  renderElement: JSX.Element | string;
  offsetX: number;
  width: string;
  defaultShow?: boolean;
};

const Popover = forwardRef(
  (
    {
      children,
      renderElement,
      offsetX = -100,
      width,
      defaultShow = false,
    }: Props,
    ref,
  ) => {
    const [popoverShow, setPopoverShow] = React.useState<boolean>(defaultShow);

    useEffect(() => {
      setPopoverShow(defaultShow);
    }, [defaultShow]);

    const closePopover = () => {
      setPopoverShow(false);
    };
    useImperativeHandle(ref, () => setPopoverShow(false), []);
    const btnRef: any = React.createRef();
    const popoverRef: any = React.createRef();
    const [arrowRef, setArrow] = React.useState<HTMLDivElement | null>(null);
    const openPopover = () => {
      createPopper<StrictModifiers>(btnRef.current, popoverRef.current, {
        placement: 'bottom',
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
              offset: [offsetX, 28],
            },
          },
        ],
      });
      setPopoverShow(true);
    };
    return (
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <div
            ref={btnRef}
            onClick={() => {
              if (popoverShow) closePopover();
              else openPopover();
            }}
          >
            {children}
          </div>
          <div
            className={
              (popoverShow ? '' : 'hidden ') +
              'bg-base/3 relative z-50 mr-3 block max-w-xs break-words rounded-lg border-0 text-left text-sm font-normal leading-normal no-underline shadow-popover ' +
              width
            }
            id="popper"
            ref={popoverRef}
          >
            <div data-popper-arrow ref={setArrow} id="arrow" />
            {renderElement}
          </div>
        </div>
      </div>
    );
  },
);
export default Popover;

Popover.defaultProps = {
  defaultShow: false,
};
