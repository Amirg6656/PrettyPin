const HeroBadge = ({ icon, text, variant = "light" }) => {
  const styles = variant === "solid" ? "bg-pink-500 text-white" : "bg-white/90 text-gray-800";

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${styles}`}
    >
      {icon}
      <span className="max-w-[150px] truncate sm:max-w-none sm:truncate-none">{text}</span>
    </div>
  );
};

export default HeroBadge;