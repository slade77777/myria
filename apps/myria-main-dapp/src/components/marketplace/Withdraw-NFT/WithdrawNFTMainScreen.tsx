import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { assetModule } from 'src/services/myriaCore';
import cn from 'classnames';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { validatedImage } from 'src/utils';
import { toast } from 'react-toastify';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { WithdrawNftOffChainParams } from 'myria-core-sdk/dist/types/src/types/WithdrawType';
import { Trans } from '@lingui/macro';
import { queryClient } from 'src/pages/_app';
import { useL2WalletContext } from 'src/context/l2-wallet';
interface IProp {
  valueNFT: any;
  onChangeStatus: () => void;
}

const WithdrawNFTMainScreen: FC<IProp> = ({ valueNFT, onChangeStatus }) => {
  const { valueNFT: assetDetail, handleLearnMore } = useWithDrawNFTContext();
  const { handleDisplayPopoverWithdrawNFT } = useL2WalletContext();

  const [isPending, setIsPending] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', +assetDetail.id],
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
      // enabled: !!assetDetail.id
    }
  );
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = `0x${starkKeyUser}`;
  const { event } = useGA4();
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();

  const handleConfirmWithdrawNftOffchain = async () => {
    /// call api confirm withdraw
    if (starkKey) {
      setIsPending(true);
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
        if (!moduleFactory || !data || !data.assetDetails || !address) return;

        const withdrawModule = moduleFactory.getWithdrawModule();
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
        await queryClient.invalidateQueries(['assetDetail', +assetDetail.id]);
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
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="grow">
        <div
          className="mx-auto mt-14 flex h-16 w-16 justify-center bg-cover bg-center rounded-full"
          style={{
            backgroundImage: `url(${validatedImage(valueNFT.imageUrl)})`
          }}></div>

        <div className="mt-6 text-center text-2xl text-white">Withdraw NFT to L1 wallet</div>
        <div className="text-sm text-base/9 text-center mt-4">
          <Trans>Withdrawals are processed in batches every 20 hours. Click</Trans>{' '}
          <span
            onClick={() => {
              handleLearnMore(true);
            }}
            className="text-primary/6 cursor-pointer">
            <Trans>here</Trans>
          </span>{' '}
          <Trans>to learn more.</Trans>
        </div>
        <div className="mt-8 rounded-lg bg-base/2 p-4 text-sm text-white">
          <div className="flex justify-between">
            <span className="text-base/9">Item</span>
            <span>{valueNFT.name}</span>
          </div>
          <div className="mt-[13px] flex justify-between">
            <span className="text-base/9">
              <Trans>Estimated completion</Trans>
            </span>
            <span className="flex">10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleDisplayPopoverWithdrawNFT(false)}
          className="flex w-32 items-center justify-center rounded-lg px-5 py-3 text-base font-bold text-white border">
          <Trans>CANCEL</Trans>
        </button>
        <button
          className={cn(
            'flex w-32 items-center justify-center rounded-lg  px-5 py-3 text-base font-bold',
            isPending ? 'text-gray/6 bg-gray/4' : 'bg-primary/6 text-base/1'
          )}
          disabled={isPending}
          onClick={handleConfirmWithdrawNftOffchain}>
          <Trans>CONFIRM</Trans>
        </button>
      </div>
    </>
  );
};
export default WithdrawNFTMainScreen;
