import { useState, useRef } from "react";
import { User } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import accountLinks from "../../data/accountLinks";

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside(menuRef, () => setIsOpen(false));

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 sm:h-11 sm:w-11 ${
                    isOpen
                        ? "border-pink-500 text-pink-500 shadow-md"
                        : "border-gray-500 hover:border-pink-500 hover:text-pink-500 hover:shadow-md"
                }`}
            >
                <User size={20} />
            </button>

            <div
                className={`
          absolute right-0 top-full z-30 mt-3 w-64 rounded-2xl border border-gray-200
          bg-white p-2 shadow-xl transition-all duration-200
          ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}
        `}
            >
                {accountLinks.map(({ id, label, icon: Icon, href }) => (
                    <a
                    key={id}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
                    >
                    <Icon size={18} />
                {label}
                    </a>
                    ))}
            </div>
        </div>
    );
};

export default AccountMenu;