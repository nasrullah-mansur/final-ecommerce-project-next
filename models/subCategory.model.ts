import { Schema, Types, model, models } from "mongoose";

export interface ISubCategory {
    title: string;
    slug: string;
    status: "Active" | "Inactive";
    category: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
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
    },
    { timestamps: true }
);

export const SubCategory = models.SubCategory || model<ISubCategory>("SubCategory", SubCategorySchema);
