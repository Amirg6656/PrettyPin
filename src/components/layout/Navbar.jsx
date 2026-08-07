import Container from "../common/Container";

const links = [
  "اکسسوری مو", "زیورآلات", "آرایشی",
  "بافت مو", "ساعت و عینک", "پیشنهاد ویژه", "تماس با ما",
];

const Navbar = () => {
  return (
    <nav className="border-t border-gray-200">
      <Container>
        <ul className="flex h-14 items-center justify-center gap-4 overflow-x-auto whitespace-nowrap lg:gap-10">
          {links.map((item) => (
            <li key={item}>
              <a href="#" className="text-sm font-bold text-black transition hover:text-pink-500">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};``

export default Navbar;