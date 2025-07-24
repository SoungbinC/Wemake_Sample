import { PageHeader } from "~/common/components/PageHeader"
import type { Route } from "./+types/categories-page"
import { CategoryCard } from "../components/category-card"
import ProductPagination from "~/common/components/product-pagination"

export const meta: Route.MetaFunction = () => {
    return [{ title: "Categories" }]
}

export default function CategoriesPage() {
    return (
        <div className="space-y-10">
            <PageHeader title="Categories" />
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 11 }).map((_, index) => (
                    <CategoryCard
                        key={`categoryId-${index}`}
                        id={`categoryId-${index}`}
                        name="Category Name"
                        description="Category Description"
                    />
                ))}
            </div>
            <ProductPagination totalPages={10} />
        </div>
    )
}
