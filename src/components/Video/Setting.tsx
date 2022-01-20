import SettingIcon from "../icons/SettingIcon";
import ReactDOM from "react-dom";
import videojs from "video.js";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Switch from "../Switch";
import {
  toggleAutoPlayInGameDetail,
  useAutoPlayInGameDetail,
} from "../../valtio/autoPlayInGameDetail";

const SettingContent: React.FC = () => {
  const autoPlay = useAutoPlayInGameDetail();

  return (
    <label className="flex items-center py-2 px-4 text-white bg-brand-dark-blue rounded-[5px]">
      <div>
        <p className="text-[14px]">Autoplay</p>
        <p className="text-[12px] text-light">Applies to all videos</p>
      </div>
      <div className="ml-4">
        <Switch
          defaultChecked={autoPlay}
          onChange={toggleAutoPlayInGameDetail}
        />
      </div>
    </label>
  );
};

const SettingComponent: React.FC<{}> = ({}) => {
  return (
    <PopoverPrimitive.Root modal>
      <PopoverPrimitive.Trigger asChild>
        <span className="w-[13px] inline-flex cursor-pointer">
          <SettingIcon />
        </span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content asChild side="top" sideOffset={10}>
        <div>
          <SettingContent />
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

const vjsComponent = videojs.getComponent("Component");

class ControlBarSettings extends vjsComponent {
  constructor(player: videojs.Player, options: videojs.PlayerOptions) {
    super(player, options);
    this.mount = this.mount.bind(this);
    player.ready(() => {
      this.mount();
    });
    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  mount() {
    ReactDOM.render(<SettingComponent />, this.el());
  }
}

vjsComponent.registerComponent("ControlBarSettings", ControlBarSettings);
