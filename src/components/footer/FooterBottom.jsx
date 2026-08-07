import { Send, MessageCircle } from "lucide-react";
import InstagramIcon from "../common/InstagramIcon";

const socials = [
    { id: "instagram", icon: InstagramIcon, href: "#" },
    { id: "telegram", icon: Send, href: "#" },
    { id: "whatsapp", icon: MessageCircle, href: "#" },
];

const FooterBottom = () => {
    return (
        <div className="flex flex-col gap-4 border-t border-gray-800 pt-6">
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                <p className="text-xs text-gray-500 sm:text-sm">
                    © ۱۴۰۴ زیبانو. تمامی حقوق محفوظ است.
                </p>

                <div className="flex items-center gap-3">
                    {socials.map(({ id, icon: Icon, href }) => (
                        <a
                        key={id}
                        href={href}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-pink-500 hover:text-pink-400"
                        >
                        <Icon size={16} />
                        </a>
                        ))}
                </div>
            </div>

            <p className="text-center text-xs text-gray-600">
                طراحی و توسعه توسط تیم دولوپرز
            </p>
        </div>
    );
};

export default FooterBottom;