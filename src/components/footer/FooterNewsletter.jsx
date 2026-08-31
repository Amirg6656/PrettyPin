import { useState } from "react";
import { Mail } from "lucide-react";

const FooterNewsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("عضویت با ایمیل:", email);
        setEmail("");
    };

    return (
        <div className="rounded-3xl bg-linear-to-l from-pink-600 to-pink-500 px-6 py-10 text-center text-white sm:px-10">
            <h3 className="text-xl font-bold sm:text-2xl">در خبرنامه زیبانو عضو شو</h3>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
                از جدیدترین محصولات و تخفیف‌های ویژه باخبر شو
            </p>

            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
                <div className="relative flex-1">
                    <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-black" />
                    <input
                        type="email"
                        dir="rtl"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ایمیل خود را وارد کن"
                        className="h-14 font-bold w-full rounded-full border-none pl-4 pr-11 text-right text-sm text-black bg-white outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="h-12 shrink-0 rounded-full bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-black"
                >
                    عضویت
                </button>
            </form>
        </div>
    );
};

export default FooterNewsletter;