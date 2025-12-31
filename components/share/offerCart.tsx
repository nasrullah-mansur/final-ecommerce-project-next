import Image from 'next/image'

export default function OfferCart() {
    return (
        <div className="flex overflow-hidden group justify-between p-4 border border-transparent hover:border-primary rounded-xl bg-white">
            <div className="flex justify-center flex-col h-full pl-3">
                <span className="text-lg text-primary">50% off</span>
                <p className="text-2xl">Watch</p>
            </div>
            <Image
                src={"/watch.jpg"}
                alt="offer"
                width={180}
                height={180}
                className="group-hover:scale-110 origin-left duration-400"
            />

        </div>
    )
}
