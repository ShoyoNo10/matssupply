import Link from "next/link";
import type { Product } from "@/types";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-black">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.shortDescription}
        </p>
        {/* {typeof product.price === "number" && (
          <p className="mt-3 font-bold text-orange-700">
            {product.price.toLocaleString()}₮
          </p>
        )} */}
      </div>
    </Link>
  );
}
