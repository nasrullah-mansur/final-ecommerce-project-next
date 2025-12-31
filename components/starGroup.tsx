import { Star } from "lucide-react";

function StarGroup({ count, className }: { count: number, className?: string }) {


    return (
        <div className={`flex gap-x-1 py-1 ${className}`}>
            {[1, 2, 3, 4, 5].map((data) => (
                <div key={data}>
                    {data > Math.floor(count) ? <Star size={16} /> : <Star className="text-primary" size={16} />}
                </div>
            ))}

        </div>
    );
}

export default StarGroup;