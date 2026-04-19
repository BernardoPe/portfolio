import { getDevIcon, type DevIconSlug } from '@/data/devIcons';

interface DevIconProps {
  slug: DevIconSlug;
  size?: number;
  className?: string;
}

export function DevIcon({ slug, size = 16, className }: DevIconProps): React.JSX.Element {
  const src = getDevIcon(slug);

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
