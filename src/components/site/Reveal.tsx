interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps): React.JSX.Element {
  const adjustedDelay = Math.round(delay * 1.6);

  const Component = Tag as React.ElementType;
  return (
    <Component className={`reveal ${className}`} style={{ animationDelay: `${adjustedDelay}ms` }}>
      {children}
    </Component>
  );
}
