import { PageHeader } from "~/common/components/PageHeader"
import type { Route } from "./+types/submit-page"
import { Form } from "react-router"
import InputPair from "~/common/components/input-pair"
import SelectPair from "~/common/components/select-pair"
import { Button } from "~/common/components/ui/button"

export const meta: Route.MetaFunction = () => {
    return [{ title: "Submit a product" }]
}

export default function SubmitPage() {
    return (
        <div className="space-y-10">
            <PageHeader
                title="Submit a product"
                subtitle="Submit a product to our community"
            />
            <Form className="space-y-5 w-full max-w-screen-md mx-auto flex flex-col gap-5 items-center">
                <div className="space-y-5 flex flex-col gap-5 w-full max-w-screen-md mx-auto        ">
                    <InputPair
                        label="Product name"
                        description="The name of the product"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter the name of the product"
                    />
                    <InputPair
                        label="Product description"
                        description="The description of the product"
                        id="description"
                        name="description"
                        required
                        placeholder="Enter the description of the product"
                    />
                    <InputPair
                        label="Product URL"
                        description="The URL of the product"
                        id="url"
                        name="url"
                        required
                        placeholder="Enter the URL of the product"
                    />
                    <InputPair
                        label="Product description"
                        description="The description of the product"
                        textArea
                        id="description"
                        name="description"
                        required
                        placeholder="Enter the description of the product"
                    />
                    <SelectPair
                        label="Product category"
                        description="The category of the product"
                        name="category"
                        required
                        placeholder="Select the category of the product"
                        options={[
                            {
                                label: "Developer Tools",
                                value: "developer-tools",
                            },
                            { label: "Design Tools", value: "design-tools" },
                            {
                                label: "Productivity Tools",
                                value: "productivity-tools",
                            },
                            {
                                label: "Marketing Tools",
                                value: "marketing-tools",
                            },
                            { label: "Other", value: "other" },
                        ]}
                    />
                </div>
                <div className="flex gap-2">
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}
