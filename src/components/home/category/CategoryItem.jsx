const CategoryItem = ({ icon: Icon, label, bgColor }) => {
  return (
    <button type="button" className="group flex shrink-0 flex-col items-center gap-2 sm:gap-3">
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg sm:h-16 sm:w-16 md:h-20 md:w-20 ${bgColor}`}
      >
        <Icon size={24} className="text-black" />
      </span>
      <span className="text-xs font-semibold text-black sm:text-sm">{label}</span>
    </button>
  );
};

export default CategoryItem;