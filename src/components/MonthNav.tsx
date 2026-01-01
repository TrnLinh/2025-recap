import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MONTHS } from "../data/gallery";

gsap.registerPlugin(ScrollTrigger);

interface MonthNavProps {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => void;
}

export function MonthNav({ scrollTo }: MonthNavProps) {
  const [activeMonth, setActiveMonth] = useState(-1); // -1 = intro section

  useEffect(() => {
    // Wait for ScrollTrigger to be set up
    const timeout = setTimeout(() => {
      const mainTrigger = ScrollTrigger.getAll().find((st) => st.vars.pin);
      if (!mainTrigger) return;

      // Update active month based on scroll progress
      const updateActiveMonth = () => {
        const container = document.querySelector(
          ".horizontal-scroll-container"
        ) as HTMLElement;
        if (!container) return;

        const containerWidth = container.scrollWidth;
        const windowWidth = window.innerWidth;
        const totalScroll = containerWidth - windowWidth;

        // Get current horizontal position from GSAP transform
        const transform = gsap.getProperty(container, "x") as number;
        const currentX = Math.abs(transform || 0);

        // Find which month section is currently in view
        let foundMonth = -1;
        MONTHS.forEach((month, index) => {
          const section = document.getElementById(month.id);
          if (!section) return;

          const sectionLeft = section.offsetLeft;
          const sectionRight = sectionLeft + section.offsetWidth;

          // Check if the center of the viewport is within this section
          const viewportCenter = currentX + windowWidth / 2;
          if (viewportCenter >= sectionLeft && viewportCenter < sectionRight) {
            foundMonth = index;
          }
        });

        setActiveMonth(foundMonth);
      };

      // Listen to scroll events
      ScrollTrigger.addEventListener("refresh", updateActiveMonth);

      // Create a ticker to update on scroll
      const tickerCallback = () => {
        updateActiveMonth();
      };
      gsap.ticker.add(tickerCallback);

      return () => {
        ScrollTrigger.removeEventListener("refresh", updateActiveMonth);
        gsap.ticker.remove(tickerCallback);
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleMonthClick = (monthId: string) => {
    const section = document.getElementById(monthId);
    if (!section) return;

    const container = document.querySelector(
      ".horizontal-scroll-container"
    ) as HTMLElement;
    const wrapper = document.querySelector(
      ".horizontal-scroll-wrapper"
    ) as HTMLElement;
    if (!container || !wrapper) return;

    const containerWidth = container.scrollWidth;
    const windowWidth = window.innerWidth;
    const totalHorizontalScroll = containerWidth - windowWidth;

    // Get the section's left position (with small offset for title visibility)
    const sectionLeft = Math.max(0, section.offsetLeft - 50);

    // Calculate progress (0 to 1) through the horizontal scroll
    const progress = Math.min(sectionLeft / totalHorizontalScroll, 1);

    // The vertical scroll range equals the horizontal scroll distance
    // (because scrub maps 1:1 vertical scroll to horizontal movement)
    const wrapperTop = wrapper.offsetTop;
    const targetScrollY = wrapperTop + totalHorizontalScroll * progress;

    scrollTo(targetScrollY, { duration: 1.2 });
  };

  return (
    <nav
      className='fixed bottom-0 left-0 right-0 z-50 pb-6 pt-12'
      style={{
        background:
          "linear-gradient(to top, #fafafa, rgba(250,250,250,0.95), transparent)",
      }}
    >
      <div className='flex items-center justify-center gap-1 md:gap-4'>
        {MONTHS.map((month, index) => (
          <button
            key={month.id}
            onClick={() => handleMonthClick(month.id)}
            className='nav-text px-2 py-2 transition-all duration-300 md:px-3'
            style={{
              color: activeMonth === index ? "#000000" : "#666666",
            }}
            aria-label={`Go to ${month.name}`}
          >
            <span className='relative'>
              {month.shortName}
              {activeMonth === index && (
                <span
                  className='absolute -bottom-1 left-0 right-0 h-0.5'
                  style={{ backgroundColor: "#000000" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
