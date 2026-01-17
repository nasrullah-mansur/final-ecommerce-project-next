import { ServiceTable } from "@/components/dashboard/service/serviceTable";
import { Button } from "@/components/ui/button";
import apiUrl from "@/lib/apiUrl";
import Link from "next/link";

export default async function Service() {

    const res = await fetch(apiUrl("/service"));
    const json = await res.json();

    return (
        <div>
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Service list</h2>

                <Button asChild>
                    <Link href="/dashboard/service/create">Create</Link>
                </Button>
            </div>
            <ServiceTable data={json.data} />
        </div>
    )
}
