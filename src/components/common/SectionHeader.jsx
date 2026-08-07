import { ArrowLeft } from "lucide-react";

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
                {subtitle && (
                    <p className="mt-1 text-sm text-gray-500 sm:text-base">{subtitle}</p>
                )}
            </div>

            <button
                type="button"
                className="flex shrink-0 items-center gap-1 text-sm font-semibold text-pink-500 transition hover:gap-2"
            >
                مشاهده همه
                <ArrowLeft size={16} />
            </button>
        </div>
    );
};

export default SectionHeader;