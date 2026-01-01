import { useRef, useEffect, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

export function LazyVideo({ src, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Load video source on first visibility
            if (!hasLoaded) {
              setHasLoaded(true);
            }
            // Play when visible
            video.play().catch(() => {
              // Autoplay may be blocked, that's okay
            });
          } else {
            setIsVisible(false);
            // Pause when not visible to save resources
            video.pause();
          }
        });
      },
      {
        // Start loading a bit before it's fully visible
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded]);

  return (
    <video
      ref={videoRef}
      // Only set src after first visibility (lazy load)
      src={hasLoaded ? src : undefined}
      loop
      muted
      playsInline
      className={className}
      // Preload metadata only after becoming visible
      preload={hasLoaded ? "auto" : "none"}
    />
  );
}
