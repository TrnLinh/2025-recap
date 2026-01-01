import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoCard } from "./PhotoCard";
import { BentoGrid } from "./BentoGrid";
import type { MonthData, Photo } from "../data/gallery";

gsap.registerPlugin(ScrollTrigger);

interface MonthSectionProps {
  month: MonthData;
  index: number;
  onPhotoClick?: (photo: Photo) => void;
  isMobile?: boolean;
}

export function MonthSection({
  month,
  index,
  onPhotoClick,
  isMobile = false,
}: MonthSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Skip GSAP animations on mobile
    if (isMobile) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Wait for main ScrollTrigger to be set up
    const timeout = setTimeout(() => {
      const scrollTween = ScrollTrigger.getAll().find((st) => st.vars.pin);
      if (!scrollTween) return;

      // Parallax effect on the title
      const parallax = gsap.to(title, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "left right",
          end: "right left",
          containerAnimation: scrollTween.animation,
          scrub: 2,
        },
      });

      // Title fade in animation
      gsap.set(title, { opacity: 0, x: -50 });

      const fadeIn = gsap.to(title, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "left 80%",
          containerAnimation: scrollTween.animation,
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        parallax.scrollTrigger?.kill();
        parallax.kill();
        fadeIn.scrollTrigger?.kill();
        fadeIn.kill();
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [isMobile]);

  const isBento = month.layout === "bento";

  // Mobile layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id={month.id}
        className="month-section-mobile"
        data-month-index={index}
      >
        {/* Month Title - Horizontal on mobile */}
        <div className="month-title-wrapper">
          <h2
            ref={titleRef}
            className="month-title select-none"
            style={{ color: "#000000" }}
          >
            {month.name}
          </h2>
        </div>

        {/* Photo Content - Bento grid */}
        {isBento ? (
          <div className="w-full">
            <BentoGrid
              photos={month.photos}
              monthId={month.id}
              onPhotoClick={onPhotoClick}
              isMobile={isMobile}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            {month.photos.map((photo, photoIndex) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={photoIndex}
                onPhotoClick={onPhotoClick}
              />
            ))}
          </div>
        )}

        {/* Section Divider - subtle line on mobile */}
        {index < 11 && (
          <div className="w-full flex justify-center py-8">
            <div className="w-16 h-px" style={{ backgroundColor: "#e5e5e5" }} />
          </div>
        )}
      </section>
    );
  }

  // Desktop layout
  return (
    <section
      ref={sectionRef}
      id={month.id}
      className='flex h-screen flex-shrink-0 items-center'
      data-month-index={index}
    >
      {/* Month Title - Vertical */}
      <div className='relative flex h-full items-center px-8'>
        <h2
          ref={titleRef}
          className='month-title select-none'
          style={{ color: "#000000" }}
        >
          {month.name}
        </h2>
      </div>

      {/* Photo Content - Bento or Strip */}
      {isBento ? (
        <div className='flex h-full items-center px-8 py-12'>
          <BentoGrid
            photos={month.photos}
            monthId={month.id}
            onPhotoClick={onPhotoClick}
            isMobile={isMobile}
          />
        </div>
      ) : (
        <div className='flex h-full items-center gap-6 px-8 py-16'>
          {month.photos.map((photo, photoIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={photoIndex}
              onPhotoClick={onPhotoClick}
            />
          ))}
        </div>
      )}

      {/* Section Divider */}
      {index < 11 && (
        <div className='flex h-full items-center px-4'>
          <div className='h-3/4 w-px' style={{ backgroundColor: "#e5e5e5" }} />
        </div>
      )}
    </section>
  );
}
