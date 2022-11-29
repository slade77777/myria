/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { Asset } from '../../pages/game-detail/[id]';
import PlayIcon from '../icons/PlayIcon';
import Image from 'next/image';
import { MediaData } from 'src/hooks/useDetailGames';
import { arrayImage, arrayVideo } from './FirstSlider';

const Arrow: React.FC<CustomArrowProps & { position: 'left' | 'right' }> = ({
  onClick,
  position
}) => {
  return (
    <button
      className={clsx(
        'btn-dark-blue absolute top-1/2 z-10 flex h-[32px] w-[32px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px]',
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
  assets: MediaData[];
  assetsThumbnail: MediaData[];
};

const SecondSlider: React.FC<Props> = ({
  currentSlide,
  setCurrentSlide,
  assets,
  assetsThumbnail
}) => {
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
        className="mx-auto max-w-full">
        <Slider ref={sliderRef} {...settings} className="group relative px-[var(--paddingX)]">
          {assets.map((a, idx) => (
            <div
              style={{
                width: 126
              }}
              className="!inline-flex items-center justify-center px-2"
              key={idx}>
              <button
                onClick={() => setCurrentSlide(idx)}
                className={clsx(
                  'relative h-[73px] w-full overflow-hidden rounded-[5px] border border-transparent',
                  {
                    '!border-white': currentSlide == idx
                  }
                )}>
                {currentSlide !== idx && (
                  <div className="absolute inset-0 z-[3] bg-black opacity-40 hover:opacity-0" />
                )}
                {arrayVideo.includes(a.attributes.ext) && (
                  <span className="absolute top-1/2 left-1/2 z-[2] w-[13px] -translate-x-1/2 -translate-y-1/2">
                    <PlayIcon />
                  </span>
                )}
                <Image
                  src={
                    arrayImage.includes(assetsThumbnail[idx]?.attributes.ext)
                      ? assetsThumbnail[idx].attributes.formats.thumbnail.url
                      : '/images/defaultImg.jpp'
                  }
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
