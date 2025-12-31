'use client';

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";


export default function FilterByPrice() {
    const [values, setValues] = useState([0, 1000]);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter_by_price", values.toString());
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="w-full mt-10">
            <DualRangeSlider
                label={(value) => value}
                value={values}
                onValueChange={setValues}
                min={0}
                max={100}
                step={1}
            />

            <div className="flex justify-between mt-6">
                <Button onClick={handleClick} size={"sm"}>Filter</Button>
                <p>{values[0]} - {values[1]}</p>
            </div>
        </div>
    );
}
