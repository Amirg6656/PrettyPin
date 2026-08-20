import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import CategoryList from "../components/category/CategoryList";
import FilterBar from "../components/filterBar/FilterBar";
import PopularProducts from "../components/product/PopularProducts";
import NewestProducts from "../components/product/NewestProducts";
import BestSellingProducts from "../components/product/BestSellingProducts";
import DiscountedProducts from "../components/product/DiscountedProducts";
import Benefits from "../components/benefits/Benefits";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <>
        <Header />
        <Hero />
        <CategoryList />
        <FilterBar />
        <PopularProducts />
        <NewestProducts />
        <BestSellingProducts />
        <DiscountedProducts />
        <Benefits />
        <Footer />
    </>
  );
};

export default Home;