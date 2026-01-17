import { Schema, model, models } from "mongoose";

export interface IService {
    title: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
    {
        title: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Service = models.Service || model<IService>("Service", ServiceSchema);
