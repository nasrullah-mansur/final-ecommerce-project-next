/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SocialShare from "@/components/pages/product/socialShare";
import StarGroup from "@/components/starGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractNumber } from "@/utils/extractNumber";
import { formatPrice } from "@/utils/formatCurrency";
import { Heart, Minus, Plus, Scale } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";



export default function SingleProductDetails({ product }: { product: any }) {

    const [count, setCount] = useState(1);


    const handlePlus = () => {
        if (count == 50) return;

        setCount(prev => prev + 1);
    }

    const handleMinus = () => {
        if (count == 1) return;

        setCount(prev => prev - 1);
    }

    const handleInput = (n: string) => {
        const num = extractNumber(n)

        if (num <= 0) {
            setCount(1);
        }

        else if (num > 50) {
            setCount(50);
        }

        else {
            setCount(num);
        }

    }

    return (
        <div className="rounded-lg p-5 bg-white">
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            <StarGroup className="py-4" count={product.ratting} />

            <div className="flex items-center gap-x-2.5">
                <del className="text-2xl text-black/40">৳ {formatPrice(product.prev_price)}</del>
                <span className="text-2xl text-primary font-medium">৳ {formatPrice(product.current_price * count)}</span>
            </div>

            <p className="py-4 text-black/60">{product.short_description}</p>

            <div className="flex gap-x-5 items-center py-4">
                <div className="flex gap-x-1">
                    <Button onClick={handleMinus} className="cursor-pointer"><Minus /></Button>
                    <Input value={count} onChange={(e) => handleInput(e.target.value)} className="w-14 text-center font-semibold" />
                    <Button onClick={handlePlus} className="cursor-pointer"><Plus /></Button>
                </div>
                <div className="flex gap-x-2">
                    <Button className="rounded-sm cursor-pointer btn-animate">Add to cart</Button>
                    <Button className="rounded-sm cursor-pointer btn-animate">Buy now</Button>
                </div>

            </div>
            <div className="flex items-center py-4">
                <span className="pr-2">Categories: </span>
                <div className="flex">
                    {product.categories.map((category: any, index: number) => (
                        <React.Fragment key={category.id}>
                            <Link className="text-primary" href={"/"}>{category.title}</Link>
                            {product.categories.length - 1 != index && <span className="px-2">/</span>}
                        </React.Fragment>
                    ))}


                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-x-2">
                    <Button className="rounded-sm cursor-pointer btn-animate"><Heart /> Wishlist</Button>
                    <Button className="rounded-sm cursor-pointer btn-animate"><Scale /> Compare</Button>
                </div>

                <SocialShare />
            </div>
        </div>
    )
}
