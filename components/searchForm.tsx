/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import StarGroup from "@/components/starGroup";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProductSearchForm() {
    const [text, setText] = useState("");
    const [searchData, setSearchData] = useState([]);


    useEffect(() => {

        const getData = async () => {

            const res = await fetch(`https://dummyjson.com/products/search?q=${text}`)
            const data = await res.json();
            setSearchData(data.products);

        }

        const timer = setTimeout(() => {
            getData();
        }, 3000);

        return () => clearTimeout(timer);

    }, [text])

    return (
        <div className="px-6 flex-1">
            <div className="relative">
                <input value={text} onChange={(e) => setText(e.target.value)} className="border w-full p-2" type="text" />
                <button className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:text-primary">
                    <Search className="opacity-50" />
                </button>

                {text &&
                    <div className="absolute z-2 bg-white top-full left-0 w-full border flex flex-col justify-between">



                        <div className="p-3 h-78 overflow-y-scroll">
                            {searchData.length == 0 && <div className="text-center py-5">No data found</div>}
                            {searchData.map((item: any) => (
                                <div className="flex mb-3 pb-3 border-b" key={item.id}>
                                    <div className="w-24">
                                        <Image
                                            src={item.images[0]}
                                            alt="this is image"
                                            width={100}
                                            height={100}
                                            className="h-full w-auto"
                                        />
                                    </div>
                                    <div className="pl-4">
                                        <Link className="hover:text-primary" href={"/"}>{item.title}</Link>
                                        <StarGroup count={item.rating} />
                                        <p className="text-xl font-semibold text-primary">${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="py-1.5 border-t flex justify-center items-center">
                            <Link href={"/"} className="hover:text-primary">View all products</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductSearchForm;