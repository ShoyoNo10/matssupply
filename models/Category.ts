import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
const CategorySchema = new Schema({ name:{type:String,required:true}, slug:{type:String,required:true,unique:true}, imageUrl:{type:String}, order:{type:Number,default:0} }, { timestamps:true });
export type CategoryDocument = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };
export const CategoryModel: Model<CategoryDocument> = mongoose.models.Category ?? mongoose.model<CategoryDocument>("Category", CategorySchema);
