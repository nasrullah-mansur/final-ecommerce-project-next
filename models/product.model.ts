import { Schema, Types, model, models } from "mongoose";

export interface IProduct {
    title: string;
    slug: string;
    status: "Active" | "Inactive";
    category: Types.ObjectId;
    subCategory: Types.ObjectId;
    gallery: string[];
    image: string;
    details: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            default: "Active",
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        subCategory: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        gallery: {
            type: [String],
            required: false,
        },
    },
    { timestamps: true }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);
