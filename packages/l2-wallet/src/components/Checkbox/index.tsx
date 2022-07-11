import classNames from 'classnames';
import React from 'react';

interface TProps {
  label: string;
  className?: string;
  handleChange: any;
  txtClassName?: string;
}

export default function Checkbox({
  handleChange,
  label,
  className = '',
  txtClassName,
}: TProps) {
  return (
    <div className={className}>
      <div className="flex items-center mr-4 mb-2">
        <input
          onChange={(event: any) => {
            handleChange(event.target.checked);
          }}
          type="checkbox"
          id="A3-yes"
          name="A3-confirmation"
          value="yes"
          className="opacity-0 absolute h-8 w-8"
        />
        <div className="bg-white border-2 rounded-[4px] border-[#DCDEE4] w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2">
          <svg
            className="fill-current hidden w-3 h-3 text-[#081824] pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g
                transform="translate(-9 -11)"
                fill="#081824"
                fillRule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label
          // htmlFor="A3-yes"
          className={classNames(
            'select-none font-semibold text-[10px] md:text-[14px]',
            txtClassName,
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

Checkbox.defaultProps = {
  className: '',
  txtClassName: 'text-black',
};
