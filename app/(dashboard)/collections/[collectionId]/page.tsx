// Menggunakan direktif "use client" untuk menunjukkan bahwa ini adalah komponen client-side
"use client";

// Mengimpor hook useEffect dan useState dari React
import { useEffect, useState } from "react";

// Mengimpor komponen Loader dari path yang sesuai
import Loader from "@/components/custom ui/Loader";
// Mengimpor komponen CollectionForm dari path yang sesuai
import CollectionForm from "@/components/collections/CollectionForm";

// Mendefinisikan tipe untuk parameter yang diterima oleh komponen
const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  // Menginisialisasi state untuk loading dan collectionDetails
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  // Mendefinisikan fungsi untuk mendapatkan detail koleksi dari API
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollectionDetails = async () => {
    try {
      // Mengirim permintaan GET ke API untuk mendapatkan detail koleksi berdasarkan collectionId
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      // Menyimpan data koleksi ke dalam state collectionDetails
      setCollectionDetails(data);
      // Mengubah status loading menjadi false
      setLoading(false);
    } catch (err) {
      // Menangani kesalahan jika permintaan gagal
      console.log("[collectionId_GET]", err);
    }
  };

  // Menggunakan useEffect untuk memanggil getCollectionDetails saat komponen pertama kali dirender
  useEffect(() => {
    getCollectionDetails();
  }, [getCollectionDetails]);

  // Mengembalikan komponen Loader jika sedang dalam proses memuat data, atau komponen CollectionForm jika data telah dimuat
  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

// Mengekspor komponen CollectionDetails sebagai default export
export default CollectionDetails;
