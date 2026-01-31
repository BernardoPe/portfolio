export default function StopIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
