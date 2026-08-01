import { Menu, X } from "lucide-react";
import Container from "../common/Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";

const MainHeader = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <Container>
      <div className="flex h-16 items-center justify-between gap-4 sm:h-20 md:h-24 md:justify-center md:gap-8">

        <button type="button" onClick={onMenuToggle} className="md:hidden">
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className="hidden md:block">
          <HeaderActions />
        </div>

        <div className="hidden flex-1 md:mx-12 md:block">
          <SearchBar />
        </div>

        <Logo />

        <div className="md:hidden">
          <HeaderActions mobile />
        </div>

      </div>
    </Container>
  );
};

export default MainHeader;