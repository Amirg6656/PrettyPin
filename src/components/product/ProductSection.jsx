import { ArrowLeft } from "lucide-react";
import Container from "../common/Container";
import ProductCard from "./ProductCard";

const ProductSection = ({ id, title, products, limit = 4 }) => {
  const visibleProducts = products.slice(0, limit);
  const hasMore = products.length > limit;

  const handleViewAll = () => {
    console.log(`مشاهده همه محصولات بخش: ${title}`);
    // بعداً با React Router به صفحه‌ی نتایج همین دسته هدایت می‌کنیم
  };

  return (
    <section
      id={id}
      dir="rtl"
      className="scroll-mt-20 py-8 sm:scroll-mt-24 sm:py-10 md:scroll-mt-28"
    >
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>

          {hasMore && (
            <button
              type="button"
              onClick={handleViewAll}
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-pink-500 transition hover:gap-2"
            >
              مشاهده همه
              <ArrowLeft size={16} />
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;