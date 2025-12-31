import StarGroup from "@/components/starGroup";
import { GitCompareArrows, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function ProductCart() {
    return (
        <div className="bg-white rounded-lg group overflow-hidden border border-transparent hover:border-primary duration-300">
            <div className="relative overflow-hidden">
                <Image
                    src={'https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/1634134755JdFHdb695965a744470b958f17251d4d277ew.jpg'}
                    alt="this is product image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-120 duration-300"
                />

                <div className="flex absolute left-0 bottom-3 w-full justify-center gap-x-2 duration-300 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link className="w-8 h-8 rounded-full flex justify-center items-center bg-primary text-white" href={"/"}>
                        <Heart size={16} />
                    </Link>

                    <Link className="w-8 h-8 rounded-full flex justify-center items-center bg-primary text-white" href={"/"}>
                        <GitCompareArrows size={16} />
                    </Link>

                    <Link className="w-8 h-8 rounded-full flex justify-center items-center bg-primary text-white" href={"/"}>
                        <ShoppingCart size={16} />
                    </Link>
                </div>

            </div>

            <div className="p-3">
                <Link className="text-sm opacity-60 hover:text-primary" href={"/"}>
                    Children dress
                </Link>
                <Link className="block hover:text-primary" href={'/'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Link>
                <div className="py-1">
                    <StarGroup className="opacity-60" count={3} />
                </div>

                <div className="flex gap-x-2">
                    <del className="opacity-50">$12000</del>
                    <span className="text-primary">$50</span>
                </div>
            </div>

        </div>
    )
}
