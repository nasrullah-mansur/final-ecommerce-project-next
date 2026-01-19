"use client";

import { Button } from '@/components/ui/button';
import apiUrl from '@/lib/apiUrl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TableAction({ id, endpoint }: { id: string; endpoint: string }) {

    const router = useRouter();

    const handleDelete = async () => {
        const isConfirm = confirm("Are you sure you want to remove it?");

        if (isConfirm) {
            const res = await fetch(apiUrl(endpoint), {
                method: "DELETE",
                body: JSON.stringify({ id })
            });

            const json = await res.json();

            if (json.ok) {
                router.push(`dashboard/${endpoint}`);
            }
        }
    }

    return (
        <div className="flex justify-end gap-4">
            <Button asChild>
                <Link href={`/dashboard/${endpoint}/edit/${id}`}>Edit</Link>
            </Button>
            <Button onClick={() => handleDelete()} className="cursor-pointer" variant={"destructive"}>Delete</Button>
        </div>
    )
}
