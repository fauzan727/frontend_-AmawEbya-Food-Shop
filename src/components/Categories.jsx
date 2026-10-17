import React from 'react';
import Card from "./Card";
import useFetch from "../hooks/useFetch.js";

const getCategoryImage = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('makanan')) return "https://unsplash.com";
  if (name.includes('dingin')) return "https://unsplash.com";
  if (name.includes('panas')) return "https://unsplash.com";
  if (name.includes('cemilan') || name.includes('dessert')) return "https://unsplash.com";
  return "https://unsplash.com";
};

function Categories() {
  const { data: apiResponse, loading, error } = useFetch('http://localhost:3000/api/categories');
  const categoriesList = apiResponse?.data || [];

  if (loading) return <div className="p-10 text-center text-gray-500">Memuat kategori menu...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Gagal memuat kategori: {error}</div>;

  return (
    <section id="categories" className="p-[50px] flex flex-col items-center bg-gray-50">
      <h2 className="text-[36px] font-bold text-gray-900 mb-[40px]">
        Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px] w-full max-w-[1200px] mx-auto">
        {categoriesList.map((category) => (
          <div key={category.id} className="h-full">
            <Card
              image={getCategoryImage(category.name)}
              title={category.name}
              description={`Lihat semua daftar menu hidangan ${category.name} di toko kami.`}
              className="categories-card h-full"
              imageAlt={`${category.name} Image`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
