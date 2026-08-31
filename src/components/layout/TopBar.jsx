import Container from "../common/Container.jsx";
import { Truck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TopBar = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="border-b border-gray-200">
            <Container>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                        <Truck size={16} />
                        <span>ارسال رایگان برای خرید بالای ۲ میلیون تومان</span>
                    </div>

                    {!isLoggedIn && (
                        <Link
                            to="/login"
                            className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-pink-500 transition hover:text-pink-600 sm:text-sm"
                        >
                            <User size={18} />
                            ورود / ثبت‌نام
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default TopBar;