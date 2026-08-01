import { useState } from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <TopBar />

      <MainHeader
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
      />

      <div className="hidden md:block">
        <Navbar />
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;