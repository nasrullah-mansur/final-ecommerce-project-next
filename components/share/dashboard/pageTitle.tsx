import { ReactNode } from "react";

export default function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <div className="bg-[#FAFAFA]  border p-4 rounded-md mb-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">{title}</h1>

            {children}
        </div>
    )
}
