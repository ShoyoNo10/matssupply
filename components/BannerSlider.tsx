"use client";
import Link from "next/link"; import { useEffect, useState } from "react"; import type { Banner } from "@/types";
export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [index,setIndex]=useState(0);
  useEffect(()=>{ if(!banners.length) return; const id=setInterval(()=>setIndex((v)=>(v+1)%banners.length),2000); return()=>clearInterval(id); },[banners.length]);
  if(!banners.length) return <div className="h-56 rounded-3xl bg-orange-100" />;
  const b=banners[index];
  return <Link href={b.link || "#"} className="relative mx-auto mt-6 block h-60 max-w-7xl overflow-hidden rounded-3xl shadow-lg">
    <img src={b.imageUrl} alt={b.title} className="h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-10 text-white"><h1 className="max-w-xl text-4xl font-black">{b.title}</h1><p className="mt-3 text-lg">{b.subtitle}</p></div>
  </Link>;
}
