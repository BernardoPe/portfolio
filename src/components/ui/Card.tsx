import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Card({ children, className = '', ...rest }: Props) {
  return (
    <div className={['rounded-md dark:bg-neutral-900 shadow-sm', className].join(' ')} {...rest}>
      {children}
    </div>
  );
}
