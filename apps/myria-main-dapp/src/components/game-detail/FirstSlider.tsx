/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { Asset } from '../../pages/game-detail/[id]';
import Video from '../Video';
import { useAutoPlayInGameDetail } from '../../valtio/autoPlayInGameDetail';
import Image from 'next/image';

const Arrow: React.FC<CustomArrowProps & { position: 'left' | 'right' }> = ({
  onClick,
  position
}) => {
  return (
    <button
      className={clsx(
        'btn-dark-blue absolute top-1/2 z-10 flex h-[32px] w-[32px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] opacity-0 transition duration-300 group-hover:opacity-100',
        {
          'right-[10px]': position === 'right',
          'left-[10px]': position === 'left'
        }
      )}
      onClick={onClick}>
      <span className="w-[22px]">
        {position === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </span>
    </button>
  );
};

type Props = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  assets: Asset[];
};

const FirstSlider: React.FC<Props> = ({ currentSlide, setCurrentSlide, assets }) => {
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
      swipe: false
    }),
    [setCurrentSlide]
  );

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  const autoPlay = useAutoPlayInGameDetail();

  return (
    <>
      <Slider ref={sliderRef} {...settings} className="group relative">
        {assets.map((a, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-[5px] pt-[calc(9/16*100%)]">
            {a.type === 'video' ? (
              <div className="absolute top-0 left-0 h-full w-full">
                <Video
                  options={{
                    aspectRatio: '16:9',
                    autoplay: false,
                    muted: true,
                    poster: a.image,
                    sources: [
                      {
                        src: a.src
                      }
                    ]
                  }}
                  isVisible={currentSlide == idx}
                />
              </div>
            ) : (
              <Image src={a.src} alt="" objectFit="cover" layout="fill" />
            )}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FirstSlider;
