import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import imgSrc from "../../assets/images/10.png"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("رمز عبور و تکرار آن یکسان نیستند");
            return;
        }

        setError("");
        // TODO: اتصال به API ثبت‌نام Django (قدم بعدی Roadmap: Axios)
        console.log(formData);
    };

    return (
        <AuthLayout
            imageSrc={imgSrc}
            imageAlt="اکسسوری مو زیبانو"
        >
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-primary mb-10">
                    ساخت حساب کاربری
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* نام و نام خانوادگی */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
                            نام و نام خانوادگی
                        </label>
                        <div className="relative">
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="نام و نام خانوادگی خود را وارد کنید"
                                className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-11 outline-none transition-colors"
                            />
                            <User className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                        </div>
                    </div>

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
                                required
                                minLength={8}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="حداقل ۸ کاراکتر"
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

                    {/* تکرار رمز عبور */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                            تکرار رمز عبور
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="رمز عبور را دوباره وارد کنید"
                                className="w-full rounded-xl border border-gray-300 py-3 ps-4 pe-11 outline-none transition-colors"
                            />
                            <Lock className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                        </div>
                    </div>

                    {/* پیام خطا */}
                    {error && (
                        <p className="text-sm text-red-500 -mt-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
                    >
                        ثبت‌نام
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    قبلاً ثبت‌نام کرده‌اید؟{" "}
                    <Link to="/login" className="text-accent font-medium hover:underline">
                        وارد شوید
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}