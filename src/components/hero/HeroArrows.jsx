import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroArrows = ({ onPrev, onNext }) => {
  const baseStyle = `
    absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center
    rounded-full bg-white/80 text-gray-800 shadow-md opacity-0
    transition-all duration-300 hover:bg-white
    sm:flex sm:group-hover:opacity-100
  `;

  return (
    <>
      <button type="button" onClick={onPrev} className={`left-4 ${baseStyle}`}>
        <ChevronLeft size={20} />
      </button>

      <button type="button" onClick={onNext} className={`right-4 ${baseStyle}`}>
        <ChevronRight size={20} />
      </button>
    </>
  );
};

export default HeroArrows;