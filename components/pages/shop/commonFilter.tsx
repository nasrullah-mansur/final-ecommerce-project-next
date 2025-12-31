/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"


export default function CommonFilter({ data, param_text }: { data: string[], param_text: string }) {

    const [value, setValue] = useState<string[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (text: string, e: any) => {
        const params = new URLSearchParams(searchParams.toString());



        if (e.target.checked) {
            const isExist = value.find(v => v == text);

            if (!isExist) {
                const updateValues = [
                    ...value,
                    text
                ]

                setValue(updateValues)

                params.set(param_text, updateValues.toString());
                router.push(`?${params.toString()}`);

                return;
            }
        }

        const updateValues = value.filter(v => v != text)
        setValue(updateValues)

        params.set(param_text, updateValues.toString());
        router.push(`?${params.toString()}`);
    }



    return (
        <ul className="mt-4">

            {data.map((text, index) => (
                <li key={index}>
                    <label className="inline-flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" >
                        <input onChange={(e) => handleChange(e.target.value, e)} type="checkbox" value={text} />
                        <span className="capitalize">{text}</span>
                    </label>
                </li>
            ))}




        </ul>
    )
}
