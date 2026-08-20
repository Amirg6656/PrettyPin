const FilterTab = ({ id, label, isActive, onClick }) => {
  const handleClick = () => {
    onClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold
        transition-all duration-200
        sm:px-5
        ${isActive ? "bg-pink-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}
      `}
    >
      {label}
    </button>
  );
};

export default FilterTab;