import type { Route } from "./+types/weekly-leaderboard-page"
import { DateTime } from "luxon"
import { data, Link } from "react-router"
import z from "zod"
import { PageHeader } from "~/common/components/PageHeader"
import { Button } from "~/common/components/ui/button"
import { ProductCard } from "../components/product-card"
import ProductPagination from "~/common/components/product-pagination"

const paramsSchema = z.object({
    year: z.coerce.number(),
    week: z.coerce.number(),
})

export function loader({ params }: Route.LoaderArgs) {
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
        weekYear: parsedData.year,
        weekNumber: parsedData.week,
    }).setZone("America/Los_Angeles")
    if (!date.isValid) {
        throw data(
            {
                error_code: "invalid_date",
                message: "Invalid date",
            },
            {
                status: 400,
            }
        )
    }
    const today = DateTime.now().setZone("America/Los_Angeles").startOf("week")
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
export default function WeeklyLeaderboardPage({
    loaderData,
}: Route.ComponentProps) {
    const urlDate = DateTime.fromObject({
        weekYear: loaderData.year,
        weekNumber: loaderData.week,
    })
    const previousWeek = urlDate.minus({ weeks: 1 })
    const nextWeek = urlDate.plus({ weeks: 1 })
    const isToday = urlDate.equals(DateTime.now().startOf("week"))
    return (
        <div className="space-y-10">
            <PageHeader
                title={`Best of week ${urlDate
                    .startOf("week")
                    .toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
                    .endOf("week")
                    .toLocaleString(DateTime.DATE_SHORT)}`}
            />
            <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" asChild>
                    <Link
                        to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}
                    >
                        &larr;{" "}
                        {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
                    </Link>
                </Button>
                {!isToday ? (
                    <Button variant="secondary" asChild>
                        <Link
                            to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}
                        >
                            {nextWeek.toLocaleString(DateTime.DATE_SHORT)}{" "}
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
