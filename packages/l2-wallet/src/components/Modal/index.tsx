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
      className="fixed left-0 top-0 w-full h-full p-0 flex justify-center items-center bg-black/75"
      onClick={() => {
        if (!cannotCloseFromOutside) {
          closeModal();
        }
      }}
    >
      <div
        className={cn(
          `bg-c-background text-white overflow-y-auto h-auto rounded-[12px] relative`,
          className,
        )}
        style={{
          width: width ?? '438px',
        }}
        onClick={event => event.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="flex font-bold text-2xl justify-between">{title}</div>
          <div onClick={closeModal}>
            <CrossIcon className="text-[#808080] cursor-pointer" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
