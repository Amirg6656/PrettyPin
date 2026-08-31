import ProductSection from "./ProductSection.jsx";
import products from "../../../data/products.js";

const PopularProducts = () => {
  return <ProductSection id="featured" title="محبوب‌ترین‌ها" products={products} limit={4} />;
};

export default PopularProducts;