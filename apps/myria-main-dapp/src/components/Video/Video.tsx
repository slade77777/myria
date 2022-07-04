import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import { useAutoPlayInGameDetail } from "../../valtio/autoPlayInGameDetail";
import "./Setting";
import styles from "./styles.module.css";

export type VideoOptions = videojs.PlayerOptions;

type VideoProps = {
  options: VideoOptions;
  isVisible: boolean;
};

const defaultOptions: VideoOptions = {
  controls: true,
  responsive: true,
  bigPlayButton: false,
  controlBar: {
    pictureInPictureToggle: false,
    customControlSpacer: true,
    timeDivider: true,
    durationDisplay: true,
    currentTimeDisplay: true,
    remainingTimeDisplay: false,
    liveDisplay: false,
    seekToLive: false,
  },
  poster: "https://picsum.photos/600/300",
};

const Video: React.FC<VideoProps> = ({
  options,
  // autoPlay,
  isVisible,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  const autoPlay = useAutoPlayInGameDetail();

  useEffect(() => {
    if (playerRef.current) {
      return;
    }
    if (!videoRef.current) {
      return;
    }

    videojs(videoRef.current, {
      ...defaultOptions,
      ...options,
    }).ready(function () {
      playerRef.current = this;
      if (autoPlay && isVisible) {
        playerRef.current?.play();
      }

      const component =
        this.getChild("controlBar")?.addChild("ControlBarSettings");
      component?.addClass("vjs-control");
      component?.addClass("vjs-settings");
    });
  }, [options, autoPlay, isVisible]);

  useEffect(() => {
    return () => {
      playerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (autoPlay && isVisible && playerRef.current) {
      playerRef.current.play();
    }
  }, [autoPlay, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      playerRef.current?.pause();
    }
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <div data-vjs-player="true">
        <video ref={videoRef} playsInline className="video-js" />
      </div>
    </div>
  );
};

export default Video;
