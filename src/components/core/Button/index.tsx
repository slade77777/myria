import React from 'react';
import { Loading } from 'src/components/Loading';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

function Button({ loading = false, children, ...rest }: Props) {
  return (
    <button {...rest}>
      {children}
      { loading && <Loading className='px-2' /> }
    </button>
  );
}

export default Button;
