import moment from 'moment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TOption } from 'src/packages/l2-wallet/src/components/Dropdown/CurrencySelector';
import { STATUS_HISTORY } from 'src/packages/l2-wallet/src/components/Popover/L2Wallet/MainScreen';
import { options } from 'src/packages/l2-wallet/src/components/Popover/L2WalletPopover';
import { getModuleFactory } from 'src/packages/l2-wallet/src/services/myriaCoreSdk';
import { convertQuantizedAmountToEth } from 'src/packages/l2-wallet/src/utils/Converter';

export default function useTransactionList(starkKey: string) {
  const [historyData, setHistoryData] = useState([]);
  const queryKey = ['transactionList', `${starkKey}`];
  const { data, isLoading, error, refetch } = useQuery(
    queryKey,
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory || !starkKey) return;

      let data = [];
      const transactionModule = moduleFactory.getTransactionManager();
      const transactionHistoryResponse = await transactionModule.getTransactionList(
        '0x' + starkKey
      );

      if (transactionHistoryResponse.status === 'success' && transactionHistoryResponse?.data) {
        data = transactionHistoryResponse?.data;
        setHistoryData(transactionHistoryResponse?.data);
      }

      const result = data
        .filter((item: any, index: number) => {
          if (item.assetType || item.settlementInfo) return true;
          else return false;
        })
        .map((transaction: any, index: number) => {
          const matched = options.filter(
            (option: TOption, index: number) => option.assetType === transaction.assetType
          );
          if (matched && matched.length > 0) {
            return {
              ...transaction,
              ...matched[0]
            };
          } else return transaction;
        });

      const processedData = result
        .sort((a: any, b: any) => b.createdAt - a.createdAt)
        .map((item: any, index: number) => {
          // TEMPORARILY TODO
          /**
           * If all of the transactions (except withdraw) has pending status in BE
           * We assume that it is success status on FE until the BE have newer version for that changes
           */
          const transactionStatus =
            item.transactionType === 'WithdrawalRequest' ||
            item.transactionType === 'TransferRequest'
              ? item.transactionStatus
              : item.transactionStatus === STATUS_HISTORY.IN_PROGRESS ||
                item.transactionStatus === STATUS_HISTORY.PREPARE
              ? STATUS_HISTORY.SUCCESS
              : item.transactionStatus;
          return {
            ...item,
            id: index,
            type: item.transactionType,
            amount: item.partyAOrder
              ? convertQuantizedAmountToEth(item.partyAOrder.amountSell)
              : item.name === 'Ethereum'
              ? convertQuantizedAmountToEth(item.quantizedAmount)
              : item.quantizedAmount,
            time: moment(item.createdAt).fromNow(),
            updatedAt: moment(item.updatedAt).fromNow(),
            status: transactionStatus,
            ico: '/assets/images/eth.svg'
          };
        });
      return processedData;
    },
    {
      enabled: !!starkKey
    }
  );

  return {
    transactionHistoryData: historyData,
    data,
    isLoading,
    error,
    refetch
  };
}
