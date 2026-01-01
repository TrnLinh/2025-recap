import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { MonthSection } from "./components/MonthSection";
import { MonthNav } from "./components/MonthNav";
import { Lightbox } from "./components/Lightbox";
import { MONTHS, type Photo } from "./data/gallery";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 768;

export function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introSentencesRef = useRef<HTMLElement>(null);
  const reflectionSentencesRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [frogClicks, setFrogClicks] = useState(0);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false
  );

  const handleFrogClick = () => {
    const newCount = frogClicks + 1;
    setFrogClicks(newCount);
    if (newCount >= 5) {
      setShowSecretMessage(true);
      setFrogClicks(0);
    }
  };

  // Handle responsive breakpoint changes
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Horizontal scroll effect - only on desktop
  useEffect(() => {
    // Skip horizontal scroll setup on mobile
    if (isMobile) {
      // Kill any existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach((st) => st.kill());
      return;
    }

    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    if (!wrapper || !container) return;

    // Calculate the scroll distance
    const getScrollAmount = () => {
      const containerWidth = container.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    // Create the horizontal scroll animation
    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Intro sentences parallax animation
    const introSection = introSentencesRef.current;
    const sentences = introSection?.querySelectorAll(".intro-sentence");
    const sentenceAnimations: gsap.core.Tween[] = [];

    if (introSection && sentences) {
      sentences.forEach((sentence) => {
        const anim = gsap.fromTo(
          sentence,
          {
            x: 300,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sentence,
              containerAnimation: tween,
              start: "left 85%",
              end: "left 50%",
              scrub: 2,
            },
          }
        );
        sentenceAnimations.push(anim);
      });
    }

    // Reflection sentences parallax animation
    const reflectionSection = reflectionSentencesRef.current;
    const reflectionSentences = reflectionSection?.querySelectorAll(
      ".reflection-sentence"
    );
    const reflectionAnimations: gsap.core.Tween[] = [];

    if (reflectionSection && reflectionSentences) {
      reflectionSentences.forEach((sentence) => {
        const anim = gsap.fromTo(
          sentence,
          {
            x: 300,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sentence,
              containerAnimation: tween,
              start: "left 85%",
              end: "left 50%",
              scrub: 2,
            },
          }
        );
        reflectionAnimations.push(anim);
      });
    }

    // Handle resize for ScrollTrigger refresh
    const handleScrollTriggerRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleScrollTriggerRefresh);

    // Refresh ScrollTrigger after content loads to ensure proper width calculation
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Also refresh after window fully loads (including images)
    const handleLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("resize", handleScrollTriggerRefresh);
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      sentenceAnimations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
      reflectionAnimations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  return (
    <div
      className='relative min-h-screen'
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Year Watermark */}
      <div className='year-watermark' aria-hidden='true'>
        2025
      </div>

      {/* Header */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between pb-12 pt-6 ${
          isMobile ? "px-4 pb-8" : "px-8"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, #fafafa, rgba(250,250,250,0.95), transparent)",
        }}
      >
        <h1
          className={`font-headline tracking-widest ${isMobile ? "text-lg" : "text-2xl"}`}
          style={{ color: "#000000" }}
        >
          2025's Recap
        </h1>
        <p className='font-body text-sm italic' style={{ color: "#666666" }}>
          A Year in Photos
        </p>
      </header>

      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapperRef} className='horizontal-scroll-wrapper'>
        <div ref={containerRef} className='horizontal-scroll-container'>
          {/* Intro Section */}
          <section
            className={`flex flex-col items-center justify-center ${
              isMobile
                ? "intro-section-mobile min-h-screen w-full px-6 pt-20"
                : "h-screen w-screen flex-shrink-0 px-8"
            }`}
          >
            <h2
              className={`font-display italic ${isMobile ? "text-5xl" : "text-6xl md:text-8xl lg:text-9xl"}`}
              style={{ color: "#000000" }}
            >
              Twenty
            </h2>
            <h2
              className={`font-display ${isMobile ? "text-5xl" : "text-6xl md:text-8xl lg:text-9xl"}`}
              style={{ color: "#000000" }}
            >
              Twenty-Five
            </h2>
            <p
              className='mt-8 max-w-md text-center font-body text-lg'
              style={{ color: "#666666" }}
            >
              Rin's annual recap for 2025
            </p>
            <div
              className='mt-12 flex items-center gap-2'
              style={{ color: "#666666" }}
            >
              <span className='font-headline text-xs tracking-widest'>
                SCROLL
              </span>
              <svg
                className={`h-4 w-4 animate-pulse ${isMobile ? "rotate-90" : ""}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </div>
          </section>

          {/* Intro Sentences - Parallax Section */}
          <section ref={introSentencesRef} className='intro-sentences-section'>
            <div className='intro-sentence sentence-1'>
              <p>So another year has passed..</p>
            </div>
            <div className='intro-sentence sentence-2'>
              <p>
                As always, there should be something every year for me to look
                back on and be proud of.
              </p>
            </div>
            <div className='intro-sentence sentence-3'>
              <p>
                For this year recap, I wanted to do something different. Just to
                spice things up a bit.
              </p>
            </div>
            <div className='intro-sentence sentence-4'>
              <p>So here it is, my 2025's recap.</p>
            </div>
          </section>

          {/* Month Sections */}
          {MONTHS.map((month, index) => (
            <MonthSection
              key={month.id}
              month={month}
              index={index}
              onPhotoClick={setSelectedPhoto}
              isMobile={isMobile}
            />
          ))}

          {/* Reflection Section - Parallax */}
          <section
            ref={reflectionSentencesRef}
            className='reflection-sentences-section'
          >
            <div className='reflection-sentence'>
              <p className='reflection-opening'>
                So another year has passed, and here I am doing the thing that I
                have been doing for 3-4 years now. This year, 2025, was a
                questionable year for me. Many things have happened, and I don't
                know where to start.
              </p>
            </div>

            <div className='reflection-sentence'>
              <h3 className='reflection-heading'>Family</h3>
              <p>
                Nothing much; I still have great support from my family, and I
                still love them with all of my heart. I should call my parent
                more next year. :3
              </p>
            </div>

            <div className='reflection-sentence'>
              <h3 className='reflection-heading'>Friends & Relationships</h3>
              <p>
                This is the strangest aspect of my life this year. First of all,
                thanks, Cún, for being my housemate for the last year; I will
                keep bothering you next year. Love you. Next on the line, I want
                to thank Hạnh for being my F1 wingman throughout the entire 2025
                season; this season will be less fun without you 🏎️.
              </p>
              <p>
                Another wonderful thing that happened to me this year was in
                April, when I met several friends in a "small" group that I
                accidentally joined. I can't name you all, but thank you for
                being a part of my 2025.
              </p>
              <p>
                I also did something stupid at the end of this year; I hope it's
                worth a shot. I might just go all in for it to see if I have any
                chance; we'll see{" "}
                <span
                  onClick={handleFrogClick}
                  className='frog-easter-egg'
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleFrogClick()}
                >
                  🐸
                </span>
                .
              </p>
            </div>

            <div className='reflection-sentence'>
              <h3 className='reflection-heading'>Work</h3>
              <p>
                At the beginning of the year, I got accepted to intern at
                NVIDIA, which is something I never would have thought of. I want
                to express my gratitude to Mr. Tingxi for giving me a chance at
                NIM and all of your advice.
              </p>
              <p>
                Next, I want to thank Mr. Darren for bringing me into the XLogs
                project and letting me meet the XLogs team. It has been my
                pleasure to work with you guys for the last 6 months, and I hope
                next year we could bring XLogs into something more special than
                what it is right now.
              </p>
            </div>

            <div className='reflection-sentence'>
              <h3 className='reflection-heading'>School</h3>
              <p>
                This year I have successfully earned my first HD since I first
                moved to SG; big thanks to the Fullstack team for helping me
                achieve this goal. Everything else went as expected; I am
                excited for my capstone project, which will let me graduate from
                university and get the hell out of Saigon.
              </p>
            </div>

            <div className='reflection-sentence'>
              <p className='reflection-summary'>
                So in summary, this year was chaos. But it was much better than
                last year. I'm looking forward to seeing how dumb I can be in
                2026.
              </p>
            </div>

            <div className='reflection-sentence'>
              <h3 className='reflection-heading'>Next year's goals</h3>
              <ul className='reflection-goals'>
                <li>Graduate from university</li>
                <li>Don't fuck up whatever you are doing with your life.</li>
                <li>Fall as hard as you can</li>
              </ul>
            </div>

            <div className='reflection-sentence'>
              <p className='reflection-closing'>And last of all love u :3</p>
            </div>
          </section>

          {/* Outro Section */}
          <section
            className={`flex flex-col items-center justify-center ${
              isMobile
                ? "outro-section-mobile min-h-[60vh] w-full px-6 py-16"
                : "h-screen w-screen flex-shrink-0 px-8"
            }`}
          >
            <h2
              className={`font-display italic text-black ${isMobile ? "text-4xl" : "text-5xl md:text-7xl lg:text-8xl"}`}
            >
              Until
            </h2>
            <h2
              className={`font-display text-black ${isMobile ? "text-4xl" : "text-5xl md:text-7xl lg:text-8xl"}`}
            >
              Next Year
            </h2>
            <p className='mt-8 max-w-md text-center font-body text-lg text-gray'>
              We will see how dumb I can be at the end of 2026
            </p>
            <div className='mt-12 font-headline text-xl tracking-widest text-light-gray'>
              2026
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MonthNav scrollTo={scrollTo} isMobile={isMobile} />

      {/* Lightbox */}
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Secret Easter Egg Message */}
      {showSecretMessage && (
        <div
          className='secret-message-overlay'
          onClick={() => setShowSecretMessage(false)}
        >
          <div
            className='secret-message-container'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='secret-message-close'
              onClick={() => setShowSecretMessage(false)}
              aria-label='Close'
            >
              ×
            </button>
            <div className='secret-message-content'>
              <h3>You found the secret!</h3>
              <p>
                Chào cậu, nếu cậu tìm đc cái nè thì chắc cậu bt cậu là ai r nhỉ
                :3
                <br />
                <br />
                Tớ ko bt phải bắt đầu từ đâu, nhg mà cảm ơn cậu đã đi chơi với
                tớ mấy ngày vừa rồi.
                <br />
                <br />
                Xin lỗi hôm nọ nói có hơi bất ngờ nhg mà tớ muốn nói ra để đề
                phòng ko có cơ hội nói ra nữa, lần trc lỡ một lần nên chừa r
                :)))
                <br />
                <br />
                Tớ hi vọng cậu có thể cho tớ một cơ hội để nghiêm túc với cậu
                trong một mqh nè mặc dù là nó có hơi rắc rối một tí.
                <br />
                <br />
                Hi vọng 2026 sẽ nhẹ nhàng với bạn.
                <br />
                <br />
                Love u
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
