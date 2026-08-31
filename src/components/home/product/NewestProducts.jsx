import ProductSection from "./ProductSection.jsx";
import products from "../../../data/products.js";

const NewestProducts = () => {
  const newest = [...products].reverse();
  return <ProductSection id="newest" title="جدیدترین‌ها" products={newest} limit={4} />;
};

export default NewestProducts;