import { NextResponse } from "next/server"; import { connectDB } from "@/lib/db"; import { BannerModel } from "@/models/Banner";
export async function GET(){ await connectDB(); return NextResponse.json(await BannerModel.find().sort({order:1}).lean()); }
export async function POST(req:Request){ await connectDB(); const body=await req.json() as {title:string;subtitle?:string;imageUrl:string;link?:string;order?:number}; return NextResponse.json(await BannerModel.create(body)); }
