import { Heart, ShoppingBag, User } from "lucide-react";
import IconButton from "../common/IconButton";

const HeaderActions = ({ mobile = false }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
      <IconButton>
        <ShoppingBag size={20} />
      </IconButton>

      {!mobile && (
        <>
          <IconButton>
            <Heart size={20} />
          </IconButton>
          <IconButton>
            <User size={20} />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default HeaderActions;