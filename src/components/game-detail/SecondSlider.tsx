/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { Asset } from '../../pages/game-detail/[id]';
import PlayIcon from '../icons/PlayIcon';
import Image from 'next/image';

const Arrow: React.FC<CustomArrowProps & { position: 'left' | 'right' }> = ({
  onClick,
  position
}) => {
  return (
    <button
      className={clsx(
        'btn-dark-blue flex items-center justify-center absolute z-10 cursor-pointer top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-[8px]',
        {
          'right-0': position === 'right',
          'left-0': position === 'left'
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

const SecondSlider: React.FC<Props> = ({ currentSlide, setCurrentSlide, assets }) => {
  const SLIDE_WIDTH = 126;
  const PADDING_X = 40;
  const sliderRef = useRef<Slider | null>(null);

  const [slidesToShow, setSlidesToShow] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const settings = useMemo<Settings>(
    () => ({
      dots: false,
      infinite: true,
      variableWidth: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      prevArrow: <Arrow position="left" />,
      nextArrow: <Arrow position="right" />
    }),
    [slidesToShow]
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const numberOfSlides = Math.floor(
      (containerRef.current.getBoundingClientRect().width - PADDING_X * 2) / SLIDE_WIDTH
    );

    setSlidesToShow(Math.min(assets.length, numberOfSlides));
  }, [assets.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  return (
    <div ref={containerRef}>
      <div
        style={
          {
            width: assets.length * SLIDE_WIDTH + PADDING_X * 2,
            '--paddingX': `${PADDING_X}px`
          } as React.CSSProperties
        }
        className="max-w-full mx-auto">
        <Slider ref={sliderRef} {...settings} className="relative group px-[var(--paddingX)]">
          {assets.map((a, idx) => (
            <div
              style={{
                width: 126
              }}
              className="px-2 !inline-flex justify-center items-center"
              key={idx}>
              <button
                onClick={() => setCurrentSlide(idx)}
                className={clsx(
                  'w-full h-[73px] relative rounded-[5px] border border-transparent overflow-hidden',
                  {
                    '!border-white': currentSlide == idx
                  }
                )}>
                {currentSlide !== idx && (
                  <div className="absolute z-[3] inset-0 bg-black opacity-40 hover:opacity-0" />
                )}
                {a.type == 'video' && (
                  <span className="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px]">
                    <PlayIcon />
                  </span>
                )}
                {/* <img
                  className="absolute h-full w-full z-[1] object-cover top-0 left-0"
                  src={a.type == 'video' ? a.image : a.src}
                  alt=""
                /> */}
                <Image
                  src={a.type == 'video' ? (a.image as string) : a.src}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  quality={10}
                />
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SecondSlider;
