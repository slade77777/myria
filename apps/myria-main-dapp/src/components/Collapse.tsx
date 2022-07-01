import React, { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';

type CollapseProps = {
  defaultOpen?: boolean;
  children:
    | React.ReactNode
    | ((props: { open: boolean; setOpen: (open: boolean) => void }) => React.ReactNode);
};

type Collapse = React.FC<CollapseProps & Collapsible.CollapsibleProps> & {
  Trigger: React.FC<Collapsible.CollapsibleTriggerProps>;
  Content: React.FC<Collapsible.CollapsibleContentProps>;
};

const Collapse: Collapse = ({ children, defaultOpen = false, ...props }) => {
  const [open, setOpen] = useState(defaultOpen);

  if (typeof children === 'function') {
    return (
      <Collapsible.Root open={open} onOpenChange={setOpen} {...props}>
        {children({ open, setOpen })}
      </Collapsible.Root>
    );
  }
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} {...props}>
      {children}
    </Collapsible.Root>
  );
};

const CollapseTrigger: React.FC<Collapsible.CollapsibleTriggerProps> = ({ ...props }) => {
  return <Collapsible.Trigger {...props} />;
};

const CollapseContent: React.FC<Collapsible.CollapsibleContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Collapsible.Content className={clsx('collapse-content', className)} {...props}>
      {children}
    </Collapsible.Content>
  );
};

Collapse.Trigger = CollapseTrigger;
Collapse.Content = CollapseContent;

export default Collapse;
