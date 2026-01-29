interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps): React.JSX.Element {
  return (
    <section id={id} className={`px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0 ${className}`}>
      <div className="text-center mb-8 pt-12">
        <p className="text-xl md:text-2xl text-gray-500 mb-4">{title}</p>
        {subtitle && <h1 className="text-4xl md:text-6xl font-bold text-white">{subtitle}</h1>}
      </div>
      {children}
    </section>
  );
}

export default Section;
