import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const formatPrice = (price) => price.toLocaleString("fa-IR");

const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(product.isFavorite);

    const hasDiscount = product.discountPercent > 0;
    const finalPrice = hasDiscount
        ? product.price - (product.price * product.discountPercent) / 100
        : product.price;

    return (
        <div className="group relative rounded-2xl border border-gray-200 bg-white p-3 transition-shadow duration-300 hover:shadow-lg sm:p-4">

            {/* بج تخفیف */}
            {hasDiscount && (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-pink-500 px-2.5 py-1 text-xs font-bold text-white sm:right-4 sm:top-4">
          {product.discountPercent}٪ تخفیف
        </span>
            )}

            {/* آیکون علاقه‌مندی */}
            <button
                type="button"
                onClick={() => setIsFavorite((prev) => !prev)}
                className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 sm:left-4 sm:top-4"
            >
                <Heart
                    size={16}
                    className={isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-500"}
                />
            </button>

            {/* تصویر */}
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* عنوان */}
            <h3 className="mt-3 truncate text-sm font-semibold text-gray-800 sm:text-base">
                {product.title}
            </h3>

            {/* قیمت + دکمه افزودن */}
            <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-col">
                    {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)} تومان
            </span>
                    )}
                    <span className="text-sm font-bold text-gray-900 sm:text-base">
            {formatPrice(finalPrice)} تومان
          </span>
                </div>

                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-pink-500 sm:h-10 sm:w-10"
                >
                    <ShoppingCart size={16} />
                </button>
            </div>

        </div>
    );
};

export default ProductCard;