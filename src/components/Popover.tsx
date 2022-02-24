import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

type Popover = React.FC<PopoverPrimitive.PopoverProps> & {
  Trigger: React.FC<PopoverPrimitive.PopoverTriggerProps>;
  Content: React.FC<PopoverPrimitive.PopoverContentProps>;
};

const Popover: Popover = ({ ...props }) => <PopoverPrimitive.Root {...props} />;

Popover.Trigger = PopoverPrimitive.Trigger;
Popover.Content = PopoverPrimitive.Content;
