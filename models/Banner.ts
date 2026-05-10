import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
const BannerSchema = new Schema({ title:{type:String,required:true}, subtitle:{type:String}, imageUrl:{type:String,required:true}, link:{type:String}, order:{type:Number,default:0} }, { timestamps:true });
export type BannerDocument = InferSchemaType<typeof BannerSchema> & { _id: mongoose.Types.ObjectId };
export const BannerModel: Model<BannerDocument> = mongoose.models.Banner ?? mongoose.model<BannerDocument>("Banner", BannerSchema);
