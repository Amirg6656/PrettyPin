import ProductSection from "./ProductSection.jsx";
import products from "../../../data/products.js";

const BestSellingProducts = () => {
  return <ProductSection id="bestselling" title="پرفروش‌ترین‌ها" products={products} limit={2} />;
};

export default BestSellingProducts;