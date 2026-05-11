import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Background Blur */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-yellow-100 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
            Холбоо барих
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Бидэнтэй холбогдоорой
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Барилгын материал, нийлүүлэлт болон үнийн мэдээлэл авахыг хүсвэл
            доорх мэдээллээр бидэнтэй холбогдоно уу.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Phone */}
          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:scale-110">
              <Phone size={28} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">Утас</h2>

            <div className="mt-4 space-y-2">
              <a
                href="tel:70101500"
                className="block text-lg font-medium text-gray-700 transition hover:text-orange-600"
              >
                70101500
              </a>

              <a
                href="tel:88180227"
                className="block text-lg font-medium text-gray-700 transition hover:text-orange-600"
              >
                88180227
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:scale-110">
              <Mail size={28} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">И-мэйл</h2>

            <a
              href="mailto:supply@matsupply.mn"
              className="mt-4 block break-all text-lg font-medium text-gray-700 transition hover:text-orange-600"
            >
              supply@matsupply.mn
            </a>
          </div>

          {/* Address */}
          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:scale-110">
              <MapPin size={28} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Байршил
            </h2>

            <p className="mt-4 text-lg leading-7 text-gray-700">
              Улаанбаатар хот
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-[32px] bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-10 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-black md:text-3xl">
            Хамтран ажиллахад бэлэн байна
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Та бүтээгдэхүүн, нийлүүлэлт болон үнийн санал авахыг хүсвэл шууд
            холбогдоорой.
          </p>

          <a
            href="tel:70101500"
            className="mt-7 inline-flex items-center rounded-2xl bg-white px-6 py-3 text-base font-bold text-orange-600 transition hover:scale-105 hover:bg-orange-50"
          >
            Одоо залгах
          </a>
        </div>
      </section>
    </main>
  );
}