import { filterCategories, PRICE_MIN, PRICE_MAX } from "../../data/filterOptions";

const FilterPanelContent = ({
                                filters,
                                onToggleCategory,
                                onPriceChange,
                                onToggleDiscount,
                                onApply,
                                onClear,
                            }) => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="text-sm font-bold text-gray-900">دسته‌بندی</h4>
                <div className="mt-3 flex flex-col gap-2">
                    {filterCategories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(cat.id)}
                                onChange={() => onToggleCategory(cat.id)}
                                className="h-4 w-4 accent-pink-500"
                            />
                            {cat.label}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-bold text-gray-900">محدوده قیمت (تومان)</h4>
                <div className="mt-3 flex items-center gap-3">
                    <input
                        type="number"
                        min={PRICE_MIN}
                        value={filters.minPrice}
                        onChange={(e) => onPriceChange("minPrice", Number(e.target.value))}
                        placeholder="حداقل"
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-pink-500"
                    />
                    <span className="text-gray-400">تا</span>
                    <input
                        type="number"
                        max={PRICE_MAX}
                        value={filters.maxPrice}
                        onChange={(e) => onPriceChange("maxPrice", Number(e.target.value))}
                        placeholder="حداکثر"
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-pink-500"
                    />
                </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                    type="checkbox"
                    checked={filters.discountOnly}
                    onChange={onToggleDiscount}
                    className="h-4 w-4 accent-pink-500"
                />
                فقط محصولات تخفیف‌دار
            </label>

            <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                <button
                    type="button"
                    onClick={onClear}
                    className="flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
                >
                    پاک کردن
                </button>
                <button
                    type="button"
                    onClick={onApply}
                    className="flex-1 rounded-full bg-pink-500 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                    اعمال فیلتر
                </button>
            </div>
        </div>
    );
};

export default FilterPanelContent;