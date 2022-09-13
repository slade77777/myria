import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import clsx from 'clsx';

type TTooltipProps = {
  position:
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottomCenter'
    | 'leftTop'
    | 'leftBottom'
    | 'leftCenter'
    | 'rightTop'
    | 'rightBottom'
    | 'rightCenter';
  children: React.ReactNode;
  content: React.ReactNode | string;
  title?: React.ReactNode | string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  skipDelayDuration?: number;
  onClose?: () => void;
  className?: string;
};
export const Tooltip: React.FC<
  Omit<TooltipPrimitive.TooltipContentProps, 'title'> & TTooltipProps
> = ({
  position,
  children,
  content,
  title,
  defaultOpen,
  open,
  onOpenChange,
  delayDuration = 300,
  skipDelayDuration,
  className,
  ...props
}) => {
  const placement: {
    side: TooltipPrimitive.TooltipContentProps['side'];
    align: TooltipPrimitive.TooltipContentProps['align'];
    alignOffset: TooltipPrimitive.TooltipContentProps['alignOffset'];
  } = React.useMemo(() => {
    switch (position) {
      case 'topLeft':
        return { side: 'top', align: 'start', alignOffset: 12 };
      case 'topRight':
        return { side: 'top', align: 'end', alignOffset: 12 };
      case 'topCenter':
        return { side: 'top', align: 'center', alignOffset: 12 };
      case 'bottomLeft':
        return { side: 'bottom', align: 'start', alignOffset: 12 };
      case 'bottomRight':
        return { side: 'bottom', align: 'end', alignOffset: 12 };
      case 'bottomCenter':
        return { side: 'bottom', align: 'center', alignOffset: 12 };
      case 'leftTop':
        return { side: 'left', align: 'start', alignOffset: -16 };
      case 'leftBottom':
        return { side: 'left', align: 'end', alignOffset: -16 };
      case 'leftCenter':
        return { side: 'left', align: 'center', alignOffset: 12 };
      case 'rightTop':
        return { side: 'right', align: 'start', alignOffset: -16 };
      case 'rightBottom':
        return { side: 'right', align: 'end', alignOffset: -16 };
      case 'rightCenter':
        return { side: 'right', align: 'center', alignOffset: 12 };
      default:
        return { side: 'top', align: 'end', alignOffset: 0 };
    }
  }, [position]);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className={clsx('w-[264px]', className)}
          sideOffset={8}
          {...placement}
          {...props}
        >
          <TooltipPrimitive.Arrow style={{ fill: '#081824' }} className="h-2 w-4" />
          <div className="bg-base/3 flex justify-between rounded-lg pl-4 pr-[13px] pt-[13px] pb-[19px] text-xs leading-[19px] text-white ">
            <div className="flex flex-col justify-between ">
              <div className="text-base/9 text-sm leading-[21px]">{content}</div>
            </div>
          </div>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
