import { useState } from 'react';
import { Cpu } from 'lucide-react';

interface HardwareImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function HardwareImage({
  src,
  alt,
  title,
  className = '',
}: HardwareImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-500 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Cpu className="w-10 h-10 text-slate-400 mb-2" strokeWidth={1.5} />
        {title && (
          <span className="text-xs font-medium text-slate-600 text-center">
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
