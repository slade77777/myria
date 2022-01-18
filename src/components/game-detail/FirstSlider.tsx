/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider, { Settings, CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import { Asset } from "../../pages/game-detail";
import Video from "../Video";

const Arrow: React.FC<CustomArrowProps & { position: "left" | "right" }> = ({
  onClick,
  position,
}) => {
  return (
    <button
      className={clsx(
        "transition duration-300 opacity-0 group-hover:opacity-100 btn-dark-blue flex items-center justify-center absolute z-10 cursor-pointer top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-[8px]",
        {
          "right-[10px]": position === "right",
          "left-[10px]": position === "left",
        }
      )}
      onClick={onClick}
    >
      <span className="w-[22px]">
        {position === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </span>
    </button>
  );
};

type Props = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  assets: Asset[];
};

const FirstSlider: React.FC<Props> = ({
  currentSlide,
  setCurrentSlide,
  assets,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const settings: Settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow: <Arrow position="left" />,
      nextArrow: <Arrow position="right" />,
      afterChange: (currentSlide) => setCurrentSlide(currentSlide),
      swipe: false,
    }),
    [setCurrentSlide]
  );

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <Slider ref={sliderRef} {...settings} className="relative group">
      {assets.map((a, idx) => (
        <div key={idx}>
          {a.type === "video" ? (
            <div className="aspect-[16/9]">
              <Video
                src={a.src}
                poster={a.image}
                autoPlay={autoPlay}
                setAutoPlay={setAutoPlay}
              />
            </div>
          ) : (
            <img src={a.src} alt="" />
          )}
        </div>
      ))}
    </Slider>
  );
};

export default FirstSlider;
