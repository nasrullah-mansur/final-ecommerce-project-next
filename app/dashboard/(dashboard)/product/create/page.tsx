/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
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
import { Textarea } from "@/components/ui/textarea"
import apiUrl from "@/lib/apiUrl"
import { slugify } from "@/utils/slugify"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Editor } from "primereact/editor"
import { toast } from "sonner"


const formSchema = z.object({
    // title: z.string().min(1, "Title field is required"),
    currentPrice: z.string().min(1, "Current price field is required"),
    previousPrice: z.string().min(1, "Previous price field is required"),
    status: z.string().min(1, "Status field is required"),
    description: z.string().min(1, "Description field is required"),
    details: z.string().min(1, "Details field is required"),
    category: z.string().min(1, "Category field is required"),
    subCategory: z.string().min(1, "Sub category field is required"),
})

type FormValues = z.infer<typeof formSchema>

type IImage = {
    image: File | null,
    preview: string | null,
}

export default function CreateProduct() {
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<IImage>({
        image: null,
        preview: null,
    });

    const [categories, setCategories] = useState<{ title: string; _id: string }[]>([]);
    const [subCategories, setSubCategories] = useState<{ title: string; _id: string; category: { _id: string } }[]>([]);

    const [gallery, setGallery] = useState<IImage[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            status: "",
            description: "",
            details: "",
            category: "",
            subCategory: ""
        } as unknown as FormValues,
        mode: "onSubmit",
    })



    async function onSubmit(values: FormValues) {
        setServerError(null)
        setSubmitting(true)


        let updatedValues: any = { ...values, title, slug };


        try {

            if (!title || !slug || !image.image) {
                toast.error("Validation error");

                return;
            }

            // Image upload to cludinary;

            if (image.image) {

                const formData = new FormData();
                formData.append("file", image.image)

                const result = await fetch(apiUrl('/image-upload/single'), {
                    method: "POST",
                    body: formData,
                })

                const json = await result.json();

                if (json.ok) {
                    updatedValues = { ...updatedValues, image: json.data.url }
                }

            }

            if (gallery.length > 0) {
                const formData = new FormData();

                gallery.forEach((gal) => {
                    formData.append("files", gal.image as File);
                });


                const result = await fetch(apiUrl('/image-upload/multiple'), {
                    method: "POST",
                    body: formData,
                })

                const json = await result.json();

                if (json.ok) {
                    updatedValues = { ...updatedValues, gallery: json.data }
                }
            }


            const productRes = await fetch(apiUrl('/product'), {
                method: "POST",
                body: JSON.stringify({ ...updatedValues })
            })

            const productJson = await productRes.json();

            if (productJson.ok) {
                router.push("/dashboard/product");
                toast.success("Product added successfully");
            }



        } catch (err) {
            console.log(err);

            setServerError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }


    const handleTitleChange = (title: string) => {
        setTitle(title);
        setSlug(slugify(title))
    }


    useEffect(() => {

        async function getData() {
            const catRes = await fetch(apiUrl('/category'));
            const catJson = await catRes.json();

            if (catJson.ok) {
                setCategories(catJson.data);
            }

            const subCatRes = await fetch(apiUrl('/sub-category'));
            const subCatJson = await subCatRes.json();

            if (subCatJson.ok) {
                setSubCategories(subCatJson.data);
            }


        }

        getData();

    }, [])

    const selectedCategory = form.watch("category");

    let updatedSubCategory: { title: string; _id: string; category: { _id: string } }[] = [];

    if (selectedCategory) {
        updatedSubCategory = subCategories.filter(cat => cat.category._id == selectedCategory);
    }


    return (
        <div className="border p-4 bg-accent/50 rounded-lg">
            <div className="border mb-4 p-4 rounded-xl flex justify-between">
                <h2 className="text-xl font-semibold">Create brand</h2>

                <Button asChild>
                    <Link href="/dashboard/brand">Back</Link>
                </Button>
            </div>

            <Form {...form}>


                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {serverError ? (
                        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm">
                            {serverError}
                        </div>
                    ) : null}
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-8">
                            <div className="mb-3">
                                <Field>
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Input onChange={(e) => handleTitleChange(e.target.value)} value={title} id="title" name="title" placeholder="title" />
                                </Field>
                            </div>
                            <div className="mb-3">
                                <Field>
                                    <FieldLabel htmlFor="slug">Slug</FieldLabel>
                                    <Input readOnly value={slug} id="slug" name="slug" placeholder="slug" />
                                </Field>

                            </div>

                            <div className="mb-3">

                                {image.preview &&
                                    <div>
                                        <Image
                                            src={image.preview as string}
                                            alt="a"
                                            width={100}
                                            height={100}
                                        />
                                    </div>

                                }

                                <Field>
                                    <FieldLabel htmlFor="image">Featured Image</FieldLabel>
                                    <Input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setImage({
                                                    ...image,
                                                    image: e.target.files[0],
                                                    preview: URL.createObjectURL(e.target.files[0])
                                                })


                                            }
                                        }}
                                    />
                                </Field>

                            </div>

                            <div className="mb-3">

                                {gallery && gallery.length > 0 &&
                                    <div className="flex gap-4">

                                        {gallery.map(gallery => (

                                            <div key={gallery.preview}>
                                                <Image
                                                    src={gallery.preview as string}
                                                    alt="a"
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                        ))}



                                    </div>

                                }

                                <Field>
                                    <FieldLabel htmlFor="gallery">Gallery Image</FieldLabel>
                                    <Input
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.files && e.target.files.length > 0) {


                                                const imageGallery = Array.from(e.target.files).map((file: File) => {
                                                    return {
                                                        image: file,
                                                        preview: URL.createObjectURL(file)
                                                    }
                                                })

                                                setGallery(imageGallery)


                                            }
                                        }}

                                        accept="image/*" multiple type="file" id="gallery" name="gallery" />
                                </Field>

                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Details</FormLabel>
                                            <FormControl>
                                                <Editor value={field.value} onTextChange={(e) => field.onChange(e.htmlValue)} style={{ height: '320px' }} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Category</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent >
                                                        {categories.map(category => (
                                                            <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select sub category</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Sub category" />
                                                    </SelectTrigger>
                                                    <SelectContent >
                                                        {updatedSubCategory.map(cat => (
                                                            <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>
                            <div className="mb-3">
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


                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="currentPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="current price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="previousPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Previous price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="previous price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </div>



                    {/* Preview */}
                    {/* <div className="flex items-center gap-3">
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
                    </div> */}




                </form>
            </Form>
        </div>
    )
}
