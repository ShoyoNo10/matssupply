import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
const SubCategorySchema = new Schema({ name:{type:String,required:true}, slug:{type:String,required:true,unique:true}, categoryId:{type:Schema.Types.ObjectId,ref:"Category",required:true}, order:{type:Number,default:0} }, { timestamps:true });
export type SubCategoryDocument = InferSchemaType<typeof SubCategorySchema> & { _id: mongoose.Types.ObjectId };
export const SubCategoryModel: Model<SubCategoryDocument> = mongoose.models.SubCategory ?? mongoose.model<SubCategoryDocument>("SubCategory", SubCategorySchema);
