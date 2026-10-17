import { useEffect, useState } from 'react';
import Card from "../components/Card";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";

const getProductImage = (category_id, fallbackUrl) => {
  if (fallbackUrl && fallbackUrl.startsWith('http')) {
    return fallbackUrl;
  }
  
  switch (Number(category_id)) {
    case 1:
      return "https://unsplash.com";
    case 2:
      return "https://unsplash.com";
    case 3:
      return "https://unsplash.com";
    case 4:
      return "https://unsplash.com";
    case 5:
      return "https://unsplash.com";
    default:
      return "https://unsplash.com";
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
        
      } catch (err) {
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
    
    const matchesCategory = selectedCategory === "all" || String(product.category_id) === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium font-sans">Memuat daftar produk menu...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-medium font-sans">{error}</div>;

  return (
    <section id="products" className="py-12 px-4 md:px-12 bg-gray-50 min-h-screen font-sans flex flex-col items-center">
      <div className="w-full max-w-[1100px] mx-auto text-center flex flex-col items-center">
        <h2 className="text-[36px] font-bold text-gray-900 mb-[10px]">
          Daftar Menu Produk
        </h2>
        <p className="text-gray-500 mb-[40px] text-sm">
          Pilih hidangan lezat untuk ditambahkan ke pesanan pelanggan
        </p>

        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 mb-10 items-center justify-center">
          <input
            type="text"
            placeholder="🔍 Cari nama makanan atau minuman..."
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
        
        {filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center py-12 font-medium">
            Menu yang Anda cari tidak ditemukan. Silakan gunakan kata kunci lain.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[25px] w-full justify-center">
            {filteredProducts.map((product) => {
              const currentName = product.name || product.title || "Menu Makanan";
              const currentImg = getProductImage(product.category_id, product.image_url || product.image);
              
              return (
                <Card
                  key={product.id}
                  title={currentName}
                  image={currentImg}
                  imageAlt={currentName}
                  className="flex flex-col justify-between h-full border border-gray-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-2 text-left w-full mt-4">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-base font-extrabold text-red-700">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Stok: {product.stock}
                      </span>
                    </div>
                    
                    <Button
                      variant="primary"
                      className="w-full mt-2 font-medium py-2 text-xs flex items-center justify-center rounded-lg cursor-pointer bg-red-700 text-white hover:bg-red-800 transition-colors"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;
