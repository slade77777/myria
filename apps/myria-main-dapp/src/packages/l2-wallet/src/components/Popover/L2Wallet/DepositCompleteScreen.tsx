import { TxResult } from 'myria-core-sdk/dist/types/src/types';
import { useEffect, useState } from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import Popover from 'src/components/Popover';
import { getNetworkId } from 'src/services/myriaCoreSdk';
import { getExplorerForAddress } from 'src/utils';
import { ArrowIcon, ProgressIcon, TickCircleIcon } from '../../Icons';
type Props = {
  amount: Number;
  successHandler: any;
  selectedToken: any;
  goBack: any;
  items: TxResult | undefined;
};

export default function DepositCompleteScreen({
  amount,
  successHandler,
  selectedToken,
  goBack,
  items,
}: Props) {
  const [etherLinkContract, setEtherLinkContract] = useState<string>();
  useEffect(() => {
    const setLink = async () => {
      const networkId = await getNetworkId();
      if (!networkId || !items?.transactionHash) return '';
      setEtherLinkContract(
        getExplorerForAddress(items?.transactionHash, networkId, 'transaction'),
      );
    };
    setLink();
  }, [items?.transactionHash]);

  return (
    <>
      <div
        className="-mt-8 flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="grow">
        <div className="mx-auto mt-5 flex h-16 w-16 justify-center">
          <ProgressIcon size={64} className="text-light-green w-full" />
        </div>
        {/* <div className="mt-8 flex justify-center"> */}
        {/* <TickCircleIcon className="text-light-green" /> */}
        {/* <ProgressIcon size={64} className="text-blue/6 w-full" /> */}
        {/* </div> */}

        <div className="mt-6 text-center text-2xl text-white">
          Deposit is in progress
        </div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
          Funds to be available in your Myria wallet soon
        </div>
        <div className="text-base/9 bg-base/2/50 mt-8 rounded-lg py-2 px-4 text-sm">
          <div className="flex justify-between text-sm">
            <span>Amount</span>
            <span className="flex items-center text-white">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>Transaction ID</span>
            <a
              className="text-primary/6"
              target="_blank"
              href={etherLinkContract}
              rel="noreferrer"
            >
              View
            </a>
          </div>
        </div>
      </div>

      <Popover.Close aria-label="Close" onClick={() => successHandler()}>
        <div>
          <button className="bg-primary/6 flex h-10 w-full items-center justify-center rounded-lg text-base font-bold text-black">
            OK
          </button>
        </div>
      </Popover.Close>
    </>
  );
}
