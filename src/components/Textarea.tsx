import React from "react";
import clsx from "clsx";

type Props = {
  helperText?: string;
  error?: boolean;
};

const Textarea: React.FC<Props & React.HTMLProps<HTMLTextAreaElement>> = ({
  className,
  helperText,
  error,
  ...props
}) => {
  return (
    <div className="grid gap-[7px]">
      <textarea className={clsx(className, "input")} {...props} />
      <span className="text-[14px] leading-[1.5]">
        This is an error validation message
      </span>
    </div>
  );
};

export default Textarea;
