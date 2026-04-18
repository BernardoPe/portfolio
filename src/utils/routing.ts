const LEGACY_BASE_PATH = '/r';

function trimTrailingSlash(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

export function getBasePath(pathname: string = window.location.pathname): '' | '/r' {
  if (pathname === LEGACY_BASE_PATH || pathname.startsWith(`${LEGACY_BASE_PATH}/`)) {
    return LEGACY_BASE_PATH;
  }

  return '';
}

export function getNormalizedPathname(pathname: string = window.location.pathname): string {
  const basePath = getBasePath(pathname);
  const withoutBase = basePath ? pathname.slice(basePath.length) || '/' : pathname;

  return trimTrailingSlash(withoutBase || '/');
}

export function withBasePath(path: string, pathname: string = window.location.pathname): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const trimmedPath = trimTrailingSlash(normalizedPath);
  const basePath = getBasePath(pathname);

  if (!basePath) {
    return trimmedPath;
  }

  if (trimmedPath === '/') {
    return basePath;
  }

  return `${basePath}${trimmedPath}`;
}
