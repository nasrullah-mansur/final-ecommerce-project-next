"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
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
import { useParams, useRouter } from "next/navigation"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    status: z.string().min(1, "Title field is required"),
    image: z
        .instanceof(File, { message: "Image field is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine((file) => ACCEPTED_TYPES.includes(file.type), "Unsupported file type")
        .optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CategoryEdit() {
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter();
    const [image, setImage] = useState("https://placehold.co/600x400.png");

    const { id } = useParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            status: "",
        } as unknown as FormValues,
        mode: "onSubmit",
    })

    const imageFile = form.watch("image")

    // Build preview URL safely + cleanup
    const previewUrl = useMemo(() => {
        if (!imageFile) return null
        return URL.createObjectURL(imageFile)
    }, [imageFile])

    useEffect(() => {


        async function getData() {
            const res = await fetch(apiUrl("/category"), {
                method: "PUT",
                body: JSON.stringify({ id: id })
            })

            const json = await res.json();

            form.setValue("title", json.data.title);
            form.setValue("status", json.data.status);
            setImage(json.data.image)

        }

        getData()

        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }

    }, [previewUrl, id, form])

    async function onSubmit(values: FormValues) {
        setServerError(null)
        setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append("title", values.title)
            if (values.image) {
                formData.append("image", values.image)
            }
            formData.append("status", values.status)
            formData.append("id", id as string);

            const res = await fetch(apiUrl("/category"), {
                method: "PATCH",
                body: formData,
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

            router.push('/dashboard/category')

        } catch (err) {

            setServerError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="border p-4 bg-accent/50 rounded-lg">
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Edit category</h2>

                <Button asChild>
                    <Link href="/dashboard/category">Back</Link>
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

                    {/* Preview */}
                    <div className="flex items-center gap-3">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                            <Image
                                src={previewUrl ?? image}
                                fill
                                alt="Preview"
                                className="object-cover"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            JPG/PNG/WebP/GIF up to 5MB
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Select image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept={ACCEPTED_TYPES.join(",")}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (!file) {
                                                // clear value in form state
                                                form.setValue("image", undefined as unknown as File, {
                                                    shouldValidate: true,
                                                })
                                                return
                                            }
                                            form.setValue("image", file, { shouldValidate: true })
                                        }}
                                    />
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
