import { SlidersHorizontal } from "lucide-react";

const FilterButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        flex shrink-0 items-center gap-2 rounded-full border border-gray-300
        bg-white px-4 py-2 text-sm font-semibold text-gray-800
        transition hover:border-pink-500 hover:text-pink-500
        sm:px-5
      "
        >
            <SlidersHorizontal size={16} />
            فیلترها
        </button>
    );
};

export default FilterButton;