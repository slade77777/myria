import SettingIcon from '../icons/SettingIcon';
import ReactDOM from 'react-dom';
import videojs from 'video.js';
import Switch from '../Switch';
import {
  toggleAutoPlayInGameDetail,
  useAutoPlayInGameDetail
} from '../../valtio/autoPlayInGameDetail';
import { Trans } from '@lingui/macro';
import Popover from '../Popover';

const SettingContent: React.FC = () => {
  const autoPlay = useAutoPlayInGameDetail();

  return (
    <label className="flex items-center rounded-[5px] bg-brand-dark-blue py-2 px-4 text-white">
      <div>
        <p className="text-[14px]">
          <Trans>Autoplay</Trans>
        </p>
        <p className="text-[12px] text-light">
          <Trans>Applies to all videos</Trans>
        </p>
      </div>
      <div className="ml-4">
        <Switch defaultChecked={autoPlay} onChange={toggleAutoPlayInGameDetail} />
      </div>
    </label>
  );
};

const SettingComponent: React.FC<{}> = ({}) => {
  return (
    <Popover modal>
      <Popover.Trigger asChild>
        <span className="inline-flex w-[13px] cursor-pointer">
          <SettingIcon />
        </span>
      </Popover.Trigger>
      <Popover.Content asChild side="top" sideOffset={10}>
        <div>
          <SettingContent />
        </div>
      </Popover.Content>
    </Popover>
  );
};

const vjsComponent = videojs.getComponent('Component');

class ControlBarSettings extends vjsComponent {
  constructor(player: videojs.Player, options: videojs.PlayerOptions) {
    super(player, options);
    this.mount = this.mount.bind(this);
    player.ready(() => {
      this.mount();
    });
    this.on('dispose', () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  mount() {
    ReactDOM.render(<SettingComponent />, this.el());
  }
}

vjsComponent.registerComponent('ControlBarSettings', ControlBarSettings);
