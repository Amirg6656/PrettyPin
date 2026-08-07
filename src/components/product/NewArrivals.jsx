import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../product/ProductCard";
import products from "../../data/products";

const NewArrivals = () => {
    const newestProducts = [...products].reverse().slice(0, 4);

    return (
        <section className="py-8 sm:py-12">
            <Container>
                <SectionHeader title="جدیدترین‌ها" subtitle="تازه‌ترین محصولات اضافه‌شده به فروشگاه" />

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
                    {newestProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default NewArrivals;