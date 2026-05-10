import BannerSlider from "@/components/BannerSlider";
import ProductCard from "@/components/ProductCard";
import { connectDB } from "@/lib/db";
import { BannerModel } from "@/models/Banner";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import type { Banner, Category, Product } from "@/types";
export default async function Home() {
  await connectDB();
  const banners = JSON.parse(
    JSON.stringify(await BannerModel.find().sort({ order: 1 }).lean()),
  ) as Banner[];
  const categories = JSON.parse(
    JSON.stringify(
      await CategoryModel.find().sort({ order: 1 }).limit(6).lean(),
    ),
  ) as Category[];
  const products = JSON.parse(
    JSON.stringify(
      await ProductModel.find().sort({ createdAt: -1 }).limit(12).lean(),
    ),
  ) as Product[];
  return (
    <main>
      <BannerSlider banners={banners} />

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="mb-5 mt-4 text-2xl font-black">Шинэ бараанууд</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
