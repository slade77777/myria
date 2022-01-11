import React from "react";
import clsx from "clsx";

type Props = {
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
};

const Input: React.FC<Props & React.HTMLProps<HTMLInputElement>> = ({
  className,
  helperText,
  error,
  containerClassName,
  ...props
}) => {
  return (
    <div className={containerClassName}>
      <input
        className={clsx(className, "input block w-full", {
          "border-[#F37272]": error,
        })}
        type="text"
        {...props}
      />
      {error && (
        <p
          className={clsx("text-[14px] leading-[1.5] mt-[7px]", {
            "text-[#F37272]": error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
