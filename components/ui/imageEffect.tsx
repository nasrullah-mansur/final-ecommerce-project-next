"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

const ZOOM_LEVEL = 2;


const ImageEffect = ({ images }: { images: string[] }) => {

    const modifyImages = images.map((img, index) => {
        return {
            id: index + 1,
            img,
        }
    })

    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [zoom, setZoom] = useState(false);
    const [activeId, setActiveId] = useState(1);
    const [sampleImg, setSampleImg] = useState(modifyImages[0].img)

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPos({ x, y });
    };

    const handleClick = (id: number) => {
        setActiveId(id);

        const img = modifyImages.find(image => image.id == id);

        if (!img) return;

        setSampleImg(img?.img);
    }

    return (

        <div className="bg-white rounded-xl overflow-hidden">
            <div
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMove}
                className="w-full h-120 overflow-hidden relative border rounded-lg"
            >
                <Image
                    src={sampleImg}
                    alt=""
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 ease-out"
                    style={{
                        transformOrigin: `${pos.x}% ${pos.y}%`,
                        transform: zoom ? `scale(${ZOOM_LEVEL})` : "scale(1)",
                    }}
                />


            </div>
            <div className="flex justify-center py-4 gap-x-2">
                {modifyImages.map((img) => (
                    <Image
                        onClick={() => handleClick(img.id)}
                        key={img.id}
                        src={img.img}
                        alt="image"
                        width={200}
                        height={200}
                        className={`w-20 cursor-pointer border h-20 object-cover rounded-md ${activeId == img.id && "border-primary"}`}
                    />
                ))}
            </div>

        </div>


    );
};

export default ImageEffect;
