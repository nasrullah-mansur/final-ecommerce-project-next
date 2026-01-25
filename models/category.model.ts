
import mongoose, { Schema, model, models } from "mongoose";

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


// ✅ Cascade delete Rules (NO circular import)
CategorySchema.pre("deleteOne", { document: true, query: false }, async function () {
    await mongoose.models.SubCategory?.deleteMany({ category: this._id });
});


// CategorySchema.pre("deleteMany", async function (this: Query<any, any>) {
//     const docs = await this.model
//         .find(this.getFilter())
//         .select("_id")
//         .lean<Array<{ _id: Types.ObjectId }>>();

//     const ids = docs.map((d) => d._id);

//     if (ids.length && mongoose.models.SubCategory) {
//         await mongoose.models.SubCategory.deleteMany({ category: { $in: ids } });
//     }
// });

export const Category = models.Category || model<ICategory>("Category", CategorySchema);
