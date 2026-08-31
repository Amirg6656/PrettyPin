import { MapPin, Phone, Mail } from "lucide-react";

const FooterAddress = () => {
  return (
    <div dir="rtl" className="text-right">
      <h4 className="text-sm font-bold text-white sm:text-base">ارتباط با ما</h4>
      <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0 text-pink-400" />
          <span>ابهر, خیابان ولیعصر, جنب کوچه دبیرستان ایران</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="shrink-0 text-pink-400" />
          <span dir="ltr">09035979460</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} className="shrink-0 text-pink-400" />
          <span dir="ltr">zibanostyle@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default FooterAddress;