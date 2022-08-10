import { FC } from 'react';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { assetModule } from 'src/services/myriaCore';
import { useQuery } from 'react-query';
import { validatedImage } from 'src/utils';
import { toast } from 'react-toastify';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { WithdrawNftOffChainParams } from 'myria-core-sdk/dist/types/src/types/WithdrawType';
import { Trans } from '@lingui/macro';
interface IProp {
  valueNFT: any;
  onChangeStatus: () => void;
}

const WithdrawNFTMainScreen: FC<IProp> = ({ valueNFT, onChangeStatus }) => {
  const { handleWithdrawing, valueNFT: assetDetail } = useWithDrawNFTContext();
  const { address } = useWalletContext();
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', assetDetail.id],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const assetModule = moduleFactory.getAssetModule();
      const [assetDetails, listOrder] = await Promise.all([
        assetModule?.getAssetById(assetDetail.id), //getAssetDetail by assetId
        assetModule?.getAssetEqualMetadataById({ assetId: +assetDetail.id }) //getListOrder by assetId
      ]);
      return { assetDetails: assetDetails?.data, listOrder: listOrder?.data };
    },
    {
      enabled: !!assetDetail.id
    }
  );
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = `0x${starkKeyUser}`;
  const { event } = useGA4();
  const { user } = useAuthenticationContext();

  const handleConfirmWithdrawNftOffchain = async () => {
    /// call api confirm withdraw
    if (starkKey) {
      event('NFT Withdraw Selected', {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        L2_wallet_address: `_${starkKey}`,
        item_name: valueNFT.name,
        item_id: valueNFT.id
      });
      const getVaultDetail = await assetModule?.getAssetVaultDetails(
        starkKey,
        valueNFT.assetMintId
      );

      if (getVaultDetail?.status === 'success') {
        const moduleFactory = await getModuleFactory();
        if (!moduleFactory || !data || !data?.assetDetails || !address) return;

        const withdrawModule = moduleFactory.getWithdrawModule();

        handleWithdrawing(true);
        const payloadWithdrawNftOffchain: WithdrawNftOffChainParams = {
          id: data?.assetDetails?.id,
          tokenId: data?.assetDetails?.tokenId,
          tokenAddress: data?.assetDetails?.tokenAddress,
          senderVaultId: getVaultDetail.data.vaultId,
          senderPublicKey: starkKey,
          receiverPublicKey: address,
          assetId: data?.assetDetails?.assetMintId,
          quantizedAmount: '1'
        };
        await withdrawModule?.withdrawNftOffChain(payloadWithdrawNftOffchain);
        handleWithdrawing(false);

        await refetch();

        onChangeStatus();
        event('NFT Withdraw Completed', {
          myria_id: user?.user_id,
          wallet_address: `_${address}`,
          L2_wallet_address: `_${starkKeyUser}`,
          item_name: valueNFT.name,
          item_id: valueNFT.id,
          trx_url: ''
        });
      }
    }
  };

  return (
    <div className="mt-[29px]">
      <div
        className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center bg-cover bg-center rounded-full"
        style={{
          backgroundImage: `url(${validatedImage(valueNFT.imageUrl)})`
        }}></div>

      <div className="mt-[24px] text-center text-[24px] text-white">Withdraw NFT to L1 wallet</div>
      <div className="text-[14px] text-base/9 text-center mt-4">
        Withdrawals are processed in batches every 20 hours. Click{' '}
        <span
          onClick={() => {
            toast('This function is not ready!');
          }}
          className="text-[#F5B941] cursor-pointer">
          here
        </span>{' '}
        to learn more.
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[14px] text-white">
        <div className="flex justify-between">
          <span className="text-base/9">Item</span>
          <span>{valueNFT.name}</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="text-base/9"><Trans>Estimated completion</Trans></span>
          <span className="flex">
            10-20 hours
          </span>
        </div>
      </div>
      <div className="mt-[138px] flex justify-between">
        <button
          onClick={() => {
            const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
            triggerWithdraw?.click();
          }}
          className="flex w-[126px] items-center justify-center rounded-[8px] px-[20px] py-[12px] text-[16px] font-bold text-white border">
          CANCEL
        </button>
        <button
          className="flex w-[126px] items-center justify-center rounded-[8px] bg-[#F5B941] px-[20px] py-[12px] text-[16px] font-bold text-[#040B10]"
          onClick={handleConfirmWithdrawNftOffchain}>
          CONFIRM
        </button>
      </div>
    </div>
  );
};
export default WithdrawNFTMainScreen;
