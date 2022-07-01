import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import CheckOutlineIcon from './icons/CheckOutlineIcon';

export type Step = {
  title: string;
  description?: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  circleClassName?: string;
  lineClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  circleSize?: number;
};

const CIRCLE_SIZE = 40;
const SPACING = 8;

const Stepper: React.FC<Props> = ({
  steps,
  currentStep,
  circleClassName,
  lineClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  circleSize = CIRCLE_SIZE
}) => {
  return (
    <div className="flex">
      {steps.map((step, idx) => {
        const isActive = idx <= currentStep;
        return (
          <div className="relative isolate flex flex-1 flex-col items-center" key={idx}>
            <div>
              <div
                style={{
                  height: circleSize,
                  width: circleSize
                }}
                className={clsx(
                  'flex items-center justify-center rounded-full border-2 border-dashed border-brand-light-blue',
                  circleClassName,
                  {
                    '!border-solid bg-brand-light-blue ': isActive
                  }
                )}>
                {isActive && (
                  <div className="w-[21px] text-dark">
                    <CheckOutlineIcon />
                  </div>
                )}
              </div>
              {idx !== 0 && (
                <div
                  style={
                    {
                      width: `calc(100% - ${circleSize + 2 * SPACING}px)`,
                      top: circleSize / 2,
                      right: '50%',
                      transform: `translate(-${circleSize / 2 + SPACING}px, -50%)`
                    } as CSSProperties
                  }
                  className={clsx('absolute border border-brand-light-blue', lineClassName, {
                    'border-dashed': !isActive
                  })}
                />
              )}
            </div>
            <div
              style={{
                paddingRight: SPACING,
                paddingLeft: SPACING
              }}
              className={clsx('mt-6 text-center', contentClassName, {
                'opacity-50': !isActive
              })}>
              <div className={clsx('caption font-bold text-brand-light-blue', titleClassName)}>
                {step.title}{' '}
              </div>
              {step.description && (
                <div className={clsx('mt-2 text-base leading-[1.3]', descriptionClassName)}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
