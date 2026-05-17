// import AdminCrud from "@/components/AdminCrud";
// import { connectDB } from "@/lib/db";
// import { CategoryModel } from "@/models/Category";
// export default async function Page() {
//   await connectDB();
//   const cats = await CategoryModel.find().lean();
//   return (
//     <AdminCrud
//       title="Sub categories"
//       endpoint="/api/subcategories"
//       fields={[
//         { name: "name", label: "Нэр" },
//         {
//           name: "categoryId",
//           label: "Үндсэн category",
//           type: "select",
//           options: cats.map((c) => ({ label: c.name, value: String(c._id) })),
//         },
//         { name: "order", label: "Дараалал", type: "number" },
//       ]}
//     />
//   );
// }





import AdminCrud from "@/components/AdminCrud";
import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models/Category";

export default async function Page() {
  await connectDB();

  const cats = await CategoryModel.find().lean();

  return (
    <AdminCrud
      title="Sub categories"
      endpoint="/api/subcategories"
      fields={[
        { name: "name", label: "Нэр" },
        { name: "slug", label: "Slug /гараар бичнэ/" },
        {
          name: "categoryId",
          label: "Үндсэн category",
          type: "select",
          options: cats.map((c) => ({
            label: c.name,
            value: String(c._id),
          })),
        },
        { name: "order", label: "Дараалал", type: "number" },
      ]}
    />
  );
}