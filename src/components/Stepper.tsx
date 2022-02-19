import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import CheckOutlineIcon from './icons/CheckOutlineIcon';

export type Step = {
  title: string;
  description: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  contentClassName?: string;
};

const CIRCLE_SIZE = 40;
const SPACING = 8;

const Stepper: React.FC<Props> = ({ steps, currentStep, contentClassName }) => {
  return (
    <div className="flex">
      {steps.map((step, idx) => {
        const isActive = idx <= currentStep;
        return (
          <div className="relative isolate flex flex-1 flex-col items-center" key={idx}>
            <div>
              <div
                style={{
                  height: CIRCLE_SIZE,
                  width: CIRCLE_SIZE
                }}
                className={clsx(
                  'flex items-center justify-center rounded-full border-2 border-dashed border-brand-light-blue',
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
                      width: `calc(100% - ${CIRCLE_SIZE + 2 * SPACING}px)`,
                      top: CIRCLE_SIZE / 2,
                      right: '50%',
                      transform: `translate(-${CIRCLE_SIZE / 2 + SPACING}px, -50%)`
                    } as CSSProperties
                  }
                  className={clsx('absolute border border-brand-light-blue', {
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
              <div className="caption font-bold text-brand-light-blue">{step.title} </div>
              <div className="mt-2 text-base leading-[1.3]">{step.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
