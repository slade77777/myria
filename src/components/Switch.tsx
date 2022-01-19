import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

const Switch: React.FC = () => {
  return (
    <SwitchPrimitive.Root defaultChecked className=" switchRoot">
      <SwitchPrimitive.Thumb className=" switchThumb" />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
