interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ResumeLink({ children = 'View Resume' }: Props) {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`ml-2 inline-flex items-center rounded-md border border-white/20 px-3 py-2 
        text-sm font-medium text-white hover:bg-black/40 hover:scale-110 transition-all duration-200`}
    >
      {children}
    </a>
  );
}
