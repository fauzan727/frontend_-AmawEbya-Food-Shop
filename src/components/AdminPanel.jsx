import { useState } from "react"
import useFetch from "../hooks/useFetch"
import SalesReport from "../page/SalesReport.jsx"

function AdminPanel() {
  const { data: productsData, loading: productsLoading, post, put, del } = useFetch("/products")
  const products = Array.isArray(productsData) ? productsData : (productsData?.products || [])

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [editId, setEditId] = useState(null)

  function resetForm() {
    setEditId(null)
    setTitle("")
    setPrice("")
    setDescription("")
    setCategory("")
    setImage("")
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !price || !category.trim()) {
      alert("Judul, harga, dan kategori wajib diisi!")
      return
    }

    const payload = {
      name: title,
      price: Number(price),
      description,
      category_id: Number(category),
      image_url: image || "https://fakestoreapi.com" 
    };

    try {
      if (editId) {
        await put(`/products/${editId}`, payload)
        alert(`Produk ID ${editId} berhasil diupdate!`)
      } else {
        await post("/products", payload)
        alert("Produk baru berhasil ditambahkan!")
      }
      resetForm()
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      alert("Gagal memproses data produk: " + errorObj.message)
    }
  }

  function startEdit(product) {
    setEditId(product.id)
    setTitle(product.name)
    setPrice(product.price)
    setDescription(product.description || "")
    setCategory(product.category_id)
    setImage(product.image_url || "")
  }

  async function handleDelete(id) {
    const confirmation = window.confirm("Yakin ingin menghapus produk ini?")
    if (!confirmation) return

    try {
      await del(`/products/${id}`);
      alert(`Produk ID ${id} berhasil dihapus!`)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      alert("Gagal menghapus produk: " + errorObj.message)
    }
  }

  return (
    <div className="space-y-12">
      <section>
        <SalesReport />
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6 border-t border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">
          Sistem Inventori Produk
        </h1>

        <div className="bg-white border border-gray-200 p-6 mb-10 shadow-sm rounded-none">
          <h2 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-wide">
            {editId ? `✏️ Edit Produk (ID: ${editId})` : "📦 Tambah Produk Baru"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Produk"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none text-sm"
              />
              <input
                type="number"
                placeholder="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none text-sm"
              />
              <input
                type="text"
                placeholder="ID Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none text-sm"
              />
              <input
                type="text"
                placeholder="URL Gambar Produk"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none text-sm"
              />
            </div>

            <textarea
              placeholder="Deskripsi Produk"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none text-sm w-full"
            ></textarea>

            <div className="flex gap-2">
              <button
                type="submit"
                className={`px-6 py-2.5 text-white font-medium text-sm rounded-none tracking-wide transition-colors ${
                  editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editId ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-sm rounded-none hover:bg-gray-300 cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
          Daftar Semua Produk ({products.length})
        </h2>

        {productsLoading ? (
          <div className="text-center py-10 font-medium text-gray-500 animate-pulse">
            Memuat daftar produk...
          </div>
        ) : (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 w-16">ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Info Produk</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 w-24">Harga</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-400">{p.id}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 object-contain bg-gray-50 p-1 border" />
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-blue-500 uppercase font-semibold">Kategori ID: {p.category_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-600">Rp {p.price}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => startEdit(p)}
                        className="text-blue-600 hover:underline mr-4 font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:underline font-medium cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminPanel;
