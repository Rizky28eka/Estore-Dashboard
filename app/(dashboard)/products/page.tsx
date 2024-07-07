// Menggunakan "use client;" untuk menandakan penggunaan mode klien
"use client";

// Mengimpor useRouter dari next/navigation untuk navigasi halaman
import { useRouter } from "next/navigation";
// Mengimpor hooks useEffect dan useState dari React
import { useEffect, useState } from "react";
// Mengimpor komponen ikon Plus dari lucide-react
import { Plus } from "lucide-react";

// Mengimpor komponen Loader untuk menampilkan indikator loading
import Loader from "@/components/custom ui/Loader";
// Mengimpor komponen Button dari komponen UI
import { Button } from "@/components/ui/button";
// Mengimpor komponen Separator untuk memisahkan antara elemen UI
import { Separator } from "@/components/ui/separator";
// Mengimpor komponen DataTable dari komponen kustom
import { DataTable } from "@/components/custom ui/DataTable";
// Mengimpor kolom yang akan ditampilkan dari komponen products/ProductColumns
import { columns } from "@/components/products/ProductColumns";

// Komponen Products untuk menampilkan daftar produk
const Products = () => {
  // Menggunakan useRouter untuk mendapatkan objek router
  const router = useRouter();

  // State untuk mengatur status loading
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan data produk
  const [products, setProducts] = useState<ProductType[]>([]);

  // Fungsi async untuk mengambil data produk dari API
  const getProducts = async () => {
    try {
      // Memanggil endpoint API untuk mendapatkan data produk
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      // Memperbarui state products dengan data yang diterima dari API
      setProducts(data);
      // Mengatur loading menjadi false setelah selesai mengambil data
      setLoading(false);
    } catch (err) {
      // Menangani error jika gagal mengambil data produk
      console.log("[products_GET]", err);
    }
  };

  // Menggunakan useEffect untuk memanggil getProducts() sekali saat komponen dimuat
  useEffect(() => {
    getProducts();
  }, []);

  // Mengembalikan Loader jika masih loading, atau tampilan daftar produk jika sudah selesai
  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Products</p>
        {/* Tombol untuk membuat produk baru, mengarahkan ke halaman "/products/new" */}
        <Button
          className='bg-blue-1 text-white'
          onClick={() => router.push("/products/new")}>
          <Plus className='h-4 w-4 mr-2' />
          Create Product
        </Button>
      </div>
      <Separator className='bg-grey-1 my-4' />
      {/* Tabel untuk menampilkan daftar produk menggunakan komponen DataTable */}
      <DataTable columns={columns} data={products} searchKey='title' />
    </div>
  );
};

// Ekspor komponen Products agar dapat digunakan di tempat lain
export default Products;
