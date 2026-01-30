import { getSlider } from '@/actions/slider/sliderAction';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';


export default async function Slider() {

    const { data } = await getSlider();

    return (
        <div className="my-container">
            {!data && <div>Something wrong ...</div>}

            {data &&
                <Carousel className="w-full mt-8 rounded-lg overflow-hidden">
                    <CarouselContent>
                        {data.map((slider: { _id: string; image: string }) => (
                            <CarouselItem key={slider._id}>
                                <Image
                                    src={slider.image}
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
            }
        </div>
    )
}
