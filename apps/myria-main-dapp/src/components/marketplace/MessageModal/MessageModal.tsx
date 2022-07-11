import ReactDOM from 'react-dom';
import cn from 'classnames';
import CircleCheck from 'src/components/icons/CircleCheck';
import CloseIcon from 'src/components/icons/CloseIcon';
import { Trans } from '@lingui/macro';

type Props = {
  isShowMessage: boolean;
  setIsShowMessage: () => void;
  children?: JSX.Element;
};

export default function MessageModal({ isShowMessage, setIsShowMessage, children }: Props) {
  const modalRoot: any = document.getElementById('modal-root');
  return ReactDOM.createPortal(
    <div
      className={cn(
        `absolute top-[80px] right-[21px] max-w-[407px] z-50`,
        isShowMessage ? 'block' : 'hidden'
      )}>
      <div className="flex w-full max-w-lg text-gray-500 bg-base/5 rounded-[16px] shadow dark:bg-gray-800 dark:text-gray-400 py-[32px] pl-[50px] pr-[32px]">
        {children}
        <div onClick={setIsShowMessage} className="cursor-pointer">
          <CloseIcon size={22} />
        </div>
      </div>
    </div>,
    modalRoot
  );
}
