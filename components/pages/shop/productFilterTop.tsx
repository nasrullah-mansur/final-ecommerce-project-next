"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProductPreviewStore } from "@/store/productPreview";
import { ChevronDown, Funnel, Grid2x2, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilterTop() {

    const { preview, setPreview } = useProductPreviewStore();

    const router = useRouter();
    const searchParams = useSearchParams();

    const viewHandler = (text: "grid" | "list") => {
        // task for zustand;
        setPreview(text);
    }

    const handleFilter = (text: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (text == 'All products') {
            params.delete('filter');
        } else {
            params.set("filter", text);
        }
        router.push(`?${params.toString()}`);
    }

    const handlePriceSort = (text: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (text == "default") {
            params.delete("price_sort");
        }
        else {
            params.set("price_sort", text);
        }
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="my-container pt-12 pb-6">
            <div className="bg-white p-4 flex">
                <DropdownMenu>
                    <DropdownMenuTrigger className="border py-2 px-4 flex items-center gap-x-1 text-black/70"><Funnel size={16} /> Quick filter</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleFilter('All products')}>All products</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilter('Featured products')}>Featured products</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilter('Best sellers')}>Best sellers</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilter('Top rated')}>Top rated</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilter('New Arrival')}>New Arrival</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center">
                    <span className="pl-5 pr-2">Sort by: </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border py-2 px-4 flex justify-between items-center gap-x-1 text-black/70">
                            All Products
                            <ChevronDown className="mt-1" size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handlePriceSort('default')}>Default</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePriceSort('Low - High price')}>Low - High price</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePriceSort('High - Low price')}>High - Low price</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="ml-auto">
                    <ButtonGroup>
                        <Button onClick={() => viewHandler("grid")} variant={preview == "grid" ? "default" : "outline"} className="cursor-pointer">
                            <Grid2x2 />
                        </Button>
                        <Button onClick={() => viewHandler("list")} variant={preview == "list" ? "default" : "outline"} className="cursor-pointer"><List /></Button>
                    </ButtonGroup>
                </div>







            </div>
        </div>
    )
}
