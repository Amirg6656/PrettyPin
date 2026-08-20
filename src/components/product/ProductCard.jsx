import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

const formatPrice = (price) => price.toLocaleString("fa-IR");

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [quantity, setQuantity] = useState(0);

  const hasDiscount = product.discountPercent > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discountPercent) / 100
    : product.price;

  const handleCardClick = () => {
    console.log(`رفتن به صفحه جزئیات محصول: ${product.id}`);
    // بعداً با React Router: navigate(`/products/${product.id}`)
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setQuantity(1);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  return (
    <div
      dir="rtl"
      onClick={handleCardClick}
      className="group relative cursor-pointer rounded-2xl border border-gray-200 bg-white p-3 text-right transition-shadow duration-300 hover:shadow-lg sm:p-4"
    >

      {/* بج تخفیف */}
      {hasDiscount && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-pink-500 px-2.5 py-1 text-xs font-bold text-white sm:right-4 sm:top-4">
          {product.discountPercent}٪ تخفیف
        </span>
      )}

      {/* آیکون علاقه‌مندی */}
      <button
        type="button"
        onClick={handleFavoriteClick}
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

      {/* قیمت + دکمه افزودن / کنترل تعداد */}
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

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-pink-500 sm:h-10 sm:w-10"
          >
            <ShoppingCart size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-1 rounded-full bg-gray-900 px-1 py-1 sm:gap-2">
            <button
              type="button"
              onClick={handleIncrease}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white transition hover:bg-white/20 sm:h-8 sm:w-8"
            >
              <Plus size={14} />
            </button>

            <span className="w-4 text-center text-sm font-bold text-white">{quantity}</span>

            <button
              type="button"
              onClick={handleDecrease}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white transition hover:bg-white/20 sm:h-8 sm:w-8"
            >
              <Minus size={14} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductCard;