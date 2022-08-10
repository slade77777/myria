import { Trans } from '@lingui/macro';
import React, { useEffect, useState } from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { getNetworkId } from 'src/services/myriaCoreSdk';
import { getExplorerForAddress, truncateAddress } from 'src/utils';
import { Arrow3Icon } from '../../Icons';
import { renderType } from './MainScreen';

interface TProps {
  goBack: React.MouseEventHandler<HTMLButtonElement>;
  transactionDetail: any;
}

export default function TransactionHistoryDetailScreen({
  transactionDetail,
}: TProps) {
  const [etherLinkContract, setEtherLinkContract] = useState<string>();
  useEffect(() => {
    const setLink = async () => {
      const networkId = await getNetworkId();
      if (!networkId || !transactionDetail?.transactionHash) return '';
      setEtherLinkContract(
        getExplorerForAddress(transactionDetail?.transactionHash, networkId),
      );
    };
    setLink();
  }, [transactionDetail?.transactionHash]);

  return (
    <div className="text-base/10 mt-[29px]">
      <div className="mx-auto flex h-16 w-16 justify-center">
        <Arrow3Icon direction="bottom" className="text-blue/6 mr-1" size={60} />
      </div>

      <div className="text-base/10 mt-6 text-center text-2xl">
        {renderType(transactionDetail.type)}
      </div>
      {transactionDetail.status === 'success' ? (
        <div className="text-base/9 text-center text-sm">
          Transaction completed {transactionDetail.updatedAt}
        </div>
      ) : (
        <div className="text-base/9 text-center text-sm">
          Transaction started {transactionDetail.createdAt}
        </div>
      )}

      <div className="bg-base/2/50 mt-8 rounded-lg p-4 text-sm">
        {transactionDetail.transactionType !== 'SettlementRequest' && (
          <div className="flex justify-between">
            <span className="text-base/9">
              <Trans>Amount</Trans>
            </span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={12} className="mb-[2px]" />
              <span className="ml-1">{transactionDetail.amount}</span>
            </span>
          </div>
        )}
        {transactionDetail.transactionType === 'SettlementRequest' && (
          <>
            <div className="flex justify-between">
              <span className="text-base/9">
                <Trans>Item</Trans>
              </span>
              <span className="ml-1">
                {transactionDetail.transactionCategory}
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-base/9">
                <Trans>Purchased from</Trans>
              </span>
              <span className="ml-1">
                {truncateAddress(transactionDetail.partyAOrder.publicKey)}
              </span>
            </div>
          </>
        )}
        {transactionDetail.transactionType === 'DepositRequest' && (
          <div className="mt-4 flex justify-between">
            <span className="text-base/9 text-sm">Transaction ID</span>
            <a
              className="text-primary/6 flex cursor-pointer items-center text-base"
              target="_blank"
              href={etherLinkContract}
              rel="noreferrer"
            >
              <Trans>View</Trans>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
