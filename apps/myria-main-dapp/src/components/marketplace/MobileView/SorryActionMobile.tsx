import CloseIcon from 'src/components/icons/CloseIcon';
import { copyTextToClipboard } from 'src/utils';

type Props = {
  onCloseModal: any;
};

const SorryActionMobile = ({ onCloseModal }: Props) => {
  return (
    <div className="relative">
      <div className="bg-base/3 text-base/10 py-6 text-center">
        <p className="font-bold text-2xl">Sorry!</p>
        <p className="text-sm text-base/9 mt-2">
          Purchasing on mobile is not currently supported. Please use your desktop browser.
        </p>
        <button
          className="bg-primary/6 text-base/1 uppercase rounded-lg w-full mt-6 h-12 font-bold"
          onClick={() => onCloseModal()}>
          CONTINUE BROWSING
        </button>
        <button
          className="text-white uppercase rounded-lg w-full mt-4 h-12 font-bold border-base/9 border"
          onClick={() => {
            copyTextToClipboard(location.href);
            onCloseModal();
          }}>
          COPY LINK
        </button>
      </div>
      <button
        className="absolute right-0 top-5 h-6 w-6 text-base/9 hover:cursor-pointer focus:outline-none"
        onClick={() => onCloseModal()}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default SorryActionMobile;
