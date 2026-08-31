import Container from "../common/Container.jsx";
import FooterNewsletter from "./FooterNewsletter.jsx";
import FooterLinkColumn from "./FooterLinkColumn.jsx";
import FooterAddress from "./FooterAddress.jsx";
import FooterTrustBadges from "./FooterTrustBadges.jsx";
import FooterBottom from "./FooterBottom.jsx";
import footerLinks from "../../data/footerLinks.js";

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-gray-900 pt-10 sm:pt-14">
      <Container>

        <FooterNewsletter />

        {/* معرفی برند: همیشه تمام‌عرض، جدا از گرید ستون‌ها */}
        <div className="mt-10 text-right">
          <span className="text-xl font-bold text-white sm:text-2xl">زیبانو</span>
          <p className="mt-3 max-w-sm text-sm text-gray-400">
            زیبایی در جزئیات توست. جدیدترین اکسسوری‌های مو و زیورآلات برای هر سلیقه.
          </p>
        </div>

        {/* گرید ستون‌ها: موبایل/تبلت ۲×۲ با خط جداکننده، دسکتاپ یک ردیف ۴تایی بدون خط */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">
          {footerLinks.map((column) => (
            <div
              key={column.id}
              className="[&:nth-child(-n+2)]:border-b [&:nth-child(-n+2)]:border-gray-800 [&:nth-child(-n+2)]:pb-8 [&:nth-child(odd)]:border-e [&:nth-child(odd)]:border-gray-800 [&:nth-child(odd)]:pe-6 lg:border-0 lg:!p-0"
            >
              <FooterLinkColumn title={column.title} links={column.links} />
            </div>
          ))}

          <div className="[&:nth-child(odd)]:border-e [&:nth-child(odd)]:border-gray-800 [&:nth-child(odd)]:pe-6 lg:border-0 lg:!p-0">
            <FooterAddress />
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <h4 className="mb-4 text-right text-sm font-bold text-white">نمادهای اعتماد</h4>
          <FooterTrustBadges />
        </div>

        <div className="mt-8 pb-8">
          <FooterBottom />
        </div>

      </Container>
    </footer>
  );
};

export default Footer;