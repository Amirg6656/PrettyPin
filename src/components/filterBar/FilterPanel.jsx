import { useState, useRef } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import FilterPanelContent from "./FilterPanelContent";
import { PRICE_MIN, PRICE_MAX } from "../../data/filterOptions";

const initialFilters = {
    categories: [],
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
    discountOnly: false,
};

const FilterPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState(initialFilters);
    const panelRef = useRef(null);

    useClickOutside(panelRef, () => setIsOpen(false));

    const toggleCategory = (id) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(id)
                ? prev.categories.filter((c) => c !== id)
                : [...prev.categories, id],
        }));
    };

    const handlePriceChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const toggleDiscount = () => {
        setFilters((prev) => ({ ...prev, discountOnly: !prev.discountOnly }));
    };

    const handleClear = () => setFilters(initialFilters);

    const handleApply = () => {
        console.log("فیلترهای اعمال‌شده:", filters);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={panelRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                    isOpen
                        ? "border-pink-500 text-pink-500"
                        : "border-gray-300 bg-white text-gray-800 hover:border-pink-500 hover:text-pink-500"
                }`}
            >
                <SlidersHorizontal size={16} />
                فیلترها
            </button>

            {/* نسخه دسکتاپ: Dropdown */}
            <div
                className={`
          absolute right-0 top-full z-30 mt-3 hidden w-80 rounded-2xl border border-gray-200
          bg-white p-5 shadow-xl transition-all duration-200 sm:block
          ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}
        `}
            >
                <FilterPanelContent
                    filters={filters}
                    onToggleCategory={toggleCategory}
                    onPriceChange={handlePriceChange}
                    onToggleDiscount={toggleDiscount}
                    onApply={handleApply}
                    onClear={handleClear}
                />
            </div>

            {/* نسخه موبایل: Bottom Sheet */}
            {isOpen && (
                <div className="fixed inset-0 z-40 sm:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

                    <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-base font-bold text-gray-900">فیلترها</h3>
                            <button type="button" onClick={() => setIsOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>

                        <FilterPanelContent
                            filters={filters}
                            onToggleCategory={toggleCategory}
                            onPriceChange={handlePriceChange}
                            onToggleDiscount={toggleDiscount}
                            onApply={handleApply}
                            onClear={handleClear}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;