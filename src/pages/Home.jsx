import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import CategoryList from "../components/category/CategoryList";
import FilterBar from "../components/filterBar/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import BestSellers from "../components/product/BestSellers";
import NewArrivals from "../components/product/NewArrivals";
import Benefits from "../components/benefits/Benefits";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <>
        <Header />
        <Hero />
        <CategoryList />
        <FilterBar />
        <ProductGrid />
        <BestSellers />
        <NewArrivals />
        <Benefits />
        <Footer />
    </>
  );
};

export default Home;