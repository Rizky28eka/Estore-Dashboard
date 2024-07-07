// Mengimpor komponen SignUp dari @clerk/nextjs
import { SignUp } from "@clerk/nextjs";

// Mendefinisikan fungsi Page sebagai komponen default yang akan diekspor
export default function Page() {
  // Mengembalikan elemen JSX yang akan dirender oleh React
  return (
    // Membuat div dengan kelas CSS untuk memenuhi layar (h-screen) dan
    // mengatur posisi konten di tengah layar secara horizontal dan vertikal
    <div className='h-screen flex justify-center items-center'>
      {/* Menampilkan komponen SignUp di dalam div */}
      <SignUp />
    </div>
  );
}
