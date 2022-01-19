import React from "react";
import { VideoProps } from "./Video";
import dynamic from "next/dynamic";

// This component only supports client side rendering
const VideoContent = dynamic(() => import("./Video"), { ssr: false });

const Video: React.FC<VideoProps> = (props) => {
  return (
    <div className=" aspect-[16/9]">
      <VideoContent {...props} />
    </div>
  );
};

export default Video;
