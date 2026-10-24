import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch.js';

export default function Carts() {
  const [temporaryCart, setTemporaryCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [receipt, setReceipt] = useState(null);
  const [errorStatus, setErrorStatus] = useState('');
  const { post } = useFetch();

  useEffect(() => {
    const savedCart = localStorage.getItem('temp_cart');
    if (savedCart) {
      setTimeout(() => {
        setTemporaryCart(JSON.parse(savedCart));
      }, 0);
    }
  }, []);

  const adjustQty = (id, change) => {
    const updated = temporaryCart.map((item) => {
      if (item.id === id) {
        const nextQty = item.quantity + change;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }).filter((item) => item.quantity > 0);

    setTemporaryCart(updated);
    localStorage.setItem('temp_cart', JSON.stringify(updated));
  };

  const totalBelanja = temporaryCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const executePayment = async (e) => {
    e.preventDefault();
    setErrorStatus('');

    if (Number(amountPaid) < totalBelanja) {
      setErrorStatus('Uang tunai pembayaran tidak mencukupi total nominal belanja.');
      return;
    }

    try {
      const payload = {
        items: temporaryCart.map((item) => ({ product_id: item.id, quantity: item.quantity })),
        amount_paid: Number(amountPaid),
        payment_method: paymentMethod
      };

      const response = await post('/transactions/checkout', payload);

      if (response && (response.status === 'success' || response.success)) {
        setReceipt(response.data);
        localStorage.removeItem('temp_cart');
        setTemporaryCart([]);
      } else {
        setErrorStatus(response.message || 'Gagal mengeksekusi transaksi belanja ke server.');
      }
    } catch {
      setErrorStatus('Terjadi gangguan koneksi jaringan menuju server.');
    }
  };

  return (
    // PENGUBAHAN: Menambahkan kontainer pembungkus agar konten berada di tengah halaman secara horizontal dan vertikal
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="p-8 font-sans w-full max-w-xl bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">CART</h2>
        
        {errorStatus && <div className="p-3 bg-red-100 text-red-700 rounded mb-4 text-sm">{errorStatus}</div>}
        
        {receipt ? (
          <div className="border border-dashed border-gray-400 p-4 rounded-md bg-gray-50">
            <h3 className="text-center font-bold text-emerald-600 mb-2">TRANSAKSI SUKSES</h3>
            <p className="text-center text-xs text-gray-400 mb-4">{receipt.invoice_number}</p>
            <div className="text-sm space-y-2 mb-4">
              <div className="flex justify-between"><span>Total:</span> <strong>Rp {receipt.total_price ? receipt.total_price.toLocaleString() : totalBelanja.toLocaleString()}</strong></div>
              <div className="flex justify-between"><span>Bayar:</span> <span>Rp {receipt.amount_paid ? receipt.amount_paid.toLocaleString() : Number(amountPaid).toLocaleString()}</span></div>
              <div className="flex justify-between font-bold border-t pt-2"><span>Kembalian:</span> <span className="text-emerald-600">Rp {(receipt.amount_paid - receipt.total_price).toLocaleString()}</span></div>
            </div>
            <button onClick={() => setReceipt(null)} className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition cursor-pointer">Siap Terima Pelanggan Baru</button>
          </div>
        ) : temporaryCart.length === 0 ? (
          <p className="text-gray-500 text-center py-6">Belum ada item menu yang ditampung. Silakan pilih menu terlebih dahulu di halaman Produk.</p>
        ) : (
          <form onSubmit={executePayment}>
            <div className="space-y-3 mb-6">
              {temporaryCart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-400">Rp {item.price.toLocaleString()} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => adjustQty(item.id, -1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded font-bold">-</button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button type="button" onClick={() => adjustQty(item.id, 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total Biaya:</span>
                <span>Rp {totalBelanja.toLocaleString()}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Metode Bayar</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2 rounded bg-white">
                  <option value="cash">Tunai (Cash)</option>
                  <option value="cashless">Nontunai (Cashless)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nominal Pembayaran</label>
                <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} required placeholder="Masukkan nominal uang..." className="w-full border p-2 rounded" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition cursor-pointer mt-2">Konfirmasi & Eksekusi Pembayaran</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
