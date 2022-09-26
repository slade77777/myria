import { memo, useCallback } from 'react';
import { useWalletContext } from '../../context/wallet';
import CopyIcon from '../icons/CopyIcon';
import useLocalStorage from '../../hooks/useLocalStorage';
import { localStorageKeys } from '../../configs';
import { toast } from 'react-toastify';

const WalletInformation = () => {
  const { address } = useWalletContext();
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');

  const copyToClipboard = useCallback((text: string) => {
    navigator?.clipboard?.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    });
  }, []);

  return (
    <div className="w-full bg-base/3 p-8">
      <div className="pl-6 pt-2">
        <p className="text-base/9 mb-2">Ethereum wallet</p>
        <div className="h-12 px-4 rounded bg-base/4 flex flex-row justify-between items-center">
          <p>{address}</p>
          <div onClick={() => address && copyToClipboard(address)} className="cursor-pointer">
            <CopyIcon />
          </div>
        </div>
        <p className="text-base/9 mb-2 mt-4">Myria wallet</p>
        <div className="h-12 px-4 rounded bg-base/4 flex flex-row justify-between items-center">
          <p>0x{localStarkKey}</p>
          <div
            onClick={() => address && copyToClipboard(`0x${localStarkKey}`)}
            className="cursor-pointer">
            <CopyIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WalletInformation);
