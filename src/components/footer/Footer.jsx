import Container from "../common/Container";
import FooterNewsletter from "./FooterNewsletter";
import FooterLinkColumn from "./FooterLinkColumn";
import FooterAddress from "./FooterAddress";
import FooterTrustBadges from "./FooterTrustBadges";
import FooterBottom from "./FooterBottom";
import footerLinks from "../../data/footerLinks";

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-10 sm:pt-14">
            <Container>

                {/* خبرنامه: کمی از بدنه‌ی تیره‌ی فوتر جدا و برجسته‌ست */}
                <FooterNewsletter />

                {/* ستون‌های اطلاعات */}
                <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <span className="text-xl font-bold text-white sm:text-2xl">زیبانو</span>
                        <p className="mt-3 max-w-xs text-sm text-gray-400">
                            زیبایی در جزئیات توست. جدیدترین اکسسوری‌های مو و زیورآلات برای هر سلیقه.
                        </p>
                    </div>

                    {footerLinks.map((column) => (
                        <FooterLinkColumn key={column.id} title={column.title} links={column.links} />
                    ))}

                    <FooterAddress />
                </div>

                {/* نمادهای اعتماد */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <h4 className="mb-4 text-sm font-bold text-white">نمادهای اعتماد</h4>
                    <FooterTrustBadges />
                </div>

                {/* کپی‌رایت و شبکه‌های اجتماعی */}
                <div className="mt-8 pb-8">
                    <FooterBottom />
                </div>

            </Container>
        </footer>
    );
};

export default Footer;