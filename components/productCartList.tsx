import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function ProductCartList() {
    return (
        <div className="absolute mt-4 z-9 w-66 top-full right-0 border p-2 bg-white">

            <div className="flex relative pb-3 mb-3 border-b">
                <Image
                    src={"https://placehold.co/600x400.png"}
                    alt="product imag"
                    width={200}
                    height={200}
                    className="w-16"
                />
                <div className="pl-2 pr-2">
                    <Link href={"/"} className="hover:text-primary">
                        this is product link
                    </Link>
                    <small className="block">1 X $300.00</small>
                    <X className="w-4 absolute top-0 right-0 cursor-pointer text-primary" />
                </div>
            </div>

            <div className="flex relative pb-3 mb-3 border-b">
                <Image
                    src={"https://placehold.co/600x400.png"}
                    alt="product imag"
                    width={200}
                    height={200}
                    className="w-16"
                />
                <div className="pl-2 pr-2">
                    <Link href={"/"} className="hover:text-primary">
                        this is product link
                    </Link>
                    <small className="block">1 X $300.00</small>
                    <X className="w-4 absolute top-0 right-0 cursor-pointer text-primary" />
                </div>
            </div>

            <div>
                <h4 className="text-xl font-semibold text-center">Subtotal: $100.00</h4>

                <div className="p-2 flex justify-between ">
                    <Button asChild><Link href={"/"}>Cart</Link></Button>
                    <Button asChild><Link href={"/"}>Checkout</Link></Button>
                </div>
            </div>
        </div>
    )
}
