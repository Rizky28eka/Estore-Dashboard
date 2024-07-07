// Menggunakan "use client" untuk menandakan penggunaan mode klien
"use client";

// Import komponen Loader untuk menampilkan indikator loading
import Loader from "@/components/custom ui/Loader";
// Import komponen ProductForm untuk menampilkan form produk
import ProductForm from "@/components/products/ProductForm";
// Mengimpor hooks useEffect dan useState dari React
import React, { useEffect, useState } from "react";

// Komponen ProductDetails untuk menampilkan detail produk berdasarkan productId
const ProductDetails = ({ params }: { params: { productId: string } }) => {
  // State untuk mengatur status loading
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan detail produk
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  // Fungsi async untuk mengambil detail produk dari API berdasarkan productId
  const getProductDetails = async () => {
    try {
      // Memanggil endpoint API untuk mendapatkan detail produk
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      // Memperbarui state productDetails dengan data yang diterima dari API
      setProductDetails(data);
      // Mengatur loading menjadi false setelah selesai mengambil data
      setLoading(false);
    } catch (err) {
      // Menangani error jika gagal mengambil detail produk
      console.log("[productId_GET]", err);
    }
  };

  // Menggunakan useEffect untuk memanggil getProductDetails() sekali saat komponen dimuat
  useEffect(() => {
    getProductDetails();
  }, []);

  // Mengembalikan Loader jika masih loading, atau ProductForm jika sudah selesai
  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

// Ekspor komponen ProductDetails agar dapat digunakan di tempat lain
export default ProductDetails;
