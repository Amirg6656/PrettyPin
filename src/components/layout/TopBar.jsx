import { useState } from "react";
import Container from "../common/Container";
import { Truck, User } from "lucide-react";

const TopBar = () => {
    // موقتی: بعداً از Context جایگزین میشه
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <Container>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                        <Truck size={16} />
                        <span>ارسال رایگان برای خرید بالای ۲ میلیون تومان</span>
                    </div>

                    {!isLoggedIn && (
                        <a
                            onClick={() => setIsLoggedIn(true)}
                            href="#"
                            className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-pink-500 transition hover:text-pink-600 sm:text-sm"
                        >
                            <User size={14} className="sm:hidden" />
                            ورود / ثبت‌نام
                        </a>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default TopBar;