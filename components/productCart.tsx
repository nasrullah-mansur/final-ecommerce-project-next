"use client";

import ProductCartList from "@/components/productCartList";
import ActiveOverlay from "@/components/ui/activeOverlay";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function ProductCart() {
    const [active, setActive] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center relative">
            <Link href={"/"} onClick={() => setActive(true)}>
                <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 text-xs flex justify-center items-center rounded-full bg-primary text-white">9</span>

                <ShoppingCart size={22} />
                <span className="text-xs hidden lg:block">Cart</span>
            </Link>
            {active && <ProductCartList />}

            <ActiveOverlay onClick={() => setActive(false)} isActive={active} />

        </div>
    );
}

export default ProductCart;