// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { slugify } from "@/lib/slug";
// import { ProductModel } from "@/models/Product";
// type ProductBody = {
//   title: string;
//   price?: number;
//   shortDescription: string;
//   description: string;
//   imageUrl: string;
//   categoryId: string;
//   subCategoryId?: string;
//   specs?: { key: string; value: string }[];
// };
// export async function GET() {
//   await connectDB();
//   return NextResponse.json(
//     await ProductModel.find()
//       .populate("categoryId")
//       .populate("subCategoryId")
//       .sort({ createdAt: -1 })
//       .lean(),
//   );
// }
// export async function POST(req: Request) {
//   await connectDB();
//   const body = (await req.json()) as ProductBody;
//   const item = await ProductModel.create({
//     ...body,
//     slug: slugify(body.title),
//     subCategoryId: body.subCategoryId || undefined,
//   });
//   return NextResponse.json(item);
// }




import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { ProductModel } from "@/models/Product";

type ProductBody = {
  title: string;
  price?: number;
  shortDescription: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  subCategoryId?: string;
  specs?: { key: string; value: string }[];
};

async function createUniqueSlug(title: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await ProductModel.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export async function GET() {
  await connectDB();

  const products = await ProductModel.find()
    .populate("categoryId")
    .populate("subCategoryId")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = (await req.json()) as ProductBody;

    if (!body.title || !body.shortDescription || !body.description || !body.imageUrl || !body.categoryId) {
      return NextResponse.json(
        { error: "Мэдээлэл дутуу байна" },
        { status: 400 },
      );
    }

    const slug = await createUniqueSlug(body.title);

    const item = await ProductModel.create({
      ...body,
      slug,
      subCategoryId: body.subCategoryId || undefined,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("PRODUCT_CREATE_ERROR:", error);

    return NextResponse.json(
      { error: "Бараа нэмэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}