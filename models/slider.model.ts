import { Schema, model, models } from "mongoose";

export interface ISlider {
    title: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const SliderSchema = new Schema<ISlider>(
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

export const Slider = models.Slider || model<ISlider>("Slider", SliderSchema);
