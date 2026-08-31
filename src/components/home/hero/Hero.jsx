import { useState, useRef } from "react";
import heroSlides from "../../../data/heroSlides.js";
import HeroImage from "./HeroImage.jsx";
import HeroContent from "./HeroContent.jsx";
import SliderDots from "./SliderDots.jsx";
import HeroArrows from "./HeroArrows.jsx";
import { useEffect } from "react";

const SWIPE_THRESHOLD = 50;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];
  const touchStartX = useRef(null);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > SWIPE_THRESHOLD) goToNext();
    else if (diff < -SWIPE_THRESHOLD) goToPrev();

    touchStartX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-4 sm:px-6 sm:py-6 sm:mx-8 md:px-8 md:mx-8">
      <div
        className="group relative overflow-hidden rounded-2xl sm:rounded-4xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <HeroImage image={activeSlide.image} />
        <HeroContent slide={activeSlide} />
        <SliderDots
          total={heroSlides.length}
          activeIndex={activeIndex}
          onDotClick={setActiveIndex}
        />
        <HeroArrows onPrev={goToPrev} onNext={goToNext} />
      </div>
    </section>
  );
};

export default Hero;