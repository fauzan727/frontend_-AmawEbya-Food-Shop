import { useEffect, useState } from 'react';
import Card from "../components/Card";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";

const getProductImage = (category_id, fallbackUrl) => {
  if (fallbackUrl && fallbackUrl.startsWith('http')) {
    return fallbackUrl;
  }
  switch (Number(category_id)) {
    case 1: return "https://unsplash.com";
    case 2: return "https://unsplash.com";
    case 3: return "https://unsplash.com";
    case 4: return "https://unsplash.com";
    case 5: return "https://unsplash.com";
    default: return "https://unsplash.com";
  }
};

function Product() {
  const { get } = useFetch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function initPageData() {
      try {
        setLoading(true);
        const resProducts = await get('/products');
        if (resProducts && (resProducts.success || resProducts.status === 'success' || Array.isArray(resProducts.data))) {
          setProducts(resProducts.data || []);
        }
        const resCategories = await get('/categories');
        if (resCategories && (resCategories.success || resCategories.status === 'success' || Array.isArray(resCategories.data))) {
          setCategories(resCategories.data || []);
        }
      } catch {
        setError('Gagal terhubung ke server backend.');
      } finally {
        setLoading(false);
      }
    }
    initPageData();
  }, [get]);

  const handleAddToCart = (product) => {
    const productName = product.name || product.title || "Menu Makanan";
    const existingCart = JSON.parse(localStorage.getItem('temp_cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      if (existingCart[existingItemIndex].quantity < product.stock) {
        existingCart[existingItemIndex].quantity += 1;
        alert(`${productName} ditambahkan lagi ke keranjang!`);
      } else {
        alert(`Batas maksimum pembelian tercapai. Stok tersisa: ${product.stock}`);
        return;
      }
    } else {
      existingCart.push({
        id: product.id,
        name: productName,
        price: product.price,
        image_url: getProductImage(product.category_id, product.image_url || product.image),
        quantity: 1,
        stock: product.stock
      });
      alert(`${productName} berhasil masuk keranjang!`);
    }

    localStorage.setItem('temp_cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
  };

  const filteredProducts = products.filter((product) => {
    const productName = (product.name || product.title || "").toLowerCase();
    const matchesSearch = productName.includes(searchQuery.toLowerCase());
    const productCategoryId = product.category_id || (product.category && product.category.id) || product.category;
    const matchesCategory = selectedCategory === "all" || (productCategoryId !== undefined && String(productCategoryId).trim() === String(selectedCategory).trim());
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium font-sans">Memuat daftar produk menu...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-medium font-sans">{error}</div>;

  return (
    <section id="products" className="py-12 bg-gray-50 min-h-screen font-sans flex flex-col items-center">
      
      {/* 1. BAGIAN FILTER (Di luar kotak merah) */}
      <div className="w-full max-w-[1100px] mx-auto text-center flex flex-col items-center px-4">
        <h2 className="text-[36px] font-bold text-gray-900 mb-[10px]">
          Daftar Menu Produk
        </h2>
        <p className="text-gray-500 mb-[40px] text-sm">
          Pilih hidangan lezat untuk ditambahkan ke pesanan pelanggan
        </p>

        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 mb-10 items-center justify-center">
          <input
            type="text"
            placeholder="Cari nama makanan atau minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm shadow-sm"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm shadow-sm cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* JARAK NYATA MINIMAL 1 BARIS ANTARA FILTER DAN KOTAK MERAH */}
      <div className="h-8 w-full"></div>

      {/* 2. KOTAK MERAH BESAR (Wadah Utama Pembungkus Grid Card) */}
      <div className="w-full max-w-[1100px] mx-auto bg-[#a52a2a] rounded-2xl shadow-sm p-12 md:p-16 min-h-[550px] flex flex-col justify-start box-border">
        
        {filteredProducts.length === 0 ? (
          <div className="text-gray-200 text-center py-12 font-medium mx-auto">
            Menu yang Anda cari tidak ditemukan. Silakan gunakan kata kunci lain.
          </div>
        ) : (
          
          /* 3. GRID UTAMA (Sistem penataan Card Produk agar sejajar rapi) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[25px] w-full">
            {filteredProducts.map((product) => {
              const currentName = product.name || product.title || "Menu Makanan";
              const currentImg = getProductImage(product.category_id, product.image_url || product.image);

              return (
                <Card
                  key={product.id}
                  title={currentName}
                  image={currentImg}
                  imageAlt={currentName}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center w-full mt-2">
                    <div className="flex flex-col gap-1">
                      <span className={`w-fit text-[11px] px-2 py-0.5 rounded font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Stok: {product.stock}
                      </span>
                      <span className="text-base font-extrabold text-red-700">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      className="w-10 h-10 font-bold text-lg flex items-center justify-center rounded-none cursor-pointer bg-red-700 text-white hover:bg-red-800 transition-colors"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? '+' : '×'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          
        )}
        
      </div> {/* Akhir Kotak Merah Besar */}
    </section>
  );
}

export default Product;
