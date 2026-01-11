import { Schema, model, models } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser {
    email: string;
    password: string; // hashed
    name?: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: false,
            select: false,
        },

        name: {
            type: String,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
            index: true,
        },
    },
    { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
