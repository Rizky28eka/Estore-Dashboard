// Mengimpor tipe Metadata dari Next.js
import type { Metadata } from "next";
// Mengimpor font Inter dari Google Fonts melalui Next.js
import { Inter } from "next/font/google";
// Mengimpor stylesheet global
import "../globals.css";
// Mengimpor ClerkProvider dari @clerk/nextjs untuk otentikasi
import { ClerkProvider } from "@clerk/nextjs";

// Menginisialisasi font Inter dengan subset karakter Latin
const inter = Inter({ subsets: ["latin"] });

// Mendefinisikan metadata untuk halaman web
export const metadata: Metadata = {
  title: "Estore - Admin Auth", // Judul halaman web
  description: "Admin dashboard to manage Estore's data", // Deskripsi halaman web
};

// Mendefinisikan fungsi RootLayout yang diekspor sebagai default export dari modul ini
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Menyediakan konteks ClerkProvider untuk otentikasi
    <ClerkProvider>
      {/* Elemen HTML utama */}
      <html lang='en'>
        {/* Elemen body dengan kelas font Inter */}
        <body className={inter.className}>
          {/* Menyertakan children yang diteruskan ke komponen ini */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
