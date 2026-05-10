import { NextResponse } from "next/server"; import { connectDB } from "@/lib/db"; import { slugify } from "@/lib/slug"; import { ProductModel } from "@/models/Product";
type ProductBody={title:string;price?:number;shortDescription:string;description:string;imageUrl:string;categoryId:string;subCategoryId?:string;specs?:{key:string;value:string}[]};
export async function GET(){ await connectDB(); return NextResponse.json(await ProductModel.find().populate("categoryId").populate("subCategoryId").sort({createdAt:-1}).lean()); }
export async function POST(req:Request){ await connectDB(); const body=await req.json() as ProductBody; const item=await ProductModel.create({...body, slug:slugify(body.title), subCategoryId: body.subCategoryId || undefined}); return NextResponse.json(item); }
