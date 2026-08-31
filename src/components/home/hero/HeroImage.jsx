const HeroImage = ({ image }) => {
  return (
    <>
      <img
        src={image}
        alt="بنر فروشگاه"
        className="h-95 w-full object-cover sm:h-105 md:h-130"
      />

      {/* موبایل: فقط پایین عکس تیره میشه، نه کل عکس */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent sm:hidden" />

      {/* دسکتاپ: گرادیانت جهت‌دار سمت راست، مثل قبل */}
      <div className="absolute inset-0 hidden bg-linear-to-r from-black/60 via-black/20 to-transparent sm:block" />
    </>
  );
};

export default HeroImage;