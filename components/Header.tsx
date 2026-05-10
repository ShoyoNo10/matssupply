// import Link from "next/link";
// import { connectDB } from "@/lib/db";
// import { CategoryModel } from "@/models/Category";
// import { SubCategoryModel } from "@/models/SubCategory";
// export default async function Header() {
//   await connectDB();
//   const categories = await CategoryModel.find().sort({ order: 1 }).lean();
//   const subs = await SubCategoryModel.find().sort({ order: 1 }).lean();
//   return (
//     <header className="sticky top-0 z-50 bg-white/95 shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//         <Link href="/" className="text-2xl font-black text-orange-700">
//           MatsSupply
//         </Link>
//         <nav className="flex items-center gap-7 font-bold">
//           <Link href="/">Нүүр</Link>
//           <Link href="/about">Бидний тухай</Link>
//           <div className="group relative py-2">
//             <button className="font-bold">Ангилал ▾</button>
//             <div className="invisible absolute right-0 top-10 w-[680px] rounded-xl border bg-white p-6 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
//               <div className="grid grid-cols-2 gap-x-10 gap-y-4">
//                 {categories.map((cat) => (
//                   <div key={String(cat._id)}>
//                     <Link
//                       href={`/category/${cat.slug}`}
//                       className="mb-2 block text-lg font-black hover:text-orange-700"
//                     >
//                       • {cat.name}
//                     </Link>
//                     <div className="ml-4 space-y-1 text-sm text-gray-600">
//                       {subs
//                         .filter((s) => String(s.categoryId) === String(cat._id))
//                         .map((s) => (
//                           <Link
//                             key={String(s._id)}
//                             href={`/category/${s.slug}`}
//                             className="block hover:text-orange-700"
//                           >
//                             - {s.name}
//                           </Link>
//                         ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           {/* <Link
//             href="/admin"
//             className="rounded-full bg-orange-700 px-4 py-2 text-white"
//           >
//             Admin
//           </Link> */}
//         </nav>
//       </div>
//     </header>
//   );
// }





import Link from "next/link";
import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { SubCategoryModel } from "@/models/SubCategory";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  await connectDB();

  const categories = await CategoryModel.find().sort({ order: 1 }).lean();
  const subs = await SubCategoryModel.find().sort({ order: 1 }).lean();

  const safeCategories = JSON.parse(JSON.stringify(categories));
  const safeSubs = JSON.parse(JSON.stringify(subs));

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black text-blue-900">
          Matsupply
        </Link>

        <div className="md:hidden">
          <MobileMenu categories={safeCategories} subs={safeSubs} />
        </div>

        <nav className="hidden items-center gap-7 font-bold md:flex">
          <Link href="/">Нүүр</Link>
          <Link href="/about">Бидний тухай</Link>

          <div className="group relative py-2">
            <button className="font-bold">Ангилал ▾</button>

            <div className="invisible absolute right-0 top-10 w-[680px] rounded-xl border bg-white p-6 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                {safeCategories.map((cat: any) => (
                  <div key={String(cat._id)}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="mb-2 block text-lg font-black hover:text-blue-900"
                    >
                      • {cat.name}
                    </Link>

                    <div className="ml-4 space-y-1 text-sm text-gray-600">
                      {safeSubs
                        .filter(
                          (s: any) => String(s.categoryId) === String(cat._id)
                        )
                        .map((s: any) => (
                          <Link
                            key={String(s._id)}
                            href={`/category/${s.slug}`}
                            className="block hover:text-blue-900"
                          >
                            - {s.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}