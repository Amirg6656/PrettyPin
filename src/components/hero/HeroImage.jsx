const HeroImage = ({ image }) => {
  return (
    <>
      <img
        src={image}
        alt="بنر فروشگاه"
        className="h-[380px] w-full object-cover sm:h-[420px] md:h-[520px]"
      />

      {/* موبایل: فقط پایین عکس تیره میشه، نه کل عکس */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent sm:hidden" />

      {/* دسکتاپ: گرادیانت جهت‌دار سمت راست، مثل قبل */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/60 via-black/20 to-transparent sm:block" />
    </>
  );
};

export default HeroImage;