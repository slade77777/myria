const Badge: React.FC<{}> = ({ children }) => {
  return (
    <span className="rounded-lg bg-brand-dark-blue px-[10px] py-[6px] text-[9px] font-medium leading-[1.3] text-brand-light-blue">
      {children}
    </span>
  );
};

export default Badge;
