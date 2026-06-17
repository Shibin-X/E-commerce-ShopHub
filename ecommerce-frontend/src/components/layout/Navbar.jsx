import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, LayoutDashboard, LogOut, LogIn, UserPlus, Menu, X, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function Navbar() {
  const { isAuthenticated, isAdmin, isCustomer, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/products" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        Products
      </NavLink>
      {isCustomer && (
        <>
          <NavLink to="/cart" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            <ShoppingCart className="h-4 w-4" />
            Cart
          </NavLink>
          <NavLink to="/orders" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            <Package className="h-4 w-4" />
            My Orders
          </NavLink>
        </>
      )}
      {isAdmin && (
        <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileOpen(false)}>
          <LayoutDashboard className="h-4 w-4" />
          Admin Panel
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
          <Store className="h-6 w-6" />
          ShopHub
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, <span className="font-medium text-gray-900">{user?.name}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">{links}</div>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            {isAuthenticated ? (
              <>
                <p className="px-3 text-sm text-gray-600">Signed in as {user?.name}</p>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
