import { Schema, model, models } from "mongoose";

export interface IBrand {
    title: string;
    slug: string;
    status: "Active" | "Inactive";
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ServiceSchema = new Schema<IBrand>(
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

export const Brand = models.Brand || model<IBrand>("Brand", ServiceSchema);
