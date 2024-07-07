// Mengimpor NextRequest dan NextResponse dari next/server untuk handle request dan response
import { NextRequest, NextResponse } from "next/server";
// Mengimpor auth dari @clerk/nextjs untuk autentikasi Clerk
import { auth } from "@clerk/nextjs";

// Mengimpor connectToDB dari lib/mongoDB untuk koneksi ke MongoDB
import { connectToDB } from "@/lib/mongoDB";
// Mengimpor Collection dan Product dari models untuk model MongoDB
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

// Handler untuk metode GET, mengambil koleksi berdasarkan ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // Terhubung ke database MongoDB
    await connectToDB();

    // Mengambil koleksi berdasarkan ID dan populate dengan produk terkait
    const collection = await Collection.findById(params.collectionId).populate({ path: "products", model: Product });

    // Jika koleksi tidak ditemukan, kembalikan response 404
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    // Mengembalikan response JSON dengan koleksi yang ditemukan
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler untuk metode POST, memperbarui koleksi berdasarkan ID
export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // Mendapatkan userId dari autentikasi Clerk
    const { userId } = auth();

    // Jika userId tidak ada, kembalikan response 401 Unauthorized
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Terhubung ke database MongoDB
    await connectToDB();

    // Mengambil koleksi berdasarkan ID
    let collection = await Collection.findById(params.collectionId);

    // Jika koleksi tidak ditemukan, kembalikan response 404
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    // Mendapatkan data title, description, dan image dari body request
    const { title, description, image } = await req.json();

    // Jika title atau image tidak ada, kembalikan response 400
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    // Memperbarui koleksi dengan data baru
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    // Menyimpan perubahan koleksi
    await collection.save();

    // Mengembalikan response JSON dengan koleksi yang diperbarui
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan
    console.log("[collectionId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler untuk metode DELETE, menghapus koleksi berdasarkan ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // Mendapatkan userId dari autentikasi Clerk
    const { userId } = auth();

    // Jika userId tidak ada, kembalikan response 401 Unauthorized
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Terhubung ke database MongoDB
    await connectToDB();

    // Menghapus koleksi berdasarkan ID
    await Collection.findByIdAndDelete(params.collectionId);

    // Mengupdate produk yang terhubung dengan koleksi yang dihapus
    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );
    
    // Mengembalikan response 200 Collection is deleted
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Ekspor variabel dynamic sebagai force-dynamic
export const dynamic = "force-dynamic";
