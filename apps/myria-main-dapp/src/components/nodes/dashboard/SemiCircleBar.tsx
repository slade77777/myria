import { FC, memo } from 'react';

const SemiCircleBar: FC<{
  stroke?: string;
  strokeWidth?: number;
  background?: string;
  diameter?: number;
  orientation?: string;
  direction?: string;
  showPercentValue?: boolean;
  percentage: number;
}> = ({
  stroke = '#02B732',
  strokeWidth = 15,
  background = '#5A7486',
  diameter = 300,
  orientation = 'up',
  direction = 'right',
  showPercentValue = false,
  percentage
}) => {
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;

  let percentageValue;
  if (percentage > 100) {
    percentageValue = 100;
  } else if (percentage < 0) {
    percentageValue = 0;
  } else {
    percentageValue = percentage;
  }
  const semiCirclePercentage = percentageValue * (circumference / 100);

  let rotation;
  if (orientation === 'down') {
    if (direction === 'left') {
      rotation = 'rotate(180deg) rotateY(180deg)';
    } else {
      rotation = 'rotate(180deg)';
    }
  } else {
    if (direction === 'right') {
      rotation = 'rotateY(180deg)';
    }
  }

  return (
    <div className="w-fit" style={{ position: 'relative' }}>
      <svg
        width={diameter}
        height={diameter / 2}
        style={{ transform: rotation, overflow: 'hidden' }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BCFFCE" />
            <stop offset="100%" stopColor="#81CA95" />
          </linearGradient>
        </defs>
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={background}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
          }}
        />
      </svg>
      {showPercentValue && (
        <div className="absolute left-0 right-0 bottom-0 ml-auto mr-auto w-fit">
          <span className="font-bold text-4xl text-success/8">{percentage?.toFixed(2)}%</span>
          <p className="text-base/9 mt-2 text-center">Achieved</p>
        </div>
      )}
    </div>
  );
};

export default memo(SemiCircleBar);
