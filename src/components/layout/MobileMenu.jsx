import { Heart, User } from "lucide-react";
import SearchBar from "./SearchBar";

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
  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-200 px-4 py-6 md:hidden">
      <SearchBar />

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

      <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-6">
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Heart size={20} />
          علاقه‌مندی‌ها
        </button>

        <button className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <User size={20} />
          حساب کاربری
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;