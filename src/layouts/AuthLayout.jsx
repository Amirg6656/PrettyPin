import AuthHeader from "./AuthHeader.jsx";

export default function AuthLayout({ children, imageSrc, imageAlt }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <AuthHeader />

            <div className="flex-1 grid lg:grid-cols-2">
                {/* فرم - چون سایت RTL است، این بخش طبیعتاً سمت راست قرار می‌گیرد */}
                <div className="flex items-center justify-center p-6 lg:p-12">
                    {children}
                </div>

                {/* تصویر - فقط در دسکتاپ نمایش داده می‌شود */}
                <div className="hidden lg:flex items-center justify-center p-10">
                    <div className="w-full max-h-135 rounded-3xl overflow-hidden shadow-lg">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}