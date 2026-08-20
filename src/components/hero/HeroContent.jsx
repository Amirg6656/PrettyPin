import { Gift } from "lucide-react";
import HeroBadge from "./HeroBadge";
import HeroButton from "./HeroButton";

const HeroContent = ({ slide }) => {
  return (
    <div
      className="
        absolute inset-x-0 bottom-0 flex flex-col px-4 pb-6 text-right text-white
        sm:inset-y-0 sm:inset-x-auto sm:right-0 sm:w-full sm:max-w-105
        sm:justify-center sm:px-8 sm:pb-0
        md:max-w-140 md:px-10
      "
    >
      <h1 className="text-xl font-bold leading-[1.35] sm:text-4xl md:text-5xl">
        {slide.title[0]}
        <br />
        {slide.title[1]}
      </h1>

      <p className="mt-3 hidden max-w-105 text-base leading-8 text-white/90 sm:mt-4 sm:block">
        {slide.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-end gap-2 sm:mt-8 sm:gap-4">
        <HeroBadge icon={<Gift size={16} />} text={slide.discountText} variant="solid" />
        <HeroBadge text={slide.shippingText} />
      </div>

      <div className="mt-3 sm:mt-8 flex justify-end">
        <HeroButton />
      </div>
    </div>
  );
};

export default HeroContent;