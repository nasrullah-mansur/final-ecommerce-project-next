import Image from "next/image"

const serviceData = [
    {
        id: "1",
        title: "Free Worldwide Shipping",
        description: "Free shipping for all orders over $100 Contrary to popular belie",
        image: "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/162196463701.png"
    },
    {
        id: "2",
        title: "Money Back Guarantee",
        description: "We return money within 30 days",
        image: "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/162196467602.png"
    },
    {
        id: "3",
        title: "24/7 Customer Support",
        description: "Friendly 24/7 customer support",
        image: "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/162196471103.png"
    },
    {
        id: "4",
        title: "Secure Online Payment",
        description: "We posess SSL / Secure Certificate",
        image: "https://geniusdevs.com/codecanyon/omnimart/core/public/storage/images/162196474904.png"
    }
]


export default function Service() {
    return (
        <div className="my-container py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {serviceData.map((service) => (
                    <div key={service.id} className="flex items-center bg-white py-3 rounded shadow hover:shadow-lg duration-300 box-border">
                        <div className="w-20 flex justify-center items-center">
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h4 className="mb-1">{service.title}</h4>
                            <p className="text-xs opacity-70">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
