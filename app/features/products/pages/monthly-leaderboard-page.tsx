// Placeholder for Monthly Leaderboard Page

import { DateTime } from "luxon"
import { data, isRouteErrorResponse, Link } from "react-router"
import { z } from "zod"
import { PageHeader } from "~/common/components/PageHeader"
import type { Route } from "./+types/monthly-leaderboard-page"
import { Button } from "~/common/components/ui/button"
import { ProductCard } from "../components/product-card"
import ProductPagination from "~/common/components/product-pagination"

export const meta: Route.MetaFunction = ({ params }) => {
    const { year, month } = params
    return [{ title: `The best products of ${year}-${month}` }]
}

const paramsSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
})

export const loader = ({ params }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramsSchema.safeParse(params)
    if (!success) {
        throw data(
            {
                error_code: "invalid_params",
                message: "Invalid params",
            },
            { status: 400 }
        )
    }

    const date = DateTime.fromObject({
        year: parsedData.year,
        month: parsedData.month,
    }).setZone("America/Los_Angeles")
    if (!date.isValid) {
        throw data(
            {
                error_code: "invalid_date",
                message: "Invalid date",
            },
            { status: 400 }
        )
    }

    const today = DateTime.now().setZone("America/Los_Angeles").startOf("month")
    if (date > today) {
        throw data(
            {
                error_code: "future_date",
                message: "Future date",
            },
            { status: 400 }
        )
    }

    return {
        ...parsedData,
    }
}

export default function MonthlyLeaderboardPage({
    loaderData,
}: Route.ComponentProps) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year,
        month: loaderData.month,
    })
    const previousMonth = urlDate.minus({ months: 1 })
    const nextMonth = urlDate.plus({ months: 1 })
    const isToday = urlDate.equals(DateTime.now().startOf("month"))
    return (
        <div className="space-y-10">
            <PageHeader
                title={`The best of ${urlDate.toLocaleString({
                    month: "long",
                    year: "numeric",
                })}`}
            />
            <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" asChild>
                    <Link
                        to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
                    >
                        &larr;{" "}
                        {previousMonth.toLocaleString({
                            month: "long",
                            year: "numeric",
                        })}
                    </Link>
                </Button>
                {!isToday ? (
                    <Button variant="secondary" asChild>
                        <Link
                            to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
                        >
                            {nextMonth.toLocaleString({
                                month: "long",
                                year: "numeric",
                            })}{" "}
                            &rarr;
                        </Link>
                    </Button>
                ) : null}
            </div>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                {error.data.message} / {error.data.error_code}
            </div>
        )
    }
    if (error instanceof Error) {
        return <div>{error.message}</div>
    }
    return <div>Unknown error</div>
}
