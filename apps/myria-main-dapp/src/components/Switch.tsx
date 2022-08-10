import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

const Switch: React.FC<{
  defaultChecked: boolean;
  onChange: (v: boolean) => void;
}> = ({ defaultChecked, onChange }) => {
  return (
    <SwitchPrimitive.Root
      defaultChecked={defaultChecked}
      onCheckedChange={onChange}
      className=" switchRoot">
      <SwitchPrimitive.Thumb className=" switchThumb" />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
