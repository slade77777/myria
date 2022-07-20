// Import components
import cn from 'classnames';
import { useSelector } from 'react-redux';

// Import Components
import { ThreeDotsVerticalIcon } from '../Icons';

// Import Redux
import { RootState } from '../../app/store';

type Props = {
  modalShow: Boolean;
  createHandler: any;
};

export default function StarkKeyNotFoundModal({
  modalShow,
  createHandler,
}: Props) {
  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  return (
    <div
      className={cn(
        'absolute top-[100px] right-[21px] w-[406px] rounded-[20px] border border-[#202230] bg-[#081824] py-6',
        modalShow ? 'block' : 'hidden',
      )}
    >
      <div className="flex items-center justify-end px-4">
        <div className="mr-1 text-[14px] text-[#A1AFBA]">
          {account.substring(0, 4) +
            '...' +
            account.substring(account.length - 4, account.length)}
        </div>
        <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
      </div>

      <div className="relative h-[20px] w-[20px]">
        <div className="absolute top-[-66px] left-[250px] h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230] bg-[#081824]" />
      </div>

      <div>
        <div className="mt-[106px] text-center text-[24px] font-bold text-white">
          Stark key not found
        </div>

        <div className="mt-[32px] px-[20px] text-center text-[16px] text-white">
          <p>
            Whatever sartorial tumeric irony flexitarian pug tousled af franzen
            offal artisan street art thundercats cardigan seitan. Readymade
            fixie fingerstache succulents.
          </p>
        </div>

        <div className="mt-[32px] mb-[181px] flex justify-center px-[32px]">
          <button
            onClick={createHandler}
            className="flex items-center justify-center rounded-[8px] bg-[#F5B941] py-[9px] px-[50px] text-[14px] font-bold uppercase text-[#040B10]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
