import Container from "../common/Container";
import { Truck } from "lucide-react";

const TopBar = () => {
  return (
    <div className="border-b border-gray-200">
      <Container>
        <div className="flex h-9 items-center justify-center gap-2 text-center text-xs font-bold text-black sm:h-10 sm:justify-center sm:gap-5 sm:text-sm">
          <p>ارسال رایگان برای خرید بالای ۲ میلیون تومان</p>
          <Truck size={18} className="hidden sm:block" />
        </div>
      </Container>
    </div>
  );
};

export default TopBar;