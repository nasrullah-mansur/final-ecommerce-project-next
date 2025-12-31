'use client';

import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterByCategory() {
    const router = useRouter();
    const searchParams = useSearchParams();


    const handleClick = (text: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter_category", text);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="mt-4">

            <span onClick={() => handleClick("Women Clothing")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Women Clothing</span>
            <span onClick={() => handleClick("Men Clothing")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Men Clothing</span>
            <span onClick={() => handleClick("Electronics")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Electronics</span>
            <span onClick={() => handleClick("Vehicles & Accessories")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Vehicles & Accessories</span>
            <span onClick={() => handleClick("Beauty & Personal Care")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Beauty & Personal Care</span>
            <span onClick={() => handleClick("Sports & Entertainment")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Sports & Entertainment</span>
            <span onClick={() => handleClick("Home & Garden")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Home & Garden</span>
            <span onClick={() => handleClick("Medicine & Health Care")} className="flex cursor-pointer items-center gap-x-1 hover:text-primary py-1 text-black/70" ><ChevronRight size={16} className="mt-1" /> Medicine & Health Care</span>

        </div>
    )
}
