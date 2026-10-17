import logo from "../image/logo.jpeg";
import { NavLink } from "react-router-dom";

const style = ({ isActive }) => {
  const base = 'font-normal no-underline transition-colors hover:text-gray-200 text-sm';
  return isActive ? `${base} text-white font-medium underline underline-offset-4` : `${base} text-gray-300`;
};

function Navbar({ user, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#a52a2a] px-[50px] py-[20px] border-b border-black font-sans">
      <div className="flex items-center gap-[10px] text-[18px] font-bold text-white">
        <img className="h-[50px] w-[50px] object-contain rounded" src={logo} alt="Tech Market logo" />
        AmawEbya <span className="font-normal">Food Shop</span>
      </div>

      <div className="flex items-center gap-6 justify-self-center">
        <NavLink to="/dashboard" className={style}>dashboard</NavLink>
        <NavLink to="/products" className={style}>product</NavLink>
        <NavLink to="/carts" className={style}>cart</NavLink>
        {user && <NavLink to="/users" className={style}>Users</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin" className={style}>Admin</NavLink>}
      </div>

      <span className="flex items-center gap-4 justify-self-end">
        {user ? (
          <>
            <span className="text-sm text-gray-100">
              {user.email} <span className="text-xs text-gray-300">({user.role})</span>
            </span>
            <button 
              onClick={onLogout} 
              className="px-4 py-2 text-sm font-medium bg-white text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={style}>Login</NavLink>
        )}
      </span>
    </nav>
  );
}

export default Navbar;
