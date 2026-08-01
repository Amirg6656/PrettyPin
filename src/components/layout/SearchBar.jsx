import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[620px]">
      <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2">
        <Search size={20} className="text-black" />
      </button>

      <input
        type="text"
        dir="rtl"
        placeholder="دنبال چی هستی؟"
        className="
          h-11 w-full rounded-xl border border-gray-500
          pl-4 pr-12 text-right outline-none transition
          focus:border-pink-500
          sm:h-12
        "
      />
    </div>
  );
};

export default SearchBar;