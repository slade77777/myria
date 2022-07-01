import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

type DropdownMenuProps = {};

type DropdownMenu = React.FC<DropdownMenuProps & DropdownMenuPrimitive.DropdownMenuProps> & {
  Trigger: React.FC<DropdownMenuPrimitive.DropdownMenuTriggerProps>;
  Content: React.FC<DropdownMenuPrimitive.DropdownMenuContentProps>;
  Item: React.FC<DropdownMenuPrimitive.DropdownMenuItemProps>;
  Arrow: React.FC<DropdownMenuPrimitive.DropdownMenuArrowProps>;
};

const DropdownMenu: DropdownMenu = ({ children, ...props }) => {
  return <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>;
};

const DropdownContent: DropdownMenu['Content'] = ({ className, ...props }) => {
  return (
    <DropdownMenuPrimitive.Content {...props} className={clsx(className, ' dropdown-content')} />
  );
};

DropdownMenu.Trigger = DropdownMenuPrimitive.Trigger;
DropdownMenu.Content = DropdownContent;
DropdownMenu.Item = DropdownMenuPrimitive.Item;
DropdownMenu.Arrow = DropdownMenuPrimitive.Arrow;

export default DropdownMenu;
