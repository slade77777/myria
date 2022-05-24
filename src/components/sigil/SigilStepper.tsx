import clsx from 'clsx';
import React, { CSSProperties } from 'react';

export type Step = {
  title: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  circleClassName?: string;
  lineClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  CIRCLE_SIZE?: number;
};

const CIRCLE_SIZE = 24;
const SPACING = 8;

const SigilStepper: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <div className="flex">
      {steps.map((step, idx) => {
        const isActive = idx == currentStep;
        return (
          <div className="relative isolate flex flex-1 flex-col items-center" key={idx}>
            <div>
              <div
                style={{
                  height: CIRCLE_SIZE,
                  width: CIRCLE_SIZE
                }}
                className={clsx(
                  'flex items-center justify-center rounded-full bg-brand-light-blue p-[2px]',
                  {
                    'opacity-20': !isActive,
                    'shadow-[0px_0px_20px_#FFFFFF]': isActive
                  }
                )}>
                {isActive && (
                  <div
                    style={{
                      width: CIRCLE_SIZE - 4,
                      height: CIRCLE_SIZE - 4
                    }}
                    className="flex items-center justify-center rounded-full bg-[#0C1A29]">
                    <div className="h-[6px] w-[6px] rounded-full bg-brand-light-blue" />
                  </div>
                )}
              </div>
              {idx !== 0 && (
                <div
                  style={
                    {
                      width: `calc(100% - ${CIRCLE_SIZE + 2 * SPACING}px)`,
                      top: CIRCLE_SIZE / 2,
                      right: '50%',
                      transform: `translate(-${CIRCLE_SIZE / 2 + SPACING}px, -50%)`
                    } as CSSProperties
                  }
                  className={clsx('absolute border border-brand-light-blue')}
                />
              )}
            </div>
            <div
              style={{
                paddingRight: SPACING,
                paddingLeft: SPACING
              }}
              className={clsx('mt-4 text-center', {
                'opacity-20': !isActive
              })}>
              <div className={clsx('text-[14px] font-medium leading-[1.3]')}>{step.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SigilStepper;
