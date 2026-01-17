import { BrandTable } from "@/components/dashboard/brand/brandTable";
import { Button } from "@/components/ui/button";
import apiUrl from "@/lib/apiUrl";
import Link from "next/link";

export default async function Brand() {

    const res = await fetch(apiUrl("/brand"));
    const json = await res.json();

    return (
        <div>
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Brand list</h2>

                <Button asChild>
                    <Link href="/dashboard/brand/create">Create</Link>
                </Button>
            </div>
            <BrandTable data={json.data} />
        </div>
    )
}
