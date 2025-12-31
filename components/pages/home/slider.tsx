import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'


export default function Slider() {
    return (
        <div className="my-container">
            <Carousel className="w-full mt-8 rounded-lg overflow-hidden">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <Image
                                src={"https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/16343905891630493728s2.jpg"}
                                alt='image'
                                width={1200}
                                height={400}

                                className="w-full h-100 object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2" />
                <CarouselNext className="absolute right-4 top-1/2" />
            </Carousel>
        </div>
    )
}
