import ProductSection from "./ProductSection";
import products from "../../data/products";

const NewestProducts = () => {
  const newest = [...products].reverse();
  return <ProductSection id="newest" title="جدیدترین‌ها" products={newest} limit={4} />;
};

export default NewestProducts;