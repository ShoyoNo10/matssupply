// "use client";
// import { FormEvent, useEffect, useState } from "react";
// type Row = Record<string, string | number | undefined> & { _id: string };
// type Field = {
//   name: string;
//   label: string;
//   type?: "text" | "number" | "textarea" | "image" | "select";
//   options?: { label: string; value: string }[];
// };
// export default function AdminCrud({
//   title,
//   endpoint,
//   fields,
// }: {
//   title: string;
//   endpoint: string;
//   fields: Field[];
// }) {
//   const [rows, setRows] = useState<Row[]>([]);
//   const [editing, setEditing] = useState<Row | null>(null);
//   const [form, setForm] = useState<Record<string, string>>(
//     Object.fromEntries(fields.map((f) => [f.name, ""])),
//   );
//   async function load() {
//     const res = await fetch(endpoint, { cache: "no-store" });
//     const data = (await res.json()) as Row[];
//     setRows(data);
//   }
//   useEffect(() => {
//     void load();
//   }, []);
//   async function upload(file: File) {
//     const fd = new FormData();
//     fd.append("file", file);
//     const res = await fetch("/api/upload", { method: "POST", body: fd });
//     const data = (await res.json()) as { url: string };
//     return data.url;
//   }
//   async function submit(e: FormEvent) {
//     e.preventDefault();
//     const payload: Record<string, string | number> = { ...form };
//     fields.forEach((f) => {
//       if (f.type === "number") payload[f.name] = Number(form[f.name] || 0);
//     });
//     const url = editing ? `${endpoint}/${editing._id}` : endpoint;
//     await fetch(url, {
//       method: editing ? "PUT" : "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     setEditing(null);
//     setForm(Object.fromEntries(fields.map((f) => [f.name, ""])));
//     await load();
//   }
//   async function remove(id: string) {
//     await fetch(`${endpoint}/${id}`, { method: "DELETE" });
//     await load();
//   }
//   return (
//     <main className="mx-auto max-w-6xl px-4 py-10">
//       <h1 className="mb-6 text-3xl font-black">{title}</h1>
//       <form
//         onSubmit={submit}
//         className="grid gap-3 rounded-2xl bg-white p-5 shadow"
//       >
//         {fields.map((f) =>
//           f.type === "textarea" ? (
//             <textarea
//               key={f.name}
//               placeholder={f.label}
//               value={form[f.name] || ""}
//               onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
//               className="rounded-xl border p-3"
//             />
//           ) : f.type === "image" ? (
//             <input
//               key={f.name}
//               type="file"
//               accept="image/*"
//               onChange={async (e) => {
//                 const file = e.target.files?.[0];
//                 if (file) setForm({ ...form, [f.name]: await upload(file) });
//               }}
//               className="rounded-xl border p-3"
//             />
//           ) : f.type === "select" ? (
//             <select
//               key={f.name}
//               value={form[f.name] || ""}
//               onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
//               className="rounded-xl border p-3"
//             >
//               <option value="">{f.label}</option>
//               {f.options?.map((o) => (
//                 <option key={o.value} value={o.value}>
//                   {o.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               key={f.name}
//               type={f.type || "text"}
//               placeholder={f.label}
//               value={form[f.name] || ""}
//               onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
//               className="rounded-xl border p-3"
//             />
//           ),
//         )}
//         <button className="rounded-xl bg-orange-700 p-3 font-bold text-white">
//           {editing ? "Update" : "Add"}
//         </button>
//       </form>
//       <div className="mt-8 space-y-3">
//         {rows.map((r) => (
//           <div
//             key={r._id}
//             className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
//           >
//             <div>
//               <b>{String(r.name || r.title)}</b>
//               <p className="text-sm text-gray-500">
//                 {r.imageUrl ? String(r.imageUrl).slice(0, 60) : r.slug}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   setEditing(r);
//                   setForm(
//                     Object.fromEntries(
//                       fields.map((f) => [f.name, String(r[f.name] ?? "")]),
//                     ),
//                   );
//                 }}
//                 className="rounded-lg border px-3 py-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => remove(r._id)}
//                 className="rounded-lg bg-red-600 px-3 py-2 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }




"use client";

import { FormEvent, useEffect, useState } from "react";

type Row = Record<string, string | number | undefined> & {
  _id: string;
};

type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "image" | "select";
  options?: { label: string; value: string }[];
};

export default function AdminCrud({
  title,
  endpoint,
  fields,
}: {
  title: string;
  endpoint: string;
  fields: Field[];
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, ""])),
  );

  async function load() {
    const res = await fetch(endpoint, { cache: "no-store" });
    const data = (await res.json()) as Row[];
    setRows(data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function upload(file: File) {
    try {
      setUploading(true);

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = (await res.json()) as { url: string };

      return data.url;
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload: Record<string, string | number> = { ...form };

      fields.forEach((f) => {
        if (f.type === "number") {
          payload[f.name] = Number(form[f.name] || 0);
        }
      });

      const url = editing ? `${endpoint}/${editing._id}` : endpoint;

      await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setEditing(null);

      setForm(
        Object.fromEntries(fields.map((f) => [f.name, ""])),
      );

      await load();
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Устгах уу?")) return;

    await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    await load();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-black text-gray-800">
        {title}
      </h1>

      <form
        onSubmit={submit}
        className="relative grid gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl"
      >
        {(loading || uploading) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-white/80 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-700"></div>

            <p className="mt-4 text-lg font-bold text-orange-700">
              {uploading ? "Зураг upload хийж байна..." : "Түр хүлээнэ үү..."}
            </p>
          </div>
        )}

        {fields.map((f) =>
          f.type === "textarea" ? (
            <textarea
              key={f.name}
              placeholder={f.label}
              value={form[f.name] || ""}
              disabled={loading || uploading}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f.name]: e.target.value,
                })
              }
              className="min-h-[140px] rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-orange-600"
            />
          ) : f.type === "image" ? (
            <div
              key={f.name}
              className="rounded-2xl border border-dashed border-gray-300 p-5"
            >
              <input
                type="file"
                accept="image/*"
                disabled={loading || uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const url = await upload(file);

                  setForm({
                    ...form,
                    [f.name]: url,
                  });
                }}
                className="w-full"
              />

              {form[f.name] && (
                <img
                  src={form[f.name]}
                  alt=""
                  className="mt-4 h-40 w-full rounded-2xl object-cover shadow"
                />
              )}
            </div>
          ) : f.type === "select" ? (
            <select
              key={f.name}
              value={form[f.name] || ""}
              disabled={loading || uploading}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f.name]: e.target.value,
                })
              }
              className="rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-orange-600"
            >
              <option value="">{f.label}</option>

              {f.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={f.name}
              type={f.type || "text"}
              placeholder={f.label}
              value={form[f.name] || ""}
              disabled={loading || uploading}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f.name]: e.target.value,
                })
              }
              className="rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-orange-600"
            />
          ),
        )}

        <button
          disabled={loading || uploading}
          className="rounded-2xl bg-orange-700 p-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-orange-800 disabled:opacity-60"
        >
          {loading
            ? "Түр хүлээнэ үү..."
            : editing
              ? "Update"
              : "Add"}
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {rows.map((r) => (
          <div
            key={r._id}
            className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-lg transition hover:shadow-2xl md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              {r.imageUrl && (
                <img
                  src={String(r.imageUrl)}
                  alt=""
                  className="h-20 w-20 rounded-2xl object-cover"
                />
              )}

              <div>
                <h2 className="text-lg font-black text-gray-800">
                  {String(r.name || r.title)}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {r.slug
                    ? String(r.slug)
                    : String(r.imageUrl).slice(0, 60)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditing(r);

                  setForm(
                    Object.fromEntries(
                      fields.map((f) => [
                        f.name,
                        String(r[f.name] ?? ""),
                      ]),
                    ),
                  );

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="rounded-xl border border-gray-300 px-5 py-2 font-bold transition hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={() => remove(r._id)}
                className="rounded-xl bg-red-600 px-5 py-2 font-bold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}