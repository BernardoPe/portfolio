import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className = '', ...rest },
  ref
) {
  return <textarea ref={ref} className={['w-full', className].join(' ')} {...rest} />;
});

export default Textarea;
