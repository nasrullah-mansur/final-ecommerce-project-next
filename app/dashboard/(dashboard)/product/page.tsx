import { ProductTable } from "@/components/dashboard/product/productTable";
import { Button } from "@/components/ui/button";
import apiUrl from "@/lib/apiUrl";
import Link from "next/link";

export default async function ProductList() {

    const res = await fetch(apiUrl('/product'), {
        cache: "no-cache"
    })

    const json = await res.json();

    return (
        <div>
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Product list</h2>

                <Button asChild>
                    <Link href="/dashboard/product/create">Create</Link>
                </Button>
            </div>

            {json.data &&
                <ProductTable data={json.data} />
            }

        </div>
    )
}
