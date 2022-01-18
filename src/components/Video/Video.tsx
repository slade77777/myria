import React, { useRef } from "react";
import {
  Player,
  Settings,
  Video as VMVideo,
  Controls,
  ControlSpacer,
  PlaybackControl,
  TimeProgress,
  Scrim,
  Ui,
  ControlGroup,
  ScrubberControl,
  VolumeControl,
  FullscreenControl,
  ClickToPlay,
  SettingsControl,
  MenuItem,
  MenuRadioGroup,
  Submenu,
  MenuRadio,
} from "@vime/react";
import "@vime/core/themes/default.css";

export type VideoProps = {
  src: string;
  poster?: string;
  autoPlay: boolean;
  setAutoPlay: (autoPlay: boolean) => void;
};

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  autoPlay,
  setAutoPlay,
}) => {
  const onValueChange = (event: Event) => {
    const radio = event.target as HTMLVmMenuRadioElement;
    setAutoPlay(radio.value === "none" ? false : true);
  };

  const playerRef = useRef<HTMLVmPlayerElement | null>(null);

  return (
    <Player
      ref={playerRef}
      autoplay={autoPlay}
      style={{ "--vm-controls-padding": "10px 30px" } as any}
    >
      <VMVideo crossOrigin="" poster={poster}>
        <source data-src={src} type="video/mp4" />
      </VMVideo>
      <Ui>
        <Scrim />
        <ClickToPlay />
        <Controls fullWidth>
          <ControlGroup>
            <ScrubberControl />
          </ControlGroup>

          <ControlGroup space="top">
            <PlaybackControl hideTooltip />
            <VolumeControl hideTooltip />
            <TimeProgress />
            <ControlSpacer />
            <SettingsControl />
            <FullscreenControl hideTooltip />
          </ControlGroup>
        </Controls>
        <Settings>
          <Submenu
            label="Autoplay"
            hint={autoPlay ? "Applies to all videos" : "None"}
          >
            <MenuRadioGroup
              value={autoPlay ? "all" : "none"}
              onVmCheck={onValueChange}
            >
              <MenuRadio label="None" value="none" />
              <MenuRadio label="Applies to all videos" value="all" />
            </MenuRadioGroup>
          </Submenu>
        </Settings>
      </Ui>
    </Player>
  );
};

export default Video;
