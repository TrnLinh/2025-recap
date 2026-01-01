import { useRef, useEffect, useState } from "react";

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function LazyImage({ src, alt = "", className }: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        // Load images 300px before they enter viewport (for horizontal scroll)
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className='lazy-image-container'>
      {/* Skeleton loader */}
      <div
        className='skeleton-loader'
        style={{
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Actual image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </div>
  );
}
