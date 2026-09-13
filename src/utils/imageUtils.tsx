import React from 'react';

/**
 * Secret Style BD - Reliable SVG Fallback for products
 */
export const FALLBACK_PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="%23FAF7F5"><rect width="600" height="600" fill="%23FFF5F6"/><rect x="20" y="20" width="560" height="560" rx="24" fill="none" stroke="%23F43F5E" stroke-width="2" stroke-dasharray="8 8" stroke-opacity="0.3"/><circle cx="300" cy="250" r="70" fill="%23FFE4E6"/><path d="M275 240 C275 225, 325 225, 325 240 C325 260, 300 270, 300 270 C300 270, 275 260, 275 240 Z" fill="%23E11D48"/><text x="50%25" y="370" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="24" fill="%23881337" text-anchor="middle">Secret Style BD</text><text x="50%25" y="405" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="16" fill="%239F1239" text-anchor="middle">100% Export Quality Apparel</text></svg>';

export const FALLBACK_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="%23F3F4F6"><circle cx="50" cy="50" r="50" fill="%23FFE4E6"/><circle cx="50" cy="40" r="18" fill="%23E11D48"/><path d="M22 82 C25 65, 40 60, 50 60 C60 60, 75 65, 78 82 Z" fill="%23E11D48"/></svg>';

/**
 * Resolves an asset or image URL so that it works seamlessly both on
 * local dev (localhost:3000), custom domains, and GitHub Pages subpath repositories (e.g. /my-repo/).
 * 
 * Prevents the notorious GitHub Pages 404 image bug where images with leading `/` 
 * resolve to the user domain root instead of the repository directory.
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return FALLBACK_PRODUCT_IMAGE;
  }

  const trimmed = url.trim();

  // If already an absolute external URL (http, https, data URI, blob URI), return as is
  if (/^(https?:\/\/|data:|blob:)/i.test(trimmed)) {
    return trimmed;
  }

  // Strip all leading slashes: "/assets/..." -> "assets/..."
  const cleanPath = trimmed.replace(/^\/+/, '');

  // Vite's import.meta.env.BASE_URL is either './' or from base config
  const env = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const baseUrl = env?.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${prefix}${cleanPath}`;
}

/**
 * Robust image error event handler to swap broken links with the fallback placeholder.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback = FALLBACK_PRODUCT_IMAGE
) {
  const target = e.currentTarget;
  if (target.src !== fallback) {
    target.onerror = null; // Prevent infinite error loops
    target.src = fallback;
  }
}

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallback?: string;
}

/**
 * Drop-in `<AppImage />` component that automatically:
 * 1. Resolves relative / root URLs safely for GitHub Pages
 * 2. Catches broken images with a high-fidelity SVG fallback
 * 3. Enforces standard `referrerPolicy="no-referrer"`
 */
export const AppImage: React.FC<AppImageProps> = ({
  src,
  fallback = FALLBACK_PRODUCT_IMAGE,
  alt = '',
  className = '',
  ...props
}) => {
  const resolvedSrc = resolveImageUrl(src);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={(e) => handleImageError(e, fallback)}
      {...props}
    />
  );
};
