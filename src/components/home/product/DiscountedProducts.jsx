import ProductSection from "./ProductSection.jsx";
import products from "../../../data/products.js";

const DiscountedProducts = () => {
  const discounted = products.filter((p) => p.discountPercent > 0);
  return <ProductSection id="discounted" title="تخفیف‌دارها" products={discounted} limit={4} />;
};

export default DiscountedProducts;