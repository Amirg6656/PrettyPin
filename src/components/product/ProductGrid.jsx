import Container from "../common/Container";
import ProductCard from "./ProductCard";
import products from "../../data/products";

const ProductGrid = () => {
    return (
        <section className="py-6 sm:py-8">
            <Container>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ProductGrid;