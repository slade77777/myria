import cn from 'classnames';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { queryClient } from 'src/pages/_app';
import { assetModule } from 'src/services/myriaCore';
import { validatedImage } from 'src/utils';
import {
  ArrowIcon,
  ThreeDotsVerticalIcon,
  ArrowUpLeftIcon
} from 'src/packages/l2-wallet/src/components/Icons';
import LogoutIcon from 'src/components/icons/LogoutIcon';
import InventoryIcon from 'src/components/icons/InventoryIcon';
import DropdownMenu from 'src/components/DropdownMenu';
import Link from 'next/link';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { WithdrawNftOffChainParams } from 'myria-core-sdk';
import { Trans } from '@lingui/macro';
import { useGA4 } from 'src/lib/ga';
interface IProp {
  valueNFT: any;
  onChangeStatus: () => void;
}

const WithdrawNFTMainScreen: FC<IProp> = ({ valueNFT, onChangeStatus }) => {
  const { valueNFT: assetDetail, handleLearnMore } = useWithDrawNFTContext();
  const { handleDisplayPopoverWithdrawNFT, disconnectL2Wallet } = useL2WalletContext();

  const [isPending, setIsPending] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', +assetDetail.id],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const assetModule = moduleFactory.getAssetOnchainManager();
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
  const { user, logout } = useAuthenticationContext();
  const { address, disconnect } = useWalletContext();

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
        <div className="flex justify-between">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => handleDisplayPopoverWithdrawNFT(false)}>
            <ArrowIcon direction="left" />
            <div className="text-base/10 ml-2 text-[20px]">Withdraw</div>
          </div>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <div className="text-primary/6">
                <ThreeDotsVerticalIcon className="text-base/9" size={32} />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="text-base/2 rounded-md bg-current p-3">
              <DropdownMenu.Arrow className="translate-x-3 fill-current" />
              <div className="text-white">
                <button
                  className="body-14-medium flex items-center space-x-2.5 text-white"
                  onClick={() => {
                    disconnect();
                    disconnectL2Wallet();
                    logout();
                  }}>
                  <i className="w-4">
                    <LogoutIcon />
                  </i>
                  <span>Disconnect</span>
                </button>
                <div className="mt-2 text-white">
                  <Link href={'/marketplace/inventory'}>
                    <a
                      href={'/marketplace/inventory'}
                      className="body-14-medium flex cursor-pointer items-center space-x-2.5 text-white"
                      onClick={() => handleDisplayPopoverWithdrawNFT(false)}>
                      <i className="w-4">
                        <InventoryIcon />
                      </i>
                      <span>
                        <Trans>Inventory</Trans>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <div className="mx-auto mt-8 flex h-16 w-16 justify-center">
          <ArrowUpLeftIcon size={64} className="w-full text-[#9AC9E3]" />
        </div>
        <div className="mt-6 text-center text-2xl text-white">Withdraw NFT to L1 wallet</div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
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
        <div className="bg-base/2/50 text-base/9 mt-4 rounded-lg p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-base/9">Item</span>
            <span className="text-white">{valueNFT.name}</span>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Estimated gas fee</Trans>
            </span>
            <span className="flex items-center">
              <DAOIcon size={16} className="mr-1 mb-[2px]" />
              <span className="text-white">0.000561</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleDisplayPopoverWithdrawNFT(false)}
          className="border-base/9 flex h-10 w-full max-w-[126px] items-center justify-center rounded-lg border text-base font-bold text-white">
          <Trans>CANCEL</Trans>
        </button>
        <button
          className={cn(
            'flex h-10 w-[126px] items-center justify-center rounded-lg text-base font-bold',
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
