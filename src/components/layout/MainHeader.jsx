import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Container from "../common/Container.jsx";
import Logo from "./Logo.jsx";
import SearchToggle from "./SearchToggle.jsx";
import HeaderActions from "./HeaderActions.jsx";

const MainHeader = ({ isMenuOpen, onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div
          className={`
        sticky top-0 z-50 border-b bg-white transition-shadow duration-300
        ${isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"}
      `}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 sm:h-14 md:h-14">

            <button type="button" onClick={onMenuToggle} className="md:hidden">
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div className="hidden flex-1 md:flex md:items-center">
              <SearchToggle />
            </div>

            <div className="flex justify-center md:flex-1">
              <Logo />
            </div>

            <div className="hidden flex-1 justify-end md:flex">
              <HeaderActions />
            </div>

            <div className="md:hidden">
              <HeaderActions mobile />
            </div>

          </div>
        </Container>
      </div>
  );
};

export default MainHeader;