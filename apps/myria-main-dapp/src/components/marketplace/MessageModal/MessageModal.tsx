import cn from 'classnames';
import ReactDOM from 'react-dom';
import CloseIcon from 'src/components/icons/CloseIcon';

type Props = {
  isShowMessage: boolean;
  setIsShowMessage: () => void;
  children?: JSX.Element;
};

export default function MessageModal({ isShowMessage, setIsShowMessage, children }: Props) {
  const modalRoot: any = document.getElementById('modal-root');
  if (modalRoot) {
    return ReactDOM.createPortal(
      <div
        className={cn(
          `absolute top-[80px] right-[21px] max-w-[450px] z-50`,
          isShowMessage ? 'block' : 'hidden'
        )}>
        <div className="flex w-full max-w-lg rounded-[16px] shadow text-gray-400 py-[32px] pl-[72px] pr-[48px]  bg-base/5 ">
          {children}
          <div
            onClick={setIsShowMessage}
            className="cursor-pointer absolute right-5 top-5 text-white">
            <CloseIcon size={25} />
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
  return <></>;
}
