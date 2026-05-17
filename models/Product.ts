// import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
// const ProductSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     price: { type: Number },
//     shortDescription: { type: String, required: true },
//     description: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     categoryId: {
//       type: Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     subCategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory" },
//     specs: [{ key: String, value: String }],
//   },
//   { timestamps: true },
// );
// export type ProductDocument = InferSchemaType<typeof ProductSchema> & {
//   _id: mongoose.Types.ObjectId;
// };
// export const ProductModel: Model<ProductDocument> =
//   mongoose.models.Product ??
//   mongoose.model<ProductDocument>("Product", ProductSchema);




import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    price: { type: Number },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    specs: [{ key: String, value: String }],
  },
  { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product ??
  mongoose.model<ProductDocument>("Product", ProductSchema);