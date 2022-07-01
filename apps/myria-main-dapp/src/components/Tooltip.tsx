import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';

type Tooltip = React.FC<TooltipPrimitive.TooltipProps> & {
  Trigger: React.FC<TooltipPrimitive.TooltipTriggerProps>;
  Content: React.FC<TooltipPrimitive.TooltipContentProps>;
  Arrow: React.FC<TooltipPrimitive.TooltipArrowProps>;
  Provider: React.FC<TooltipPrimitive.TooltipProviderProps>;
};
const Tooltip: Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />;

const TooltipContent: Tooltip['Content'] = ({ children, className, ...props }) => (
  <TooltipPrimitive.Content className={clsx(className, 'tooltip-content')} {...props}>
    {children}
  </TooltipPrimitive.Content>
);

const TooltipArrow: Tooltip['Arrow'] = ({ children, className, ...props }) => (
  <TooltipPrimitive.Arrow className={clsx(className, 'fill-brand-deep-blue')} {...props}>
    {children}
  </TooltipPrimitive.Arrow>
);

Tooltip.Provider = TooltipPrimitive.Provider;
Tooltip.Content = TooltipContent;
Tooltip.Trigger = TooltipPrimitive.TooltipTrigger;
Tooltip.Arrow = TooltipArrow;

export default Tooltip;
