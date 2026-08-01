const IconButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full border border-gray-500 bg-white
        transition-all duration-200
        hover:border-pink-500 hover:text-pink-500 hover:shadow-md
        sm:h-11 sm:w-11
      "
    >
      {children}
    </button>
  );
};

export default IconButton;