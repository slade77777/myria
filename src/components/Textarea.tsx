import React from "react";
import clsx from "clsx";

type Props = {
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
};

const Textarea: React.FC<Props & React.HTMLProps<HTMLTextAreaElement>> = ({
  className,
  helperText,
  error,
  containerClassName,
  ...props
}) => {
  return (
    <div className={containerClassName}>
      <textarea
        className={clsx(className, "input block w-full", {
          "border-[#F37272]": error,
        })}
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

export default Textarea;
