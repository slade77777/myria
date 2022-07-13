import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { CrossIcon } from '../Icons';

type Props = {
  closeModal: any;
  width?: string;
  title?: string;
  children?: JSX.Element;
  className?: string;
  cannotCloseFromOutside?: Boolean;
};

export default function Modal({
  closeModal,
  title = 'title',
  children,
  className = 'pt-[37px] pb-[32px] px-[40px]',
  cannotCloseFromOutside = false,
  width,
}: Props) {
  const modalRoot: any = document.getElementById('modal-root');
  return ReactDOM.createPortal(
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/75 p-0"
      onClick={() => {
        if (!cannotCloseFromOutside) {
          closeModal();
        }
      }}
    >
      <div
        className={cn(
          `relative h-auto overflow-y-auto rounded-[12px] bg-c-background text-white`,
          className,
        )}
        style={{
          width: width ?? '438px',
        }}
        onClick={event => event.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="flex justify-between text-2xl font-bold">{title}</div>
          <div onClick={closeModal}>
            <CrossIcon className="cursor-pointer text-[#808080]" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
