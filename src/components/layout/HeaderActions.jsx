import { Heart, ShoppingBag } from "lucide-react";
import IconButton from "../common/IconButton";
import AccountMenu from "./AccountMenu";

const HeaderActions = ({ mobile = false }) => {
    return (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            <IconButton label="سبد خرید">
                <ShoppingBag size={20} />
            </IconButton>

            {!mobile && (
                <>
                    <IconButton label="علاقه‌مندی‌ها">
                        <Heart size={20} />
                    </IconButton>
                    <AccountMenu />
                </>
            )}
        </div>
    );
};

export default HeaderActions;