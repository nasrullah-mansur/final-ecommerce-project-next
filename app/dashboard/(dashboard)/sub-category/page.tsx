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
import Link from "next/link";

export default async function Category() {

    const res = await fetch(apiUrl("/sub-category"));
    const json = await res.json();

    return (
        <div>

            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Category list</h2>

                <Button asChild>
                    <Link href="/dashboard/sub-category/create">Create</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">#SL</TableHead>

                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {json.data.map((item: { _id: string; title: string; status: string; category: { title: string } }) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium">1</TableCell>

                            <TableCell>
                                {item.title}
                            </TableCell>
                            <TableCell>
                                {item.category.title}
                            </TableCell>
                            <TableCell>
                                {item.status}
                            </TableCell>
                            <TableCell className="text-right">
                                <TableAction id={item._id} endpoint="/sub-category" />
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
