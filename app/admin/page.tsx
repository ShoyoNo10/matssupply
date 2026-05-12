import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const password = formData.get("password");

  if (password === process.env.ADMIN_SECRET) {
    const cookieStore = await cookies();

    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    redirect("/admin");
  }

  redirect("/admin?error=1");
}

export default async function Admin({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const params = await searchParams;

  const isAuth = cookieStore.get("admin_auth")?.value === "true";

  if (!isAuth) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <form
          action={login}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl"
        >
          <h1 className="text-2xl font-black">Admin нэвтрэх</h1>

          <input
            name="password"
            type="password"
            placeholder="Нууц үг"
            className="mt-6 w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            required
          />

          {params?.error && (
            <p className="mt-3 text-sm font-bold text-red-600">
              Нууц үг буруу байна
            </p>
          )}

          <button className="mt-5 w-full rounded-xl bg-orange-600 py-3 font-black text-white hover:bg-orange-700">
            Нэвтрэх
          </button>
        </form>
      </main>
    );
  }

  const menus = [
    ["Ангилал", "/admin/categories"],
    ["Дэд ангилал", "/admin/subcategories"],
    ["Бүтээгдэхүүн", "/admin/products"],
    ["Banner", "/admin/banners"],
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-black">Admin panel</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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