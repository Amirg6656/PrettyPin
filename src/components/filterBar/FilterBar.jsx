import { useState } from "react";
import Container from "../common/Container";
import FilterPanel from "./FilterPanel";
import FilterTab from "./FilterTab";
import filterTabs from "../../data/filterTabs";

const FilterBar = () => {
    const [activeTab, setActiveTab] = useState(filterTabs[0].id);

    return (
        <section className="py-4 sm:py-6">
            <Container>
                <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:gap-4 sm:overflow-visible">
                    <FilterPanel />

                    <div className="h-6 w-px shrink-0 bg-gray-300" />

                    {filterTabs.map((tab) => (
                        <FilterTab
                            key={tab.id}
                            label={tab.label}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FilterBar;