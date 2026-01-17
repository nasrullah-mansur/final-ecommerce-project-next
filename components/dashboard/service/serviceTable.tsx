"use client"

import moment from "moment";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, SquarePen, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import apiUrl from "@/lib/apiUrl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export type Payment = {
    _id: string;
    title: string;
    image: string;
}





export function ServiceTable({ data }: { data: Payment[] }) {
    const router = useRouter()

    const handleDelete = async (id: string) => {


        if (!id) return;

        const confi = confirm("Are you sure you want to remove it?");

        if (confi) {
            const res = await fetch(apiUrl('/service'), {
                method: "DELETE",
                body: JSON.stringify({ id })
            })

            const json = await res.json();

            if (json.ok) {
                router.push("/dashboard/service");
            }
        }



    }

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "image",
            header: () => "Image",
            cell: ({ row }) => <div className="lowercase">
                <Image
                    src={row.getValue("image")}
                    alt="preview image"
                    width={100}
                    height={100}
                />
            </div>,
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title

                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">
                {row.getValue("title")}

            </div>,
        },

        {
            accessorKey: "createdAt",
            header: () => "Created At",
            cell: ({ row }) => {
                return <div>{moment(row.getValue("createdAt")).format("D MMM y")}</div>
            },
        },

        {
            id: "actions",
            header: () => <div>Action</div>,
            enableHiding: false,
            cell: ({ row }) => {

                return (
                    <div className="flex gap-x-2">
                        <Button asChild size={"icon"}>
                            <Link href={`/dashboard/service/edit/${row.original._id}`}>
                                <SquarePen />
                            </Link>
                        </Button>
                        <Button onClick={() => handleDelete(row.original._id)} variant={"destructive"} size={"icon"}>
                            <Trash />
                        </Button>
                    </div>
                )
            },
        },
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        globalFilterFn: (row, columnId, filterValue) => {
            const title = row.original.title?.toLowerCase() ?? ""

            return (
                title.includes(filterValue.toLowerCase())
            )
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">

                <Input
                    placeholder="Search by title"
                    value={(table.getState().globalFilter as string) ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">

                    Total {data.length} items

                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
