import { useState } from "react";
import TopBar from "./TopBar.jsx";
import MainHeader from "./MainHeader.jsx";
import Navbar from "./Navbar.jsx";
import MobileMenu from "./MobileMenu.jsx";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <TopBar />

            <MainHeader
                isMenuOpen={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
            />

            <div className="hidden md:block">
                <Navbar />
            </div>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;