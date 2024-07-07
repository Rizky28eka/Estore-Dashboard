// Mengimpor connectToDB dari lib/mongoDB untuk koneksi ke MongoDB
import { connectToDB } from "@/lib/mongoDB";
// Mengimpor auth dari @clerk/nextjs untuk autentikasi Clerk
import { auth } from "@clerk/nextjs";
// Mengimpor NextRequest dan NextResponse dari next/server untuk handle request dan response
import { NextRequest, NextResponse } from "next/server";

// Mengimpor model Collection dari models untuk operasi MongoDB
import Collection from "@/lib/models/Collection";

// Handler untuk metode POST, membuat koleksi baru
export const POST = async (req: NextRequest) => {
  try {
    // Mendapatkan userId dari autentikasi Clerk
    const { userId } = auth();

    // Jika userId tidak ada, kembalikan response 403 Unauthorized
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Terhubung ke database MongoDB
    await connectToDB();

    // Mendapatkan data title, description, dan image dari body request
    const { title, description, image } = await req.json();

    // Mencari koleksi yang sudah ada berdasarkan judul
    const existingCollection = await Collection.findOne({ title });

    // Jika koleksi sudah ada, kembalikan response 400 Collection already exists
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    // Jika title atau image tidak ada, kembalikan response 400 Title and image are required
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    // Membuat koleksi baru menggunakan model Collection
    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    // Menyimpan koleksi baru
    await newCollection.save();

    // Mengembalikan response JSON dengan koleksi baru yang telah dibuat
    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Handler untuk metode GET, mengambil semua koleksi yang ada
export const GET = async (req: NextRequest) => {
  try {
    // Terhubung ke database MongoDB
    await connectToDB();

    // Mengambil semua koleksi dan diurutkan berdasarkan createdAt secara descending
    const collections = await Collection.find().sort({ createdAt: "desc" });

    // Mengembalikan response JSON dengan semua koleksi yang ditemukan
    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Ekspor variabel dynamic sebagai force-dynamic
export const dynamic = "force-dynamic";
