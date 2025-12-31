"use client";

import MobileNavigation from "@/components/public/mobileNavigation";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuData = [1, 2, 3, 4, 5]

export default function Navbar() {
    const [active, setActive] = useState(false);

    return (
        <>
            <div className="bg-white border-t hidden lg:block">
                <div className="my-container">
                    <div className="flex">
                        <div className="relative">
                            <h4 onClick={() => setActive(!active)} className="p-3 h-12 w-[280px] bg-primary cursor-pointer flex items-center gap-x-1.5 text-white">
                                <Menu color="white" />
                                <span className="text-lg text-white">Categories</span>
                            </h4>

                            {active &&
                                <div className="absolute top-full left-0 w-full bg-white z-1 py-3">
                                    {menuData.map((item, index) => (
                                        <div key={item} className={`${(menuData.length - 1) == index ? "" : "border-b mb-2 pb-2"} px-3 flex items-center cursor-pointer group`}>
                                            <Image
                                                src={"https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/1629616296pexels-juan-mendez-1536619.jpg"}
                                                alt="category image"
                                                width={50}
                                                height={50}
                                                className="w-12 h-12 object-cover group-hover:rotate-y-180"
                                            />
                                            <span className="block pl-3 group-hover:text-primary">Women Clothing</span>
                                            <ChevronRight className="w-5 ml-auto" />

                                            <div className="absolute h-full w-full left-full top-0 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                                                <ul>
                                                    <li>
                                                        <Link className="w-full flex justify-between py-3 border-b" href={""}>
                                                            Sub category item
                                                            <ChevronRight />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="w-full flex justify-between py-3 border-b" href={""}>
                                                            Sub category item
                                                            <ChevronRight />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="w-full flex justify-between py-3 border-b" href={""}>
                                                            Sub category item
                                                            <ChevronRight />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="w-full flex justify-between py-3 border-b" href={""}>
                                                            Sub category item
                                                            <ChevronRight />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="w-full flex justify-between py-3 border-b" href={""}>
                                                            Sub category item
                                                            <ChevronRight />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }

                        </div>
                        <div>
                            <ul className="flex pl-5 ">
                                <li>
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>Shop</Link>
                                </li>
                                <li>
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>Campaign</Link>
                                </li>
                                <li>
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>Blog</Link>
                                </li>
                                <li className="relative group">
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>
                                        Page
                                        <ChevronDown className="w-4 mt-1.5" />
                                    </Link>

                                    <ul className="bg-white group-hover:opacity-100 opacity-0 invisible group-hover:visible p-3 shadow-xl absolute z-1 top-full left-0 w-40 border-t-3 border-t-primary">
                                        <li>
                                            <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                        </li>
                                        <li>
                                            <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                        </li>
                                        <li>
                                            <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                        </li>
                                        <li>
                                            <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                        </li>
                                        <li>
                                            <Link className="flex items-center gap-x-0.5 hover:text-primary" href={"/"}><ChevronRight width={20} />About us</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className="flex h-12 pr-3 items-center hover:text-primary" href={"/"}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <MobileNavigation />
        </>
    )
}
