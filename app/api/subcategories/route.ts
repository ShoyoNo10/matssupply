import { NextResponse } from "next/server"; import { connectDB } from "@/lib/db"; import { slugify } from "@/lib/slug"; import { SubCategoryModel } from "@/models/SubCategory";
export async function GET(){ await connectDB(); return NextResponse.json(await SubCategoryModel.find().populate("categoryId").sort({order:1}).lean()); }
export async function POST(req:Request){ await connectDB(); const body=await req.json() as {name:string; categoryId:string; order?:number}; const item=await SubCategoryModel.create({...body, slug:slugify(body.name)}); return NextResponse.json(item); }
