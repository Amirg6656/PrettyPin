import Container from "../../common/Container.jsx";
import BenefitItem from "./BenefitItem.jsx";
import benefits from "../../../data/benefits.js";

const Benefits = () => {
    return (
        <section className="flex items-center justify-center border-y border-gray-200 bg-gray-50 py-8 sm:py-10">
            <Container>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                    {benefits.map((item) => (
                        <BenefitItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Benefits;