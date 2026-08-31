import { useState } from "react";
import { Heart, User, ChevronDown } from "lucide-react";
import SearchToggle from "./SearchToggle.jsx";
import accountLinks from "../../data/accountLinks.js";

const navLinks = [
  "جدیدترین‌ها",
  "اکسسوری مو",
  "زیورآلات",
  "آرایشی",
  "بافت مو",
  "ساعت و عینک",
  "پیشنهاد ویژه",
  "بلاگ",
  "تماس با ما",
];

const MobileMenu = ({ isOpen, onClose }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  if (!isOpen) return null;

  return (
      <div className="border-t border-gray-200 px-4 py-6 md:hidden">
        <SearchToggle />

        <ul className="mt-6 flex flex-col gap-4">
          {navLinks.map((item) => (
              <li key={item}>
                <a
                    href="#"
                    onClick={onClose}
                    className="block text-base font-bold text-black transition hover:text-pink-500"
                >
                  {item}
                </a>
              </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <button
              type="button"
              onClick={() => setIsAccountOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-sm font-semibold text-gray-800"
          >
          <span className="flex items-center gap-2">
            <User size={20} />
            حساب کاربری
          </span>

            <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                    isAccountOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isAccountOpen && (
              <ul className="mt-3 flex flex-col gap-1 pr-7">
                {accountLinks.map(({ id, label, href }) => (
                    <li key={id}>
                      <a
                          href={href}
                          onClick={onClose}
                          className="block py-2 text-sm text-gray-600 transition hover:text-pink-500"
                      >
                        {label}
                      </a>
                    </li>
                ))}
              </ul>
          )}

          <button
              type="button"
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <Heart size={20} />
            علاقه‌مندی‌ها
          </button>
        </div>
      </div>
  );
};

export default MobileMenu;