import { Trans } from '@lingui/macro';
import { FC, useEffect, useMemo, useState } from 'react';
import CircleCheckSuccessOutline from 'src/components/icons/CircleCheckSuccessOutline';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { ETHERS_LINK } from 'src/services/common-ethers';
import { getNetworkId } from 'src/services/myriaCoreSdk';

interface IProp {}

const WithdrawNFTSuccess: FC<IProp> = ({}) => {
  const { valueNFT } = useWithDrawNFTContext();
  const [etherLinkContract, setEtherLinkContract] = useState<string>();

  useMemo(async () => {
    const networkId = await getNetworkId();
    if (!networkId) return '';

    const baseEtherLink = ETHERS_LINK[networkId as keyof typeof ETHERS_LINK];
    const etherLink = `${baseEtherLink}/${valueNFT?.tokenAddress}`;
    setEtherLinkContract(etherLink);

    return etherLink;
  }, [valueNFT?.tokenAddress]);

  return (
    <>
      <div className="grow">
        <div className="px-6">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <CircleCheckSuccessOutline />
          </div>

          <div className="mt-6 text-center text-2xl text-white">Withdrawal complete</div>
          <div className="text-base/9 text-sm text-center mt-4">
            <span>
              <Trans>
                Your withdrawal was successful, you should now see your item in your L1 wallet.
              </Trans>
            </span>
          </div>
        </div>
        <div className="mt-8 text-sm font-normal rounded-lg bg-base/2/50 p-4 text-white">
          <div className="flex justify-between">
            <span className="text-base/9">
              <Trans>Item</Trans>
            </span>
            <span className="flex font-medium">{valueNFT.name}</span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="flex items-center text-base/9">
              <Trans>Transaction ID</Trans>
            </span>
            <a
              target={'_blank'}
              href={etherLinkContract}
              className="flex items-center text-primary/6 font-medium cursor-pointer"
              rel="noreferrer">
              <Trans>View</Trans>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
            triggerWithdraw?.click();
          }}
          className="flex w-full items-center justify-center rounded-lg bg-primary/6 px-5 py-3 text-base font-bold text-base/1">
          <span>
            <Trans>OK</Trans>
          </span>
        </button>
      </div>
    </>
  );
};
export default WithdrawNFTSuccess;
