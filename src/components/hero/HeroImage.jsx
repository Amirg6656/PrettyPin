const HeroImage = ({ image }) => {
  return (
    <>
      <img
        src={image}
        alt="بنر فروشگاه"
        className="h-[320px] w-full object-cover sm:h-[420px] md:h-[520px]"
      />

      {/* موبایل: محتوا پایین عکسه، پس یه سایه‌ی یکنواخت کافیه */}
      <div className="absolute inset-0 bg-black/45 sm:hidden" />

      {/* دسکتاپ: محتوا سمت راسته، پس گرادیانت جهت‌دار لازمه */}
      <div className="absolute inset-0 hidden bg-gradient-to-l from-black/60 via-black/350 to-transparent sm:block" />
    </>
  );
};

export default HeroImage;