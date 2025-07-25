import { PageHeader } from "~/common/components/PageHeader"
import type { Route } from "./+types/leaderboard-page"
import { Link } from "react-router"
import { ProductCard } from "../components/product-card"
import { Button } from "~/common/components/ui/button"

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboard | wemake" },
        {
            name: "description",
            content: "Leaderboard of the best products made by our community",
        },
    ]
}

export default function LeaderboardPage() {
    return (
        <div className="space-y-20">
            <PageHeader
                title="Leaderboards"
                subtitle="The most popular products on wemake"
            />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Daily Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on wemake by day.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
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
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/daily">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Weekly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on wemake by week.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
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
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/weekly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Monthly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on wemake by month.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
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
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/monthly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Yearly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on wemake by year.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
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
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/yearly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
        </div>
    )
}
