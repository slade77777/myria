import React from "react";
import clsx from "clsx";

type Props = {
  helperText?: string;
  error?: boolean;
};

const Input: React.FC<Props & React.HTMLProps<HTMLInputElement>> = ({
  className,
  helperText,
  error,
  ...props
}) => {
  return (
    <div className="grid gap-[7px]">
      <input
        className={clsx(className, "input", {
          "border-[#F37272]": error,
        })}
        {...props}
      />
      <span
        className={clsx("text-[14px] leading-[1.5]", {
          "text-[#F37272]": error,
        })}
      >
        This is an error validation message
      </span>
    </div>
  );
};

export default Input;
