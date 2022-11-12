import React, { memo, useCallback, useEffect, useState } from 'react';
import useTransactionList from 'src/hooks/useTransactionList';
import DAOIcon from 'src/components/icons/DAOIcon';
import TailSpin from 'src/components/icons/TailSpin';
import ProgressHistoryIcon from '../../Icons/ProgressHistoryIcon';
import ChevronIcon from '../../Icons/ChevronIcon';
import WithdrawNFTIcon from '../../Icons/WithdrawNFTIcon';
import { CircleCloseIcon, CompletedIcon } from '../../Icons';
import { convertQuantizedAmountToEth } from '../../../utils/Converter';
import cn from 'classnames';
import {
  DF_TRANSACTION_TYPE,
  STATUS_HISTORY,
  TRANSACTION_TYPE,
} from './MainScreen';
import { getModuleFactory } from '../../../services/myriaCoreSdk';

type Props = {
  localStarkKey: string;
  l1Balance: number;
  walletAddress: string;
  starkKeyUser: string;
  onWithdrawActionFromHistory: any;
  showWithdrawPopover: any;
  gotoDetailTransaction?: any;
};

function HistoryTab({
  localStarkKey,
  l1Balance,
  onWithdrawActionFromHistory,
  gotoDetailTransaction,
  showWithdrawPopover,
  walletAddress,
  starkKeyUser,
}: Props) {
  const { data: transactionListHistory } = useTransactionList(localStarkKey);

  const renderAmount = useCallback(
    (type: string, amount: number, item: any) => {
      const starkKey = `0x${starkKeyUser}`;
      switch (type) {
        case TRANSACTION_TYPE.SETTLEMENT:
          if (item.partyAOrder && starkKey === item.partyAOrder.publicKey) {
            return convertQuantizedAmountToEth(item.partyAOrder.amountBuy);
          } else {
            return convertQuantizedAmountToEth(item.partyBOrder.amountSell);
          }
        case TRANSACTION_TYPE.ROYALTYTRANSFER:
          return convertQuantizedAmountToEth(item.quantizedAmount);
        default:
          return amount;
      }
    },
    [],
  );

  const renderStatus = useCallback(
    (item: any) => {
      if (
        item.status === STATUS_HISTORY.IN_PROGRESS ||
        item.status === STATUS_HISTORY.IN_PROGRESS_VALIDATING ||
        item.status === STATUS_HISTORY.PREPARE
      ) {
        return (
          <div className="text-base/9 mt-1 flex items-center">
            In progress <ProgressHistoryIcon size={14} className="ml-1" />
          </div>
        );
      }

      if (item.status === STATUS_HISTORY.FAILED) {
        return (
          <div className="text-error/6 mt-1 flex items-center">
            Failed{' '}
            <CircleCloseIcon
              size={14}
              className="text-error/6 ml-1"
              border={5}
            />
          </div>
        );
      }

      if (item.status === STATUS_HISTORY.SUCCESS) {
        if (item.type === TRANSACTION_TYPE.WITHDRAWAL) {
          if (item.tokenType === 'ETH' && l1Balance > 0) {
            return (
              <button
                onClick={e => {
                  e.stopPropagation();
                  onWithdrawActionFromHistory(item);
                }}
                className="text-primary/6 mt-1 flex cursor-pointer items-center"
              >
                Complete withdrawal{' '}
                <ChevronIcon
                  className="text-primary/6 ml-1"
                  size={14}
                  direction="right"
                />
              </button>
            );
          }

          if (item.tokenType === 'ETH' && l1Balance === 0) {
            return (
              <div className="text-base/9 mt-1 flex items-center">
                In progress <ProgressHistoryIcon size={14} className="ml-1" />
              </div>
            );
          }

          if (item.tokenType === 'MINTABLE_ERC721') {
            return (
              <RenderStatus
                item={item}
                showWithdrawPopover={() => showWithdrawPopover(item)}
                starkKeyUser={`0x${localStarkKey}`}
                address={walletAddress}
              />
            );
          }
        }
        return (
          <div className="text-base/9 mt-1 flex items-center">
            Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
          </div>
        );
      }

      if (
        item.status === STATUS_HISTORY.COMPLETED &&
        (item.type === TRANSACTION_TYPE.TRANSFER ||
          item.type === TRANSACTION_TYPE.WITHDRAWAL)
      ) {
        return (
          <div className="text-base/9 mt-1 flex items-center">
            Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
          </div>
        );
      }
    },
    [l1Balance, localStarkKey, walletAddress],
  );

  const renderIcon = useCallback((item: any) => {
    const iconItem = (avatar: string) => {
      //case avatar = null
      if (!avatar) {
        //type != sale + purchase
        if (item.type !== TRANSACTION_TYPE.SETTLEMENT) {
          return (
            <img className="w-8 flex-none" src={item.ico} alt="token_icon" />
          );
        }
        // type withdraw, transfer, sale, royalty
        if (
          item.type === TRANSACTION_TYPE.WITHDRAWAL ||
          item.type === TRANSACTION_TYPE.TRANSFER ||
          item.type === TRANSACTION_TYPE.SETTLEMENT ||
          item.type === TRANSACTION_TYPE.ROYALTYTRANSFER
        ) {
          return <WithdrawNFTIcon size={32} />;
        }
      }
      return (
        <img
          className="h-8 w-8 flex-none rounded-2xl"
          src={avatar}
          alt="token_icon"
        />
      );
    };
    if (item.type === TRANSACTION_TYPE.DEPOSIT) {
      return <img className="w-8 flex-none" src={item.ico} alt="token_icon" />;
    }

    if (!item.name && item.type === TRANSACTION_TYPE.TRANSFER) {
      return iconItem(item.avatarUrl);
    }

    if (item.type === TRANSACTION_TYPE.ROYALTYTRANSFER) {
      return iconItem(item.tokenSellInfo.tokenAvatarUrl);
    }
    if (item.type === TRANSACTION_TYPE.MINT) {
      return iconItem(item.avatarUrl);
    }
    if (item.type === TRANSACTION_TYPE.WITHDRAWAL) {
      return iconItem(item.avatarUrl);
    }
    if (item.type === TRANSACTION_TYPE.SETTLEMENT) {
      return iconItem(item.sellTokenAvatarUrl);
    }
  }, []);

  const renderTitle = useCallback(
    (item: any) => {
      const startKey = `0x${starkKeyUser}`;
      if (item.type === TRANSACTION_TYPE.SETTLEMENT) {
        if (item.partyAOrder.publicKey === startKey) {
          return 'NFT Sale';
        }
        if (item.partyBOrder.publicKey === startKey) {
          return 'NFT Purchase';
        }
      }
      if (
        !item.name &&
        item.type === TRANSACTION_TYPE.WITHDRAWAL &&
        (item.tokenType === 'MINTABLE_ERC721' || item.tokenType === 'ERC721')
      ) {
        return 'NFT Withdraw';
      }
      if (
        !item.name &&
        item.type === TRANSACTION_TYPE.WITHDRAWAL &&
        (item.tokenType === 'MINTABLE_ERC20' || item.tokenType === 'ERC20')
      ) {
        return 'Token ERC20 Withdraw';
      }
      if (item.type === TRANSACTION_TYPE.ROYALTYTRANSFER) {
        return 'Creator Earnings';
      }
      if (!item.name && item.type === TRANSACTION_TYPE.TRANSFER) {
        return 'NFT Transfer';
      } else {
        return DF_TRANSACTION_TYPE[item?.type]?.title;
      }
    },
    [starkKeyUser],
  );

  return (
    <div className="transaction-popover mt-3 max-h-[290px] overflow-auto">
      {transactionListHistory?.length === 0 && <div>No data available yet</div>}
      {transactionListHistory?.map((item: any, index: number) => (
        <div
          onClick={() => {
            gotoDetailTransaction(item);
          }}
          className={cn(
            'flex cursor-pointer items-center py-4',
            index !== -1 && 'border-b border-white/10',
          )}
          key={index}
        >
          <div className="mr-2">{renderIcon(item)}</div>
          <div className="grow">
            <div className="text-base/10 flex items-center justify-between text-sm">
              <span>{renderTitle(item)}</span>
              <span className="flex items-center">
                <span className="mb-[2px] mr-1">
                  {!item.name &&
                  (item.type === TRANSACTION_TYPE.WITHDRAWAL ||
                    item.type === TRANSACTION_TYPE.TRANSFER) ? (
                    ''
                  ) : (
                    <DAOIcon size={16} />
                  )}
                </span>
                <span>{renderAmount(item.type, item.amount, item)}</span>
              </span>
            </div>
            <div className="text-base/9 flex items-center justify-between text-xs">
              <span>{item.time}</span>
              {renderStatus(item)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(HistoryTab);

const RenderStatus: React.FC<{
  item: any;
  starkKeyUser: string;
  address: string;
  showWithdrawPopover: any;
}> = ({ item, starkKeyUser, address, showWithdrawPopover }) => {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const getBalance = async (item: any) => {
      if (!starkKeyUser || !address || !item?.assetId) return;
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawalModule = moduleFactory.getWithdrawModule();

      const balance = await withdrawalModule.getWithdrawalBalance(
        address.toLowerCase(),
        item?.assetId + '',
      );
      setBalance(Number(balance));
    };
    getBalance(item);
  }, [address, item, starkKeyUser]);

  return (
    <>
      {balance > 0 ? (
        <button
          onClick={e => {
            e.stopPropagation();
            showWithdrawPopover();
          }}
          className="text-primary/6 mt-1 flex cursor-pointer items-center"
        >
          Complete withdrawal{' '}
          <ChevronIcon
            className="text-primary/6 ml-1"
            size={14}
            direction="right"
          />
        </button>
      ) : (
        <div className="text-base/9 mt-1 flex items-center">
          In progress <ProgressHistoryIcon size={14} className="ml-1" />
        </div>
      )}
    </>
  );
};
