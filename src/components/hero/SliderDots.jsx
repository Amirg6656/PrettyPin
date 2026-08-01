const SliderDots = ({ total, activeIndex, onDotClick }) => {
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-6 sm:gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onDotClick(index)}
          className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
            index === activeIndex ? "w-5 bg-white sm:w-6" : "w-1.5 bg-white/50 sm:w-2"
          }`}
        />
      ))}
    </div>
  );
};

export default SliderDots;