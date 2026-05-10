import { connectDB } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import type { Product } from "@/types";
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const product = JSON.parse(
    JSON.stringify(await ProductModel.findById(id).lean()),
  ) as Product | null;
  if (!product) return <main className="p-10">Бараа олдсонгүй</main>;
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full rounded-3xl object-cover shadow"
      />
      <div>
        <h1 className="text-4xl font-black">{product.title}</h1>
        {/* {typeof product.price === "number" && (
          <p className="mt-4 text-2xl font-black text-orange-700">
            {product.price.toLocaleString()}₮
          </p>
        )} */}
        <p className="mt-5 text-gray-700">{product.description}</p>
        <div className="mt-6 space-y-2">
          {product.specs?.map((s, i) => (
            <div key={i} className="rounded-xl bg-white p-3">
              <b>{s.key}:</b> {s.value}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
