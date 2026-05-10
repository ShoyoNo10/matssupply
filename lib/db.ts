import mongoose from "mongoose";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: Cached;
};

const cached: Cached = globalForMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI тохируулаагүй байна");
  }

  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ?? mongoose.connect(uri, { dbName: "barilga_web" });

  cached.conn = await cached.promise;
  return cached.conn;
}