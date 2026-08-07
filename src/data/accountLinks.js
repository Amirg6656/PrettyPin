import { User, Package, MapPin, Heart, Truck } from "lucide-react";

const accountLinks = [
    { id: "profile", label: "اطلاعات حساب کاربری", icon: User, href: "#" },
    { id: "orders", label: "سفارش‌ها", icon: Package, href: "#" },
    { id: "addresses", label: "آدرس‌ها", icon: MapPin, href: "#" },
    { id: "wishlist", label: "علاقه‌مندی‌ها", icon: Heart, href: "#" },
    { id: "track", label: "پیگیری سفارش‌ها", icon: Truck, href: "#" },
];

export default accountLinks;