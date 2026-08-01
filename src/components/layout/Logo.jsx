import logo from "../../assets/images/5.png";

const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2">
      <span className="text-xl font-bold text-black sm:text-2xl">زیبانو</span>
      <img src={logo} alt="PrettyPin" className="h-8 w-auto sm:h-10" />
    </a>
  );
};

export default Logo;