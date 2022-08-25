import { Trans } from '@lingui/macro';
import { ConfirmationType } from 'myria-core-sdk';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DAOIcon from 'src/components/icons/DAOIcon';
import WithdrawalCompletedIcon from 'src/components/icons/WithdrawalCompletedIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWalletContext } from 'src/context/wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import useTransactionList from 'src/hooks/useTransactionList';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { TokenType } from 'src/packages/l2-wallet/src/common/type';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { WalletTabs } from 'src/types';
import { StatusWithdrawNFT } from 'src/types/marketplace';

interface IProp {}

const WithdrawNFTCompleting: FC<IProp> = ({}) => {
  const [pending, setPending] = useState(false);
  const { showWithdrawCompleteScreen } = useL2WalletContext();

  const { address } = useWalletContext();
  const { valueNFT, setStatus } = useWithDrawNFTContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );

  const { refetch: refetchTransactionList } = useTransactionList(starkKeyUser);

  const withdrawNftOnchain = async () => {
    const starkKey = '0x' + starkKeyUser;

    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;
    const withdrawalModule = moduleFactory.getWithdrawModule();
    const assetModule = moduleFactory.getAssetModule();
    setPending(true);

    try {
      const getVaultDetail = await assetModule?.getAssetVaultDetails(
        starkKey,
        valueNFT?.assetMintId + ''
      );
      if (!getVaultDetail || !address || !starkKeyUser) return;
      let blueprint;
      if (valueNFT.isComeFrom === WalletTabs.HISTORY) {
        blueprint = valueNFT.blueprint;
      } else {
        const orignialMetadataUrl = valueNFT.uri.substring(0, valueNFT.uri.lastIndexOf('/'));
        blueprint = `${orignialMetadataUrl}/${valueNFT.tokenId}`;
      }
      const mintingblob = `{${valueNFT.tokenId}}:{${blueprint}}`;

      const result = await withdrawalModule.withdrawAndMint(
        {
          assetType: getVaultDetail?.data?.assetType,
          starkKey: address,
          walletAddress: address,
          tokenType: TokenType.MINTABLE_ERC721,
          tokenAddress: valueNFT.tokenAddress,
          mintingBlob: mintingblob
        },
        {
          from: address,
          nonce: Math.floor(Math.random() * 10000),
          confirmationType: ConfirmationType.Sender
        }
      );
      if (result && result.transactionHash) {
        await withdrawalModule.withdrawNftComplete({
          assetId: getVaultDetail?.data?.assetId,
          starkKey,
          transactionHash: result.transactionHash
        });
        showWithdrawCompleteScreen({
          transactionHash: result.transactionHash,
          claimAmount: '1'
        });

        refetchTransactionList();
        setStatus(StatusWithdrawNFT.SUCCESS);
      }
    } catch (err) {
      setStatus(StatusWithdrawNFT.FAILED);
      toast('Something wrong has happened, withdraw transaction is failure. Please retry..');
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <div className="grow">
        <div className="px-6">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <WithdrawalCompletedIcon size={64} className="text-light-green w-full" />
          </div>

          <div className="mt-6 text-center text-2xl text-white">Complete your withdrawal</div>
          <div className="text-gray/6 mt-4 text-center text-sm">
            <span>
              <Trans>
                Click below to claim this withdrawal to your L1 wallet. Gas fees will apply to this
                transaction.
              </Trans>
            </span>
          </div>
        </div>
        <div className="bg-base/2/50 mt-8 rounded-lg p-4 text-sm text-white">
          <div className="flex justify-between">
            <span>
              <Trans>Item</Trans>
            </span>
            <span className="flex">{valueNFT.name}</span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="flex items-center gap-1">
              <Trans>Estimated gas fee</Trans>
            </span>
            <span className="flex items-center">
              <DAOIcon size={14} />
              0.000561
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {pending ? (
          <button className="bg-gray/4 text-gray/6 flex w-full items-center justify-center rounded-lg px-5 py-3 text-base font-bold">
            <span>
              <Trans>WITHDRAW PENDING</Trans>
            </span>
          </button>
        ) : (
          <button
            onClick={withdrawNftOnchain}
            className="flex w-full items-center justify-center rounded-[8px] bg-[#F5B941] px-[20px] py-[12px] text-[16px] font-bold text-[#040B10]">
            <span>
              <Trans>WITHDRAW NOW</Trans>
            </span>
          </button>
        )}
      </div>
    </>
  );
};
export default WithdrawNFTCompleting;
