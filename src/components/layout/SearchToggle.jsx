import { useState, useRef } from "react";
import { Search } from "lucide-react";

const SearchToggle = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");

    const isExpanded = isHovered || isFocused;

    const handleIconClick = () => {
        if (isExpanded && query.trim()) {
            performSearch();
        } else {
            inputRef.current?.focus();
        }
    };

    const performSearch = () => {
        if (!query.trim()) return;

        console.log("جستجو برای:", query);
        setQuery("");
        inputRef.current?.blur();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        performSearch();
    };

    return (
        <div
            className="relative h-11 w-11"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <form onSubmit={handleSubmit}
                className={`
          absolute top-0 flex h-11 items-center overflow-hidden rounded-full
          border bg-white shadow-sm transition-all duration-300 ease-in-out
          ${isExpanded ? "left-0 w-72 border-pink-500" : "left-0 w-11 border-gray-500"}
        `}
            >
                <button
                    type="button"
                    onClick={handleIconClick}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-black transition-colors duration-200 hover:text-pink-500"
                >
                    <Search size={20} className="transition-transform duration-200 hover:scale-110" />
                </button>

                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={inputRef}
                    type="text"
                    dir="rtl"
                    placeholder="دنبال چی هستی؟"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="mx-6 h-full w-full bg-transparent pl-3 pr-1 text-right text-sm text-gray-800 outline-none"
                />
            </form>
        </div>
    );
};

export default SearchToggle;