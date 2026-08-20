const FooterLinkColumn = ({ title, links }) => {
  return (
    <div dir="rtl" className="text-right">
      <h4 className="text-sm font-bold text-white sm:text-base">{title}</h4>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-400 transition hover:text-pink-400">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkColumn;