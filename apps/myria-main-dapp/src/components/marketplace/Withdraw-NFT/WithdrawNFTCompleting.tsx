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
      const result = await withdrawalModule.withdrawAndMint(
        {
          assetType: getVaultDetail.data.assetType,
          starkKey: starkKey,
          walletAddress: address,
          tokenType: TokenType.MINTABLE_ERC721,
          tokenAddress: valueNFT.tokenAddress,
          mintingBlob: `{${valueNFT.tokenId}}:{${blueprint}}`
        },
        {
          from: address,
          nonce: Math.floor(Math.random() * 10000),
          confirmationType: Types.ConfirmationType.Confirmed
        }
      );
      if (result) {
        const resultWithdrawComplete = await withdrawalModule.withdrawNftComplete({
          assetId: getVaultDetail.data.assetId,
          id: valueNFT.id,
          starkKey,
          vaultId: getVaultDetail.data.vaultId
        });
        setStatus(StatusWithdrawNFT.SUCCESS);
      }
    } catch (err) {
      console.log(err);
      setStatus(StatusWithdrawNFT.FAILED);
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="mt-[29px]">
      <div className="px-[25px]">
        <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
          <WithdrawalCompletedIcon size={64} className="w-full text-[#9ECEAB]" />
        </div>

        <div className="mt-[24px] text-center text-[24px] text-white">Complete your withdrawal</div>
        <div className="text-[#777777] text-[14px] text-center mt-4">
          <span>
            <Trans>
              Click below to claim this withdrawal to your L1 wallet. Gas fees will apply to this
              transaction.
            </Trans>
          </span>
        </div>
      </div>
      <div className="mt-[32px] text-[14px]  rounded-[8px] bg-base/2/[.5] p-4 text-white">
        <div className="flex justify-between">
          <span>
            <Trans>Item</Trans>
          </span>
          <span className="flex">{valueNFT.name}</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="flex items-center gap-1">
            <Trans>Estimated gas fee</Trans>
          </span>
          <span className="flex items-center">
            <DAOIcon size={14} />
            0.000561
          </span>
        </div>
      </div>
      <div className="mt-[138px] flex justify-end">
        {pending ? (
          <button className="flex w-full items-center justify-center rounded-[8px] bg-gray/4 px-[20px] py-[12px] text-[16px] font-bold text-gray/6">
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
    </div>
  );
};
export default WithdrawNFTCompleting;
