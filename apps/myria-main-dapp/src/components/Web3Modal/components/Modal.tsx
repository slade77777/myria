import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Provider } from './Provider';
import { SimpleFunction, IProviderUserOptions, ThemeColors } from '../helpers';
import Dialog from 'src/components/Modal';

declare global {
  // tslint:disable-next-line
  interface Window {
    ethereum: any;
    BinanceChain: any;
    web3: any;
    celo: any;
    updateWeb3Modal: any;
  }
}

interface IModalProps {
  themeColors: ThemeColors;
  userOptions: IProviderUserOptions[];
  onClose: SimpleFunction;
  resetState: SimpleFunction;
  lightboxOpacity: number;
}

interface IModalState {
  show: boolean;
  lightboxOffset: number;
}

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0
};

export class Modal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    window.updateWeb3Modal = async (state: IModalState) => {
      this.setState(state);
    };
  }
  public static propTypes = {
    userOptions: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    lightboxOpacity: PropTypes.number.isRequired
  };

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;

  public state: IModalState = {
    ...INITIAL_STATE
  };

  public componentDidUpdate(prevProps: IModalProps, prevState: IModalState) {
    if (prevState.show && !this.state.show) {
      this.props.resetState();
    }
    if (this.lightboxRef) {
      const lightboxRect = this.lightboxRef.getBoundingClientRect();
      const lightboxOffset = lightboxRect.top > 0 ? lightboxRect.top : 0;

      if (
        lightboxOffset !== INITIAL_STATE.lightboxOffset &&
        lightboxOffset !== this.state.lightboxOffset
      ) {
        this.setState({ lightboxOffset });
      }
    }
  }

  public render = () => {
    const { show } = this.state;

    const { onClose, userOptions, themeColors } = this.props;

    return (
      <Dialog open={show} onOpenChange={onClose}>
        <Dialog.Content
          title="Connect a wallet"
          className="w-[380px] shadow-[0_0_40px_10px_#0000004D] md:w-[576px]">
          <div className="mb-[50px] grid grid-cols-1 gap-8 px-8 pt-11 md:grid-cols-2">
            {userOptions.map((provider) =>
              !!provider ? (
                <Provider
                  name={provider.name}
                  logo={provider.logo}
                  description={provider.description}
                  themeColors={themeColors}
                  onClick={provider.onClick}
                />
              ) : null
            )}
          </div>
        </Dialog.Content>
      </Dialog>
    );
  };
}
