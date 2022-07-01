import React from 'react';
import { Loading } from 'src/components/Loading';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

function Button({ loading = false, children, disabled, ...rest }: Props) {
  return (
    <button {...rest} disabled={disabled || loading}>
      {children}
      { loading && <Loading loadingSize={16} className='px-2' /> }
    </button>
  );
}

export default Button;
