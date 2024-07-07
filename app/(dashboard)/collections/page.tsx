// Menggunakan direktif "use client" untuk menunjukkan bahwa ini adalah komponen client-side
"use client";

// Mengimpor hook useEffect dan useState dari React
import { useEffect, useState } from "react";
// Mengimpor useRouter dari next/navigation untuk navigasi halaman
import { useRouter } from "next/navigation";
// Mengimpor ikon Plus dari lucide-react untuk tombol tambah
import { Plus } from "lucide-react";

// Mengimpor kolom dari CollectionColumns untuk digunakan dalam DataTable
import { columns } from "@/components/collections/CollectionColumns";
// Mengimpor komponen DataTable dari custom ui untuk menampilkan data dalam tabel
import { DataTable } from "@/components/custom ui/DataTable";
// Mengimpor komponen Button dari ui/button untuk membuat tombol
import { Button } from "@/components/ui/button";
// Mengimpor Separator dari ui/separator untuk memisahkan konten dalam UI
import { Separator } from "@/components/ui/separator";
// Mengimpor komponen Loader dari custom ui untuk menampilkan indikator loading
import Loader from "@/components/custom ui/Loader";

// Mendefinisikan komponen Collections sebagai fungsi komponen
const Collections = () => {
  const router = useRouter();

  // Menginisialisasi state untuk loading dan collections
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  // Mendapatkan daftar koleksi dari API
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  // Menggunakan useEffect untuk memanggil getCollections saat komponen pertama kali dirender
  useEffect(() => {
    getCollections();
  }, []);

  // Mengembalikan komponen Loader jika sedang dalam proses memuat data, atau konten koleksi jika data telah dimuat
  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Collections</p>
        {/* Tombol untuk membuat koleksi baru */}
        <Button
          className='bg-blue-1 text-white'
          onClick={() => router.push("/collections/new")}>
          <Plus className='h-4 w-4 mr-2' />
          Create Collection
        </Button>
      </div>
      {/* Separator untuk memisahkan bagian header dengan tabel */}
      <Separator className='bg-grey-1 my-4' />
      {/* DataTable untuk menampilkan data koleksi */}
      <DataTable columns={columns} data={collections} searchKey='title' />
    </div>
  );
};

// Mengekspor komponen Collections sebagai default export
export default Collections;
