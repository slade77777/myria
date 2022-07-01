const ArrowRightAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 27,
  height = 27,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M19.625 11.875L10.6875 2.9375L13.125 0.5L26.125 13.5L13.125 26.5L10.6875 24.0625L19.625 15.125H0.125V11.875H19.625Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default ArrowRightAltIcon;
