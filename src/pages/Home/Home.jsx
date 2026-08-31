import Header from "../../components/layout/Header.jsx";
import Hero from "../../components/home/hero/Hero.jsx";
import CategoryList from "../../components/home/category/CategoryList.jsx";
import FilterBar from "../../components/home/filterBar/FilterBar.jsx";
import PopularProducts from "../../components/home/product/PopularProducts.jsx";
import NewestProducts from "../../components/home/product/NewestProducts.jsx";
import BestSellingProducts from "../../components/home/product/BestSellingProducts.jsx";
import DiscountedProducts from "../../components/home/product/DiscountedProducts.jsx";
import Benefits from "../../components/home/benefits/Benefits.jsx";
import Footer from "../../components/footer/Footer.jsx";

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