type Props = {
  username?: string;
  className?: string;
};

function initials(name = 'User') {
  return name
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({ username = 'User', className = '' }: Props) {
  return (
    <div
      className={[
        'h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-medium text-neutral-800 dark:text-neutral-200',
        className,
      ].join(' ')}
      aria-hidden
    >
      {initials(username)}
    </div>
  );
}
