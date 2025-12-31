import ProductCart from '@/components/share/productCart'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'


export default function PopularItemSlider() {
    return (
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
                            <ProductCart />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 -left-4" />
                <CarouselNext className="absolute top-1/2 -right-4" />
            </Carousel>
        </div>
    )
}
