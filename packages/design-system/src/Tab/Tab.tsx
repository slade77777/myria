import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

const Triggers = <Item extends unknown>({
  items,
  getLabel,
  getValue,
  className,
  containerClassName
}: {
  items: Item[];
  getLabel: (item: Item) => string;
  getValue: (item: Item) => string;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <Tabs.List className={clsx('flex items-center space-x-2', containerClassName)}>
      {items.map((item) => {
        const value = getValue(item);
        const label = getLabel(item);
        return (
          <Tabs.Trigger
            key={value}
            value={value}
            className={clsx(
              className,
              'body-16-medium text-base/9 radix-state-active:text-primary/6 radix-state-active:border-current border-b-2 border-b-transparent px-4 py-[12.5px]'
            )}
          >
            {label}
          </Tabs.Trigger>
        );
      })}
    </Tabs.List>
  );
};

type TTab = React.FC<Tabs.TabsProps> & {
  Triggers: typeof Triggers;
  Content: React.FC<Tabs.TabsContentProps>;
};

export const Tab = Tabs.Root as unknown as TTab;

Tab.Triggers = Triggers;

Tab.Content = Tabs.Content;
