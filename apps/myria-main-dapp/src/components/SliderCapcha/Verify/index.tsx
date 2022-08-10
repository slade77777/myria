import React, { useRef, useState, useEffect, ReactNode, memo, useCallback } from 'react';
import { getRandomNumberByRange, sum, square } from './tool';
import styles from './styles.module.css';
import clsx from 'clsx';
import ArrowForwardIcon from 'src/components/icons/ArrowForwardIcon';
import ReplayIcon from 'src/components/icons/ReplayIcon';

interface VerifyType {
  spliced: boolean;
  verified: boolean;
  left: number;
  destX: number;
}

interface IVerifyProp {
  /**
   * @description
   * @default       320
   */
  width?: number;
  /**
   * @description
   * @default       160
   */
  height?: number;
  /**
   * @description
   * @default       42
   */
  l?: number;
  /**
   * @description
   * @default       9
   */
  r?: number;
  /**
   * @description
   * @default       true
   */
  visible?: boolean;
  /**
   * @description
   * @default
   */
  text?: string | ReactNode;
  /**
   * @description
   * @default
   */
  refreshIcon?: string;
  /**
   * @description
   * @default
   */
  imgUrl?: string;
  /**
   * @description
   * @default
   */
  onDraw?: (l: number) => {};
  /**
   * @description
   * @default       (arg: VerifyType) => VerifyType
   */
  onCustomVerify?: (arg: VerifyType) => VerifyType;
  /**
   * @description
   * @default       ():void => {}
   */
  onSuccess?: VoidFunction;
  /**
   * @description
   * @default       ():void => {}
   */
  onFail?: VoidFunction;
  /**
   * @description
   * @default       ():void => {}
   */
  onRefresh?: VoidFunction;
}

const Verify = ({
  width = 320,
  height = 160,
  l = 42,
  r = 9,
  imgUrl,
  text,
  visible = true,
  onDraw,
  onCustomVerify,
  onSuccess,
  onFail,
  onRefresh
}: IVerifyProp) => {
  const [isLoading, setLoading] = useState(false);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderClass, setSliderClass] = useState('sliderContainer');
  const [textTip, setTextTip] = useState(text);
  const canvasRef = useRef<any>(null);
  const blockRef = useRef<any>(null);
  const imgRef = useRef<any>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const trailRef = useRef<number[]>([]);
  const originXRef = useRef<number>(0);
  const originYRef = useRef<number>(0);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const PI = Math.PI;
  const L = l + r * 2 + 3;

  const drawPath = (ctx: any, x: number, y: number, operation: 'fill' | 'clip') => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);

    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.strokeStyle = operation === 'clip' ? 'rgba(255, 183, 4, 1)' : 'rgba(0, 0, 0, 0.5)';
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    operation === 'fill' ? ctx.fill() : ctx.clip();
  };

  const getRandomImgSrc = () => {
    return (
      imgUrl || `https://picsum.photos/id/${getRandomNumberByRange(0, 1084)}/${width}/${height}`
    );
  };

  const createImg = (onload: VoidFunction) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = onload;
    img.onerror = () => {
      (img as any).setSrc(getRandomImgSrc());
    };

    (img as any).setSrc = (src: string) => {
      const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
      if (isIE) {
        const xhr = new XMLHttpRequest();
        xhr.onloadend = function (e: any) {
          const file = new FileReader();
          file.readAsDataURL(e.target.response);
          file.onloadend = function (e) {
            img.src = e?.target?.result as string;
          };
        };
        xhr.open('GET', src);
        xhr.responseType = 'blob';
        xhr.send();
      } else img.src = src;
    };

    (img as any).setSrc(getRandomImgSrc());
    return img;
  };

  const draw = (img: HTMLImageElement) => {
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');
    xRef.current = getRandomNumberByRange(L + 10, width - (L + 10));
    yRef.current = getRandomNumberByRange(10 + r * 2, height - (L + 10));
    drawPath(canvasCtx, xRef.current, yRef.current, 'fill');
    drawPath(blockCtx, xRef.current, yRef.current, 'clip');

    canvasCtx.drawImage(img, 0, 0, width, height);
    blockCtx.drawImage(img, 0, 0, width, height);

    const y1 = yRef.current - r * 2 - 1;
    const ImageData = blockCtx.getImageData(xRef.current - 3, y1, L, L);
    blockRef.current.width = L;
    blockCtx.putImageData(ImageData, 0, y1);
  };

  const initImg = useCallback(() => {
    const img = createImg(() => {
      setLoading(false);
      draw(img);
    });
    imgRef.current = img;
  }, [createImg, draw]);

  const reset = () => {
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');
    setSliderLeft(0);
    setSliderClass('sliderContainer');
    blockRef.current.width = width;
    blockRef.current.style.left = 0 + 'px';

    canvasCtx.clearRect(0, 0, width, height);
    blockCtx.clearRect(0, 0, width, height);

    setLoading(true);
    imgRef.current.setSrc(getRandomImgSrc());
  };

  const handleRefresh = () => {
    reset();
    typeof onRefresh === 'function' && onRefresh();
  };

  const verify = () => {
    const arr = trailRef.current;
    const average = arr.reduce(sum) / arr.length;
    const deviations = arr.map((x) => x - average);
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
    const left = parseInt(blockRef.current.style.left);
    return {
      spliced: Math.abs(left - xRef.current) < 10,
      verified: stddev !== 0,
      left,
      destX: xRef.current
    };
  };

  const handleDragStart = function (e: any) {
    originXRef.current = e.clientX || e.touches[0].clientX;
    originYRef.current = e.clientY || e.touches[0].clientY;
    isMouseDownRef.current = true;
  };

  const handleDragMove = (e: any) => {
    if (!isMouseDownRef.current) return false;
    e.preventDefault();
    const eventX = e.clientX || e.touches[0].clientX;
    const eventY = e.clientY || e.touches[0].clientY;
    const moveX = eventX - originXRef.current;
    const moveY = eventY - originYRef.current;
    if (moveX < 0 || moveX + 38 >= width) return false;
    setSliderLeft(moveX);
    const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
    blockRef.current.style.left = blockLeft + 'px';

    setSliderClass('sliderContainer sliderContainer_active');
    trailRef.current.push(moveY);
    onDraw && onDraw(blockLeft);
  };

  const handleDragEnd = (e: any) => {
    if (!isMouseDownRef.current) return false;
    isMouseDownRef.current = false;
    const eventX = e.clientX || e.changedTouches[0].clientX;
    if (eventX === originXRef.current) return false;
    setSliderClass('sliderContainer');
    const { spliced, verified } = onCustomVerify ? onCustomVerify(verify()) : verify();
    if (spliced) {
      if (verified) {
        setSliderClass('sliderContainer sliderContainer_success');
        typeof onSuccess === 'function' && onSuccess();
      } else {
        setSliderClass('sliderContainer sliderContainer_fail');
        setTextTip('');
        reset();
      }
    } else {
      setSliderClass('sliderContainer sliderContainer_fail');
      typeof onFail === 'function' && onFail();
      setTimeout(reset.bind(this), 1000);
    }
  };

  useEffect(() => {
    if (visible) {
      imgRef.current ? reset() : initImg();
    }
  }, [visible, initImg, reset]);

  return (
    <div
      className={clsx(styles['verifyWrap'], 'mx-auto mt-5')}
      style={{
        width: width + 'px',
        display: visible ? '' : 'none'
      }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}>
      <div className={styles['canvasArea']}>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
        <canvas
          ref={blockRef}
          className={styles['block']}
          width={width}
          height={height}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}></canvas>
      </div>
      <div
        className={styles['sliderClass']}
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
          width: width + 'px'
        }}>
        <div className="absolute left-0 right-0 mt-4 h-[40px] w-full bg-brand-dark-blue">
          <div className={'mt-3 ml-14 text-sm text-light'}>{textTip}</div>
        </div>
        <div className={styles['sliderMask']} style={{ width: sliderLeft + 'px' }}>
          <div
            className={clsx(styles['slider'], 'flex items-center justify-center')}
            style={{ left: sliderLeft + 'px' }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}>
            <div className={clsx(styles['sliderIcon'])}>
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles['refreshIcon'], '')} onClick={handleRefresh}>
        <ReplayIcon />
      </div>
      <div
        className={styles['loadingContainer']}
        style={{
          width: width + 'px',
          height: height + 'px',
          display: isLoading ? '' : 'none'
        }}>
        <div className={styles['loadingIcon']}></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Verify;
