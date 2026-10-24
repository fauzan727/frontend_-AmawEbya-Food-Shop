import React from "react"
import SalesReport from "../page/SalesReport.jsx"

function AdminPanel() {
  // Semua state, fungsi handleSubmit, startEdit, handleDelete, dan hook useFetch untuk produk telah dihapus total.
  // File ini sekarang murni menjadi pembungkus layout yang rapi di tengah halaman.

  return (
    // PEMBUNGKUS UTAMA: Menjamin seluruh halaman laporan admin berada tepat di TENGAH
    <div className="w-full flex justify-center bg-gray-50 min-h-screen py-8">
      
      {/* KONTAINER INTERNAL: Membawa konten laporan penjualan agar pas di lebar maksimal 1200px secara simetris */}
      <div className="w-full max-w-[1200px] px-4 sm:px-6">
        
        {/* Menampilkan Laporan Penjualan (Summary Card, Tabel Best Seller, & Tabel Semua Produk Terjual) */}
        <section className="w-full">
          <SalesReport />
        </section>

      </div>
    </div>
  );
}

export default AdminPanel;
