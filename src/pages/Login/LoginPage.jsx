import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import imgSrc from "../../assets/images/10.png"

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: اتصال به API لاگین Django (قدم بعدی Roadmap: Axios)
        console.log(formData, rememberMe);
    };

    return (
        <AuthLayout
            imageSrc={imgSrc}
            imageAlt="اکسسوری مو زیبانو"
        >
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-primary mb-10">
                    ورود به حساب کاربری
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* شماره موبایل */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                            شماره موبایل
                        </label>
                        <div className="relative">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                dir="ltr"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0912 345 6789"
                                className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-4 text-right outline-none transition-colors"
                            />
                            <Phone className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                        </div>
                    </div>

                    {/* رمز عبور */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                            رمز عبور
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="رمز عبور خود را وارد کنید"
                                className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-11 outline-none transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* مرا به خاطر بسپار + فراموشی رمز */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            مرا به خاطر بسپار
                        </label>
                        <Link to="/forgot-password" className="text-accent hover:underline">
                            رمز عبور خود را فراموش کرده‌اید؟
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
                    >
                        ورود
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    حساب کاربری ندارید؟{" "}
                    <Link to="/register" className="text-accent font-medium hover:underline">
                        ثبت نام کنید
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}