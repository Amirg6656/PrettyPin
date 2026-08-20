import ProductSection from "./ProductSection";
import products from "../../data/products";

const PopularProducts = () => {
  return <ProductSection id="featured" title="محبوب‌ترین‌ها" products={products} limit={4} />;
};

export default PopularProducts;