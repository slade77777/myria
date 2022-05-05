const Badge: React.FC<{}> = ({ children }) => {
  return (
    <div className="rounded-lg bg-brand-dark-blue px-[10px] py-[6px] text-[9px] leading-[1.3] text-brand-light-blue font-medium">
      {children}
    </div>
  );
};

export default Badge;
