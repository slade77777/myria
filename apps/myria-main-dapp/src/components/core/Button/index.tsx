import clsx from 'clsx';
import React from 'react';
import { Loading } from 'src/components/Loading';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  pandingRight?: string
}

function Button({ loading = false, children, disabled, pandingRight = 'pr-2', ...rest }: Props) {
  return (
    <button {...rest} disabled={disabled || loading}>
      {children}
      {loading && <Loading loadingSize={16} className={clsx(`pl-2 ${pandingRight}`)} />}
    </button>
  );
}

export default Button;
