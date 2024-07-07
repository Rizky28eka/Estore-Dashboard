// Import komponen DataTable dari lokasi tertentu
import { DataTable } from "@/components/custom ui/DataTable";
// Import kolom yang akan ditampilkan dari lokasi tertentu
import { columns } from "@/components/customers/CustomerColumns";
// Import komponen Separator untuk memisahkan antara elemen UI
import { Separator } from "@/components/ui/separator";
// Import model Customer dari direktori lib/models
import Customer from "@/lib/models/Customer";
// Import fungsi connectToDB dari direktori lib/mongoDB
import { connectToDB } from "@/lib/mongoDB";

// Komponen Customers yang berfungsi untuk menampilkan data pelanggan
const Customers = async () => {
  // Menghubungkan ke database sebelum mengambil data
  await connectToDB();

  // Mengambil daftar pelanggan dari database, diurutkan berdasarkan createdAt secara descending
  const customers = await Customer.find().sort({ createdAt: "desc" });

  // Mengembalikan tampilan halaman Customers dengan DataTable untuk menampilkan data pelanggan
  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      {/* Menggunakan komponen DataTable untuk menampilkan data pelanggan */}
      <DataTable columns={columns} data={customers} searchKey='name' />
    </div>
  );
};

// Ekspor konstanta dynamic untuk keperluan dinamis jika diperlukan
export const dynamic = "force-dynamic";

// Ekspor komponen Customers agar dapat digunakan di tempat lain
export default Customers;
