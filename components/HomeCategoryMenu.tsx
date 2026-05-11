"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeCategoryMenu({ categories, subs }: any) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="hidden md:flex">
        {categories.map((cat: any) => {
          const catId = String(cat._id);

          const catSubs = subs.filter(
            (s: any) => String(s.categoryId) === catId,
          );

          return (
            <div key={catId} className="group relative flex-1">
              <Link
                href={`/category/${cat.slug}`}
                className="flex h-14 items-center justify-center bg-[#002f63] px-4 text-center text-base font-black text-white transition hover:bg-[#567c9a]"
              >
                {cat.name}
              </Link>

              {catSubs.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 w-full min-w-56 bg-white opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  <div className="h-2 bg-transparent" />

                  <Link
                    href={`/category/${cat.slug}`}
                    className="block border-b px-4 py-3 text-sm font-bold text-orange-700 hover:bg-orange-50"
                  >
                    Бүгдийг харах
                  </Link>

                  {catSubs.map((s: any) => (
                    <Link
                      key={String(s._id)}
                      href={`/category/${s.slug}`}
                      className="block border-b px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 last:border-b-0"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        {categories.map((cat: any) => {
          const catId = String(cat._id);
          const isOpen = openCategory === catId;

          const catSubs = subs.filter(
            (s: any) => String(s.categoryId) === catId,
          );

          return (
            <div key={catId}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : catId)}
                className="flex min-h-14 w-full items-center justify-between rounded-xl bg-[#002f63] px-4 py-3 text-left text-sm font-black text-white"
              >
                <span>{cat.name}</span>
                <span className="text-orange-500">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="mt-2 overflow-hidden rounded-xl border bg-white shadow">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block border-b px-4 py-3 text-sm font-bold text-orange-700"
                  >
                    Бүгдийг харах
                  </Link>

                  {catSubs.map((s: any) => (
                    <Link
                      key={String(s._id)}
                      href={`/category/${s.slug}`}
                      className="block border-b px-4 py-3 text-sm text-gray-700 last:border-b-0"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}