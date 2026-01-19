import { Schema, model, models } from "mongoose";

export interface ICategory {
    title: string;
    slug: string;
    status: "Active" | "Inactive";
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
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


        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Category = models.Category || model<ICategory>("Category", CategorySchema);
