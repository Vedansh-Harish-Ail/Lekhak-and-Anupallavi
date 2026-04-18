'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

/**
 * A wrapper around Next.js Image component that handles broken images with a fallback.
 * It also applies a consistent fade-in animation for a premium feel.
 */
export function SafeImage({ 
  src, 
  fallbackSrc = '/assets/images/placeholder.jpg', 
  alt, 
  className,
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${className || ''}`}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={`
          duration-700 ease-in-out
          ${isLoaded ? 'scale-100' : 'scale-105'}
          ${props.fill ? 'object-cover' : ''}
          ${className || ''}
        `}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }}
      />
      
      {/* Subtle background placeholder while loading or if error */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-stone-200 flex items-center justify-center p-4 text-center">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/40">
            Image Unavailable....!
          </span>
        </div>
      )}
    </div>
  );
}
