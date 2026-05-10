import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

type CloudinaryResult = {
  secure_url: string;
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file байхгүй" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Зөвхөн зураг файл оруулна уу" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "barilga-web",
          resource_type: "image",
          allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
            "avif",
            "heic",
            "heif",
            "bmp",
            "tiff",
            "svg",
          ],
        },
        (err, res) => {
          if (err || !res) {
            reject(err);
            return;
          }

          resolve({ secure_url: res.secure_url });
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("UPLOAD_ERROR:", error);

    return NextResponse.json(
      {
        error: "Зураг upload хийхэд алдаа гарлаа",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}