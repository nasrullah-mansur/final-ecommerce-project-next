"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import apiUrl from "@/lib/apiUrl"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    status: z.string().min(1, "Title field is required"),
    category: z.string().min(1, "Category field is required"),

})

type FormValues = z.infer<typeof formSchema>

export default function CategoryCreate() {
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: ""
        } as unknown as FormValues,
        mode: "onSubmit",
    })


    async function onSubmit(values: FormValues) {
        setServerError(null)
        setSubmitting(true)

        try {

            const res = await fetch(apiUrl("/sub-category"), {
                method: "POST",
                body: JSON.stringify(values),
            })

            const data = await res.json().catch(() => null)

            if (!res.ok) {
                const msg =
                    data?.message ||
                    data?.error ||
                    `Request failed with status ${res.status}`
                setServerError(msg)

            }
            form.reset()

            router.push('/dashboard/sub-category')

        } catch (err) {

            setServerError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }



    useEffect(() => {
        async function getData() {
            const res = await fetch(apiUrl('/category'));
            const json = await res.json();
            setCategories(json.data);
        }
        getData();

    }, [])


    return (
        <div className="border p-4 bg-accent/50 rounded-lg">
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Create sub category</h2>

                <Button asChild>
                    <Link href="/dashboard/sub-category">Back</Link>
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {serverError ? (
                        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm">
                            {serverError}
                        </div>
                    ) : null}

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select category</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {categories.map((category: { _id: string; title: string }) => (
                                                <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select status</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
