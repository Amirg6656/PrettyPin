import ProductSection from "./ProductSection";
import products from "../../data/products";

const BestSellingProducts = () => {
  return <ProductSection id="bestselling" title="پرفروش‌ترین‌ها" products={products} limit={2} />;
};

export default BestSellingProducts;