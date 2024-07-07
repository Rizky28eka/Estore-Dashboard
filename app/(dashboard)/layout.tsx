// Mengimpor type Metadata dari "next" untuk metadata halaman
import type { Metadata } from "next";
// Mengimpor Inter dari "next/font/google" untuk font Inter
import { Inter } from "next/font/google";
// Mengimpor file CSS global untuk styling global
import "../globals.css";
// Mengimpor ClerkProvider dari "@clerk/nextjs" untuk integrasi Clerk
import { ClerkProvider } from "@clerk/nextjs";

// Mengimpor komponen LeftSideBar dari layout
import LeftSideBar from "@/components/layout/LeftSideBar";
// Mengimpor komponen TopBar dari layout
import TopBar from "@/components/layout/TopBar";
// Mengimpor ToasterProvider dari lib/ToasterProvider untuk manajemen pesan
import { ToasterProvider } from "@/lib/ToasterProvider";

// Mengatur font Inter dengan subset Latin
const inter = Inter({ subsets: ["latin"] });

// Metadata halaman untuk deskripsi admin dashboard
export const metadata: Metadata = {
  title: "Estore - Admin Dashboard",
  description: "Admin dashboard to manage Estore's data",
};

// Komponen RootLayout untuk menyusun layout utama halaman
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Provider ClerkProvider untuk integrasi Clerk
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          {/* Provider ToasterProvider untuk manajemen pesan */}
          <ToasterProvider />
          <div className='flex max-lg:flex-col text-grey-1'>
            {/* Komponen LeftSideBar untuk sidebar */}
            <LeftSideBar />
            {/* Komponen TopBar untuk navigasi atas */}
            <TopBar />
            {/* Konten utama yang ditampilkan */}
            <div className='flex-1'>{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
