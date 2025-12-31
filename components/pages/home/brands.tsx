import ProductCart from "@/components/share/productCart";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function Brands() {
    return (
        <>
            <div className="my-container">
                <div className="flex items-end border-b-2 border-gray-200">
                    <h2 className="text-2xl font-semibold py-2">
                        <span className="border-b-2 border-primary -mb-0.5 py-2">Popular Brands</span>
                    </h2>
                </div>
            </div>

            <div className="my-container py-8">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                <div className="p-8 bg-white flex justify-center items-center rounded-lg hover:border-primary border-transparent border duration-300">
                                    <Image
                                        src={"https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/1632336551yamaha.png"}
                                        alt="brand"
                                        width={300}
                                        height={200}
                                        className="w-[120px]"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 -left-4" />
                    <CarouselNext className="absolute top-1/2 -right-4" />
                </Carousel>
            </div>
        </>
    )
}
