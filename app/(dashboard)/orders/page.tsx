// Menggunakan "use client" untuk menandakan penggunaan mode klien
"use client";

// Import komponen DataTable dari lokasi tertentu
import { DataTable } from "@/components/custom ui/DataTable";
// Import komponen Loader untuk menampilkan indikator loading
import Loader from "@/components/custom ui/Loader";
// Import kolom yang akan ditampilkan dari lokasi tertentu
import { columns } from "@/components/orders/OrderColumns";
// Import komponen Separator untuk memisahkan antara elemen UI
import { Separator } from "@/components/ui/separator";

// Mengimpor hooks useEffect dan useState dari React
import { useEffect, useState } from "react";

// Komponen Orders untuk menampilkan daftar pesanan
const Orders = () => {
  // State untuk mengatur status loading
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan data pesanan
  const [orders, setOrders] = useState([]);

  // Fungsi async untuk mengambil data pesanan dari API
  const getOrders = async () => {
    try {
      // Memanggil endpoint API untuk mendapatkan data pesanan
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      // Memperbarui state orders dengan data yang diterima dari API
      setOrders(data);
      // Mengatur loading menjadi false setelah selesai mengambil data
      setLoading(false);
    } catch (err) {
      // Menangani error jika gagal mengambil data pesanan
      console.log("[orders_GET", err);
    }
  };

  // Menggunakan useEffect untuk memanggil getOrders() sekali saat komponen dimuat
  useEffect(() => {
    getOrders();
  }, []);

  // Mengembalikan Loader jika masih loading, atau DataTable jika sudah selesai
  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Orders</p>
      <Separator className='bg-grey-1 my-5' />
      {/* Menggunakan komponen DataTable untuk menampilkan daftar pesanan */}
      <DataTable columns={columns} data={orders} searchKey='_id' />
    </div>
  );
};

// Ekspor konstanta dynamic untuk keperluan dinamis jika diperlukan
export const dynamic = "force-dynamic";

// Ekspor komponen Orders agar dapat digunakan di tempat lain
export default Orders;
