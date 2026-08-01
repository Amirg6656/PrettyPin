import { ArrowLeft } from "lucide-react";

const HeroButton = () => {
  return (
    <button
      type="button"
      className="
        flex items-center gap-2 rounded-full bg-gray-900
        px-5 py-3 text-sm font-semibold text-white shadow-lg
        transition-all duration-300
        hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl
        sm:gap-3 sm:px-8 sm:py-4 sm:text-base
      "
    >
      همین حالا خرید کن
      <ArrowLeft size={18} />
    </button>
  );
};

export default HeroButton;