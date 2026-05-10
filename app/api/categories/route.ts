import { NextResponse } from "next/server"; import { connectDB } from "@/lib/db"; import { slugify } from "@/lib/slug"; import { CategoryModel } from "@/models/Category";
export async function GET(){ await connectDB(); return NextResponse.json(await CategoryModel.find().sort({order:1}).lean()); }
export async function POST(req:Request){ await connectDB(); const body = await req.json() as {name:string; imageUrl?:string; order?:number}; const item=await CategoryModel.create({ ...body, slug: slugify(body.name) }); return NextResponse.json(item); }
