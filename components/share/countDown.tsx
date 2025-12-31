/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";

export default function CountDown({ variation, targetDate }: { targetDate: any; variation: "rounded" | "circle" }) {
    const [count, setCount] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    })

    useEffect(() => {

        const timer = setTimeout(() => {
            const now: any = new Date();
            let diff: number = targetDate - now;  // milliseconds

            if (diff < 0) return;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);

            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);

            const minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);

            const seconds = Math.floor(diff / 1000);

            setCount({
                days: pad2(days),
                hours: pad2(hours),
                minutes: pad2(minutes),
                seconds: pad2(seconds)
            })
        }, 1000);

        function pad2(n: number) {
            return String(n).padStart(2, "0");
        }

        return () => clearTimeout(timer);


    }, [count, targetDate])

    return (
        <>
            {variation === "rounded" ?
                <div className="bg-primary text-sm px-3 py-0.5 rounded-2xl flex justify-center items-center gap-x-1.5 text-white">
                    <span>{count.days} <span className="text-xs">Days</span></span>
                    <span>{count.hours} <span className="text-xs">Hrs</span></span>
                    <span>{count.minutes} <span className="text-xs">Min</span></span>
                    <span>{count.seconds} <span className="text-xs">Sec</span></span>
                </div>

                :

                <div className="flex gap-x-2">

                    {Object.keys(count).map((item, index) => (
                        <div key={index} className="bg-primary flex justify-center items-center flex-col w-10 rounded-[3px] overflow-hidden">
                            <p className="text-sm w-full text-center text-white">{count[item as keyof typeof count]}</p>
                            <span className="block w-full text-center text-xs py-0.5 bg-white capitalize">{item}</span>
                        </div>
                    ))}


                </div>

            }
        </>
    )
}
