// import AdminCrud from "@/components/AdminCrud";
// import { connectDB } from "@/lib/db";
// import { CategoryModel } from "@/models/Category";
// import { SubCategoryModel } from "@/models/SubCategory";
// export default async function Page() {
//   await connectDB();
//   const cats = await CategoryModel.find().lean();
//   const subs = await SubCategoryModel.find().lean();
//   return (
//     <AdminCrud
//       title="Products"
//       endpoint="/api/products"
//       fields={[
//         { name: "title", label: "Барааны нэр" },
//         { name: "price", label: "Үнэ", type: "number" },
//         { name: "shortDescription", label: "Товч тайлбар" },
//         { name: "description", label: "Дэлгэрэнгүй", type: "textarea" },
//         {
//           name: "categoryId",
//           label: "Category",
//           type: "select",
//           options: cats.map((c) => ({ label: c.name, value: String(c._id) })),
//         },
//         {
//           name: "subCategoryId",
//           label: "Sub category",
//           type: "select",
//           options: subs.map((s) => ({ label: s.name, value: String(s._id) })),
//         },
//         { name: "imageUrl", label: "Зураг", type: "image" },
//       ]}
//     />
//   );
// }




import AdminCrud from "@/components/AdminCrud";
import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { SubCategoryModel } from "@/models/SubCategory";

export default async function Page() {
  await connectDB();

  const cats = await CategoryModel.find().sort({ order: 1 }).lean();
  const subs = await SubCategoryModel.find().sort({ order: 1 }).lean();

  return (
    <AdminCrud
      title="Products"
      endpoint="/api/products"
      fields={[
        { name: "title", label: "Барааны нэр" },
        { name: "price", label: "Үнэ", type: "number" },
        { name: "shortDescription", label: "Товч тайлбар" },
        { name: "description", label: "Дэлгэрэнгүй", type: "textarea" },
        {
          name: "categoryId",
          label: "Category",
          type: "select",
          options: cats.map((c) => ({
            label: c.name,
            value: String(c._id),
          })),
        },
        {
          name: "subCategoryId",
          label: "Sub category",
          type: "select",
          options: subs.map((s) => ({
            label: s.name,
            value: String(s._id),
          })),
        },
        { name: "imageUrl", label: "Зураг", type: "image" },
      ]}
    />
  );
}