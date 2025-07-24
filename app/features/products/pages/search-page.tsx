// Placeholder for Search Page

import { data, Form, Link } from "react-router"
import { z } from "zod"
import type { Route } from "./+types/search-page"
import { PageHeader } from "~/common/components/PageHeader"
import { Input } from "~/common/components/ui/input"
import { Button } from "~/common/components/ui/button"
import { ProductCard } from "../components/product-card"
import ProductPagination from "~/common/components/product-pagination"

export const meta: Route.MetaFunction = ({ params }) => {
    return [{ title: `Search for products` }]
}

const paramsSchema = z.object({
    query: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),
})

export const loader = ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url)
    const { success, data: parsedData } = paramsSchema.safeParse(
        Object.fromEntries(url.searchParams)
    )
    if (!success) {
        throw data(
            { error_code: "invalid_params", message: "Invalid params" },
            { status: 400 }
        )
    }

    return {
        ...parsedData,
    }
}

export default function SearchPage() {
    return (
        <div className="space-y-10">
            <PageHeader
                title="Search"
                subtitle="Search for products by title or description"
            />
            <Form className="flex items-center justify-center gap-2 mx-auto max-w-screen-md">
                <Input
                    name="query"
                    placeholder="Search for products"
                    className="text-lg"
                />
                <Button type="submit">Search</Button>
            </Form>
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 11 }).map((_, index) => (
                    <ProductCard
                        key={`productId-${index}`}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
            </div>
            <ProductPagination totalPages={10} />
        </div>
    )
}
