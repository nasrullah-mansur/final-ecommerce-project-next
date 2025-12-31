import ProductCart from "@/components/productCart";
import MainMenuMobile from "@/components/public/mainMenuMobile";
import ProductSearchForm from "@/components/searchForm";
import { GitCompareArrows, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PublicMainMenu() {
    return (
        <div className="py-4 relative">
            <div className="my-container">
                <div className="flex items-center">
                    <Link href={"/"}>
                        <Image
                            src={"/logo.svg"}
                            alt="My logo"
                            width={160}
                            height={60}
                            className="w-40 h-auto"
                        />
                    </Link>
                    <div className="flex-1 hidden lg:flex">
                        <ProductSearchForm />
                        <div>
                            <div className="flex gap-x-12">
                                <Link href={"/"} className="flex flex-col relative justify-center items-center">
                                    <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-xs flex justify-center items-center rounded-full bg-primary text-white">9</span>
                                    <GitCompareArrows size={22} />
                                    <span className="text-xs">Compare</span>
                                </Link>

                                <Link href={"/"} className="flex flex-col relative justify-center items-center">
                                    <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-xs flex justify-center items-center rounded-full bg-primary text-white">9</span>
                                    <Heart size={22} />
                                    <span className="text-xs">Wishlist</span>
                                </Link>
                                <ProductCart />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 lg:hidden">
                        <MainMenuMobile />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PublicMainMenu;