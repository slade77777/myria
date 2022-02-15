import * as React from 'react';
import { ThemeColors } from '../helpers';

interface IProviderProps {
  name: string;
  logo: string;
  description: string;
  themeColors: ThemeColors;
  onClick: () => void;
}

export function Provider(props: IProviderProps) {
  const { name, logo, description, themeColors, onClick, ...otherProps } = props;
  return (
    <div
      className="px-4 py-6 text-center hover:cursor-pointer hover:bg-[#070F17]"
      onClick={onClick}>
      <div className="mb-6">
        <img src={logo} alt={name} className="m-auto h-[104px] w-[104px]" />
      </div>
      <h1 className="heading-list mb-2 text-white">{name}</h1>
      <p className="body-sm text-light">{description}</p>
    </div>
  );
}
