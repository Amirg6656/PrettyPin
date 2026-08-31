const BenefitItem = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500 sm:h-14 sm:w-14">
        <Icon size={24} />
      </span>

            <div>
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">{title}</h3>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{description}</p>
            </div>
        </div>
    );
};

export default BenefitItem;