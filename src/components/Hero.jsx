function Hero() {
  const heroOnlineImg = "https://unsplash.com";

  return (
    <section
      className="flex items-center justify-start px-[50px] py-12 relative font-sans"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 45%, rgba(255, 255, 255, 0.3)), url(${heroOnlineImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "360px",
      }}
    >
      <div className="max-w-[550px] text-left">
        <span className="inline-block rounded-full bg-[#a52a2a] px-4 py-1 text-xs font-semibold text-white uppercase tracking-wider">
          Food & Beverage Kasir
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
          Sajikan Kelezatan Menu Terbaik dengan Pelayanan Kilat
        </h1>

        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          Mudahkan kasir dalam memproses setiap pesanan makanan utama, minuman segar, 
          hingga paket hemat pelanggan. Pantau ketersediaan stok bahan secara otomatis langsung dari layar kasir Anda.
        </p>
      </div>
    </section>
  );
}

export default Hero;
