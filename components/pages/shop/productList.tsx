'use client';


import ProductCart from "@/components/share/productCart";
import ProductCartList from "@/components/share/productCartList";
import { cn } from "@/lib/utils";
import { useProductPreviewStore } from "@/store/productPreview";
import React from "react";

export default function ProductList() {

    const { preview } = useProductPreviewStore();

    return (
        <div className={cn("grid gap-4", preview === "grid" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length: 6 }).map((_item, index) => (
                <React.Fragment key={index}>
                    {preview === "grid" ? <ProductCart /> : <ProductCartList />}
                </React.Fragment>
            ))}
        </div>
    )
}
