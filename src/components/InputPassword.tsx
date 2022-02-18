import React, { ReactNode, useState } from 'react';
import Input, { Props as InputProps } from './Input';
import EyeIcon from './icons/EyeIcon';

type Props = InputProps & HTMLInputElement;

const InputPassword: React.FC<Props> = ({ className, ...props }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <div className="relative">
      <Input {...props} type={visiblePassword ? 'text' : 'password'} />
      <span className="absolute top-[17px] right-2 cursor-pointer" onClick={toggleVisiblePassword}>
        <EyeIcon />
      </span>
    </div>
  );
};

export default InputPassword;
