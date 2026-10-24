import React from 'react';
import useFetch from "../hooks/useFetch.js";

function SalesReport() {
  const { data: apiResponse, loading, error } = useFetch('/transactions/reports');
  
  const reportData = apiResponse?.data || {};
  const bestSellers = reportData.best_selling_products || []; 
  const allProductsSold = reportData.all_products_sold || [];

  const totalRevenue = allProductsSold.reduce((sum, item) => sum + Number(item.total_revenue || 0), 0);
  const totalTransactions = reportData.total_transactions || 0;
  const averageValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const lowStock = reportData.low_stock_alerts || [];

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium">Memuat laporan penjualan...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-medium">Gagal memuat laporan: Akses Khusus Admin.</div>;

  return (
    <div className="w-full font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Penjualan Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau performa omzet keuangan dan performa transaksi tokomu secara real-time.</p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full uppercase tracking-wider">
          Mode Admin
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-sm font-medium text-gray-400 uppercase">Total Semua Pendapatan</div>
          <div className="text-2xl font-bold text-green-600 mt-2">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-sm font-medium text-gray-400 uppercase">Total Produk Terjual</div>
          <div className="text-2xl font-bold text-gray-900 mt-2">
            {totalTransactions} 
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-sm font-medium text-gray-400 uppercase">Rata-rata Nilai per Produk</div>
          <div className="text-2xl font-bold text-blue-600 mt-2">
            Rp {Math.round(averageValue).toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8">
          <h3 className="text-amber-800 font-bold text-sm uppercase tracking-wide mb-2">⚠️ Peringatan Stok Menipis</h3>
          <ul className="text-sm text-amber-700 list-disc list-inside space-y-1">
            {lowStock.map((item) => (
              <li key={item.id}>
                <span className="font-semibold">{item.name}</span> (Sisa Stok: <span className="font-bold text-red-600">{item.stock}</span>)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-800">
          🔥 5 Produk Paling Laris (Best Seller)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-medium">
                <th className="p-4 border-b border-gray-200">Nama Produk</th>
                <th className="p-4 border-b border-gray-200 text-center">Jumlah Terjual</th>
                <th className="p-4 border-b border-gray-200 text-right">Total Pendapatan Produk</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bestSellers.length > 0 ? (
                bestSellers.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.name}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.total_sold} porsi</td>
                    <td className="p-4 border-b border-gray-100 text-right font-semibold text-emerald-600">
                      Rp {Number(row.total_revenue).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-400">Belum ada rincian data best seller hari ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-slate-100/60 font-semibold text-gray-800">
          📋 Daftar Semua Produk Terjual (Summary Transaksi)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-medium">
                <th className="p-4 border-b border-gray-200">Nama Produk</th>
                <th className="p-4 border-b border-gray-200 text-center">Total Unit Terjual</th>
                <th className="p-4 border-b border-gray-200 text-right">Akumulasi Omzet</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {allProductsSold.length > 0 ? (
                allProductsSold.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.name}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.total_sold} porsi</td>
                    <td className="p-4 border-b border-gray-100 text-right font-semibold text-blue-600">
                      Rp {Number(row.total_revenue).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-400">Belum ada rincian transaksi produk terjual hari ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
