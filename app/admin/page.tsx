import Link from "next/link";
export default function Admin() {
  const menus = [
    ["Categories", "/admin/categories"],
    ["Sub categories", "/admin/subcategories"],
    ["Products", "/admin/products"],
    ["Banners", "/admin/banners"],
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-black">Admin panel</h1>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {menus.map(([t, l]) => (
          <Link
            key={l}
            href={l}
            className="rounded-2xl bg-white p-8 text-xl font-black shadow hover:text-orange-700"
          >
            {t}
          </Link>
        ))}
      </div>
    </main>
  );
}
