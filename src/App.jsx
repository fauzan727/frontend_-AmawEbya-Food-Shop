import './App.css';
import Navbar from './page/Navbar';
import Dashboard from './page/Dashboard';
import Product from './page/Product';
import Carts from './page/Carts';
import Login from './page/Login';
import { Routes, Route } from 'react-router-dom';
import Users from './page/user';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useState } from 'react';
import useFetch from './hooks/useFetch.js';
import RoleRroute from "./components/RoleRoute";
import AdminPanel from './components/AdminPanel.jsx';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const { post } = useFetch();

  async function login(email, password) {
    try {
      const res = await post('/auth/login', { email, password });

      if (!res || res.success === false) {
        return res?.message || 'Email atau password salah';
      }

      const loginData = res.data;
      
      const userData = {
        id: loginData.user.id,
        name: loginData.user.name,
        email: loginData.user.email,
        role: loginData.user.role,
        token: loginData.token
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', loginData.token);
      return null;

    } catch (err) {
      return 'Gagal terhubung ke server backend';
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return (
    <>
      <Navbar user={user} onLogout={logout}/>
      
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/carts" element={<Carts />} />
          
          <Route path='/users'
            element={
              <ProtectedRoute user={user}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route path="/admin"
            element={
              <ProtectedRoute user={user}>
                <RoleRroute role={user?.role} izin="admin">
                  <AdminPanel />
                </RoleRroute>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login onLogin={login} /> } />
          
          <Route path="*" element={
            <h1 className="text-center text-2xl font-bold text-gray-800 py-20">
              404 - Halaman Tidak Ditemukan
            </h1>
          } />
        </Routes>
      </main>
    </>
  );
}

export default App;
