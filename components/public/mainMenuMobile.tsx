"use client";

import ProductCart from '@/components/productCart'
import ProductSearchForm from '@/components/searchForm';
import { useNavigationStore } from '@/store/navigation.store';
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react';


export default function MainMenuMobile() {
    const [active, setActive] = useState(false);
    const { isActive, updateActive } = useNavigationStore();

    return (
        <div className="flex justify-end gap-x-3">
            <Search onClick={() => setActive(true)} className="hover:text-primary cursor-pointer" />
            <Menu onClick={() => updateActive(!isActive)} className="hover:text-primary cursor-pointer" />
            <ProductCart />

            {active &&
                <div className="absolute top-0 left-0 w-full h-full p-2 border bg-white flex justify-between">
                    <ProductSearchForm />
                    <div className="flex justify-center items-center -ml-2.5">
                        <X className="cursor-pointer hover:text-primary" onClick={() => setActive(false)} />
                    </div>
                </div>
            }
        </div>
    )
}
