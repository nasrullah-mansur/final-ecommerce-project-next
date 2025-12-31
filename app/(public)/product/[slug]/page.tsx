
import SingleProductDetails from "@/components/pages/product/singleProduct";
import PageBraeadcrumb from "@/components/share/pageBraeadcrumb";
import ProductCart from "@/components/share/productCart";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ImageEffect from "@/components/ui/imageEffect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IBraeadcrumb } from "@/type/type";


const pages: IBraeadcrumb[] = [
    {
        label: "Shop",
        href: "/shop"
    },
    {
        label: "Single Product"
    }
];


const product = {
    id: 1,
    title: "Mini Electric Silicone Face Brush Massager Cepillo Facial Beautiful Silicone Facial Cleansing Brush",
    slug: "Mini Electric Silicone Face Brush Massager Cepillo Facial Beautiful Silicone Facial Cleansing Brush",
    ratting: 4,
    prev_price: 1893,
    current_price: 1362,
    short_description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    long_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quae illo soluta sapiente minus voluptatibus molestias voluptates maiores repudiandae, velit quaerat error! Dolor alias voluptates rerum vitae illum officiis laboriosam, eos fugiat necessitatibus iste quasi vero porro at asperiores atque numquam adipisci esse perferendis hic dolore dolores facere quidem? Voluptatum, nemo voluptates. Qui, animi odit voluptatem velit nostrum rem maiores. Qui esse magnam enim natus numquam ab adipisci nihil mollitia odio ducimus architecto unde harum saepe illum, ipsa hic dicta alias cumque et minus veritatis assumenda a quo.",
    categories: [
        {
            id: 1,
            title: "Beauty & Personal Care",
            slug: "Beauty & Personal Care"
        },
        {
            id: 2,
            title: "Personal Care",
            slug: "Personal Care"
        }
    ],
    galleries: [
        "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/1634134755JdFHdb695965a744470b958f17251d4d277ew.jpg",
        "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/1634134938VjgHcb62dec2d6a241fc90ce2bb04059684em.jpg"
    ],
    specifications: {
        "Product Type": "Velvet elegant sleeveless evening dress",
        "Material": "Polyester / Spandex",
        "Lining Material": "Polyester",
        "Fabric Type": "Fleece"
    }
}


export default function SingleProduct() {


    const { long_description, galleries, specifications, ...othersProductData } = product;


    return (

        <>
            <PageBraeadcrumb pages={pages} />
            <div className="my-container grid lg:grid-cols-2 gap-4 py-10">
                <div>
                    <ImageEffect images={galleries} />
                </div>
                <div>
                    <SingleProductDetails product={othersProductData} />
                </div>
            </div>

            <div className="my-container">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="m-auto">
                        <TabsTrigger
                            value="account"
                            className="px-6 py-6 cursor-pointer
                 data-[state=active]:bg-primary
                 data-[state=active]:text-primary-foreground"
                        >
                            Descriptions
                        </TabsTrigger>

                        <TabsTrigger
                            value="password"
                            className="px-6 py-6 cursor-pointer
                 data-[state=active]:bg-primary
                 data-[state=active]:text-primary-foreground"
                        >
                            Specifications
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                        <div className="bg-white p-4 rounded-xl mt-4 mb-6">
                            {long_description}
                        </div>
                    </TabsContent>

                    <TabsContent value="password">
                        <div className="bg-white p-4 rounded-xl mt-4 mb-6">
                            <div className="grid grid-cols-1">
                                <div className="grid grid-cols-2 border-t border-b border-l border-r py-2 bg-gray-100 px-2">
                                    <span className="font-medium block ">Specifications</span>
                                    <span>Descriptions</span>
                                </div>
                                {Object.entries(specifications).map(([key, value]) => (
                                    <div key={key} className="grid grid-cols-2 border-l border-r border-b py-2 px-2">
                                        <span className="font-medium block">{key} :</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>

            <div>
                <div className="my-container">
                    <div className="flex items-center border-b-2 border-gray-200">
                        <h2 className="text-2xl font-semibold py-2">
                            <span className="border-b-2 border-primary -block mb-0.5 py-2">Related Product</span>
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
                                    <ProductCart />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 -left-4" />
                        <CarouselNext className="absolute top-1/2 -right-4" />
                    </Carousel>
                </div>
            </div>
        </>

    )
}
