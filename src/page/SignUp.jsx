import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const err = {};
    if (name.trim() === '') err.name = 'Nama lengkap wajib diisi';
    if (email.trim() === '') err.email = 'Email wajib diisi';
    if (password.length < 6) err.password = 'Password minimal 6 karakter';
    setError(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    const pesanGagal = await onRegister(name, email, password);
    setLoading(false);

    if (pesanGagal) {
      setError({ umum: pesanGagal });
      return;
    }

    navigate('/login');
  }

  return (
    <div className="max-w-sm mx-auto py-20 font-sans">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Daftar Akun</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          {error.name && <p className="text-red-500 text-xs mt-1 px-1">{error.name}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          {error.email && <p className="text-red-500 text-xs mt-1 px-1">{error.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          {error.password && <p className="text-red-500 text-xs mt-1 px-1">{error.password}</p>}
        </div>

        {error.umum && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error.umum}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-5">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
