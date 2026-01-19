import TableAction from "@/components/share/dashboard/tableAction";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import apiUrl from "@/lib/apiUrl";
import Image from "next/image";
import Link from "next/link";

export default async function Category() {

    const res = await fetch(apiUrl("/category"));
    const json = await res.json();


    return (
        <div>

            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Category list</h2>

                <Button asChild>
                    <Link href="/dashboard/category/create">Create</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">#SL</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {json.data.map((item: { _id: string; title: string; image: string; status: string }) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>
                                <Image
                                    width={80}
                                    height={80}
                                    src={item.image}
                                    alt="image"
                                />
                            </TableCell>
                            <TableCell>
                                {item.title}
                            </TableCell>
                            <TableCell>
                                {item.status}
                            </TableCell>
                            <TableCell className="text-right">
                                <TableAction id={item._id} endpoint="category" />
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
