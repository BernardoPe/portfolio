import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'round';
  className?: string;
};

export default React.forwardRef<HTMLButtonElement, Props>(function Button(
  { children, variant = 'primary', size = 'md', shape, className = '', ...rest },
  ref
) {
  const base = 'inline-flex items-center justify-center font-medium';
  const variantClass =
    variant === 'ghost' ? 'bg-transparent' : 'bg-primary text-primary-foreground';

  const sizeClass = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-sm';
  const shapeClass = shape === 'square' ? 'rounded' : 'rounded-full';

  return (
    <button
      ref={ref}
      className={[base, variantClass, sizeClass, shapeClass, className].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
});
