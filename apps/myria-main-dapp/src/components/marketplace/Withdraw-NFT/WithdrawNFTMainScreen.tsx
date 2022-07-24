import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { assetModule } from 'src/services/myriaCore';
import { useQuery } from 'react-query';
import { validatedImage } from 'src/utils';
import { toast } from 'react-toastify';
interface IProp {
  valueNFT: any;
  onChangeStatus: () => void;
}

const WithdrawNFTMainScreen: FC<IProp> = ({ valueNFT, onChangeStatus }) => {
  const { handleWithdrawing, valueNFT: assetDetail } = useWithDrawNFTContext();
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', assetDetail.id],
    async () => {
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3
      };
      const myriaClient = new MyriaClient(client);
      const moduleFactory = new Modules.ModuleFactory(myriaClient);
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

  const handleConfirmWithdrawNftOffchain = async () => {
    /// call api confirm withdraw
    if (starkKey) {
      const getVaultDetail = await assetModule?.getAssetVaultDetails(
        starkKey,
        valueNFT.assetMintId
      );

      if (getVaultDetail?.status === 'success') {
        const dataVaultDetail = getVaultDetail.data;
        const client: IMyriaClient = {
          provider: window.web3.currentProvider,
          networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
          web3: window.web3
        };

        const myriaClient = new MyriaClient(client);
        const moduleFactory = new Modules.ModuleFactory(myriaClient);
        const withdrawModule = moduleFactory.getWithdrawModule();
        const withdraw = await withdrawModule?.withdrawNftOffChain({
          id: valueNFT.id,
          vaultId: dataVaultDetail.vaultId,
          assetId: dataVaultDetail.assetId,
          quantizedAmount: 1,
          starkKey: dataVaultDetail.starkKey
        });
        await refetch();
        handleWithdrawing(true);
        onChangeStatus();
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
          <span className="text-base/9">Estimated gas fee</span>
          <span className="flex">
            <DAOIcon /> 10-20 hours
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
