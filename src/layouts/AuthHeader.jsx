import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Logo from "../components/layout/Logo";

export default function AuthHeader() {
    return (
        <header className="w-full py-5 px-4 sm:px-8 flex items-center bg-white border-b border-gray-100">
            {/* ستون راست: دکمه بازگشت */}
            <div className="flex-1 flex justify-start">
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                    <Home size={18} />
                    <span className="hidden sm:inline">صفحه اصلی</span>
                </Link>
            </div>

            {/* ستون وسط: لوگو */}
            <div className="flex-1 flex justify-center">
                <Logo />
            </div>

            {/* ستون چپ: فضای خالی برای تعادل */}
            <div className="flex-1" />
        </header>
    );
}