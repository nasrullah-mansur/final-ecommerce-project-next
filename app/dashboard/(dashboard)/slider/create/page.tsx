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
import apiUrl from "@/lib/apiUrl"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    image: z
        .instanceof(File, { message: "Image field is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine((file) => ACCEPTED_TYPES.includes(file.type), "Unsupported file type"),
})

type FormValues = z.infer<typeof formSchema>

export default function AddSlider() {
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
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
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    async function onSubmit(values: FormValues) {
        setServerError(null)
        setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("image", values.image)

            const res = await fetch(apiUrl("/slider"), {
                method: "POST",
                body: formData,
            })

            const data = await res.json().catch(() => null)

            if (!res.ok) {
                const msg =
                    data?.message ||
                    data?.error ||
                    `Request failed with status ${res.status}`
                setServerError(msg)
                return
            }

            form.reset()

            console.log("Created slider:", data)
        } catch (err) {
            setServerError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="border p-4 bg-accent/50 rounded-lg">
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Add Slider</h2>

                <Button asChild>
                    <Link href="/dashboard/slider">Back</Link>
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
                                src={previewUrl ?? "https://placehold.co/600x400.png"}
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

                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
