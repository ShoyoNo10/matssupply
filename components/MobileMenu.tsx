"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ categories, subs }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg border border-orange-700 px-3 py-2 text-xl font-black text-orange-700"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-14 w-[92vw] max-h-[82vh] overflow-y-auto rounded-2xl border bg-white shadow-2xl">
          <div className="divide-y divide-gray-200">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 font-bold hover:bg-orange-50 hover:text-orange-700"
            >
              Нүүр
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 font-bold hover:bg-orange-50 hover:text-orange-700"
            >
              Бидний тухай
            </Link>

            <div className="px-5 py-4 font-black text-orange-700">
              Ангилал
            </div>

            {categories.map((cat: any) => {
              const catId = String(cat._id);
              const isOpen = openCategory === catId;

              const catSubs = subs.filter(
                (s: any) => String(s.categoryId) === catId
              );

              return (
                <div key={catId}>
                  <button
                    onClick={() =>
                      setOpenCategory(isOpen ? null : catId)
                    }
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-bold hover:bg-orange-50"
                  >
                    <span>{cat.name}</span>
                    <span className="text-orange-700">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t bg-gray-50">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="block border-b px-8 py-3 text-sm font-bold text-orange-700"
                      >
                        Бүгдийг харах
                      </Link>

                      {catSubs.map((s: any) => (
                        <Link
                          key={String(s._id)}
                          href={`/category/${s.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="block border-b px-8 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700"
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
        </div>
      )}
    </div>
  );
}