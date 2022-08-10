import { Trans } from '@lingui/macro';
import { Types } from 'myria-core-sdk';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import WithdrawalCompletedIcon from 'src/components/icons/WithdrawalCompletedIcon';
import { useWalletContext } from 'src/context/wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { TokenType } from 'src/packages/l2-wallet/src/common/type';
import { StatusWithdrawNFT } from 'src/types/marketplace';
import { getModuleFactory } from 'src/services/myriaCoreSdk';

interface IProp {}

const WithdrawNFTCompleting: FC<IProp> = ({}) => {
  const [pending, setPending] = useState(false);
  const { address } = useWalletContext();
  const { valueNFT, setStatus } = useWithDrawNFTContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
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
      const blueprint = valueNFT.uri;
      const orignialMetadataUrl = blueprint.substring(0, valueNFT.uri.lastIndexOf('/'));
      const originalBlueprint = `${orignialMetadataUrl}/${valueNFT.tokenId}`;
      const mintingblob = `{${valueNFT.tokenId}}:{${originalBlueprint}}`;

      const result = await withdrawalModule.withdrawAndMint(
        {
          assetType: getVaultDetail.data.assetType,
          starkKey: address,
          walletAddress: address,
          tokenType: TokenType.MINTABLE_ERC721,
          tokenAddress: valueNFT.tokenAddress,
          mintingBlob: mintingblob
        },
        {
          from: address,
          nonce: Math.floor(Math.random() * 10000),
          confirmationType: Types.ConfirmationType.Confirmed
        }
      );
      if (result) {
        await withdrawalModule.withdrawNftComplete({
          assetId: getVaultDetail.data.assetId,
          id: valueNFT.id,
          starkKey
        });
        setStatus(StatusWithdrawNFT.SUCCESS);
      }
    } catch (err) {
      console.log(err);
      setStatus(StatusWithdrawNFT.FAILED);
    } finally {
      setPending(false);
      const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
      triggerWithdraw?.click();
    }
  };
  return (
    <>
      <div className="grow">
        <div className="px-6">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <WithdrawalCompletedIcon size={64} className="w-full text-light-green" />
          </div>

          <div className="mt-6 text-center text-2xl text-white">Complete your withdrawal</div>
          <div className="text-gray/6 text-sm text-center mt-4">
            <span>
              <Trans>
                Click below to claim this withdrawal to your L1 wallet. Gas fees will apply to this
                transaction.
              </Trans>
            </span>
          </div>
        </div>
        <div className="mt-8 text-sm  rounded-lg bg-base/2/50 p-4 text-white">
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
          <button className="flex w-full items-center justify-center rounded-lg bg-gray/4 px-5 py-3 text-base font-bold text-gray/6">
            <span>
              <Trans>WITHDRAW PENDING</Trans>
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              withdrawNftOnchain();
            }}
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
