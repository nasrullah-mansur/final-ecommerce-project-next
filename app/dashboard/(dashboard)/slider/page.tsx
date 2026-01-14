import { SliderTable } from "@/components/dashboard/slider/sliderTable";
import { Button } from "@/components/ui/button";
import apiUrl from "@/lib/apiUrl";
import Link from "next/link";

export default async function Slider() {

    const res = await fetch(apiUrl("/slider"));
    const json = await res.json();

    console.log(json);


    return (
        <div>
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Slider list</h2>

                <Button asChild>
                    <Link href="/dashboard/slider/create">Create</Link>
                </Button>
            </div>
            <SliderTable data={json.data} />
        </div>
    )
}
