import Button from "./Button";

function Feature() {
  const featuredFoodImg = "https://unsplash.com";

  const handleMoreClick = () => {
    console.log("Tombol selengkapnya menu andalan diklik");
  };

  return (
    <section className="p-[50px] max-w-[1200px] mx-auto font-sans">
      <div className="block text-[2rem] font-bold text-gray-900 mb-[25px]">
        Menu Andalan Hari Ini
      </div>
      <div className="flex flex-col md:flex-row items-center gap-[40px] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <img
          src={featuredFoodImg}
          alt="Nasi Goreng Ayam Spesial"
          className="w-full md:w-[350px] h-[220px] rounded-[15px] object-cover shadow-sm"
        />
        <div className="flex flex-col gap-[15px] items-start text-left">
          <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-md">
            TERLARIS ★ 4.9
          </span>
          <h2 className="text-[1.8rem] font-bold text-gray-900">
            Nasi Goreng Ayam Spesial
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm">
            Nikmati kombinasi nasi goreng bumbu rempah otentik khas Tech Market, 
            disajikan lengkap dengan potongan ayam gurih, telur mata sapi telur segar, dan kerupuk renyah. 
            Menu favorit pelanggan yang wajib dicoba!
          </p>
          <div className="text-xl font-extrabold text-red-700 mb-1">
            Rp 28.000
          </div>
          <Button variant="primary" onClick={handleMoreClick}>
            Lihat Detail Menu
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Feature;
