import trustBadges from "../../data/trustBadges";

const FooterTrustBadges = () => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {trustBadges.map((badge) => (
                <div
                    key={badge.id}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-800 text-center text-[10px] text-gray-400"
                >
                    {badge.label}
                </div>
            ))}
        </div>
    );
};

export default FooterTrustBadges;