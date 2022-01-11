import clsx from "clsx";
import React from "react";

type Props = {
  icon: JSX.Element;
  className?: string;
};

const CardWithIcon: React.FC<Props> = ({ icon, children, className }) => {
  return (
    <article
      style={{
        boxShadow: "0px 0px 40px 10px rgba(0, 0, 0, 0.3)",
      }}
      className={clsx(
        "relative rounded-[20px] bg-brand-deep-blue pt-[80px] px-[32px] text-center",
        className
      )}
    >
      <div
        style={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
        }}
        className="bg-brand-deep-blue absolute top-0 flex items-center justify-center  w-[104px] h-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2"
      >
        {icon}
      </div>
      {children}
    </article>
  );
};

export default CardWithIcon;
