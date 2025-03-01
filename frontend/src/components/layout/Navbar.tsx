import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TicketCheck, LogOut, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold flex items-center">
            <TicketCheck className="mr-2" size={24} />
            <span>Support Ticket System</span>
          </Link>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <div className="mr-4 flex items-center">
                  <User className="mr-1" size={16} />
                  <span className="text-sm">
                    {user?.name} ({user?.role})
                  </span>
                </div>
                
                {user?.role === 'admin' ? (
                  <Link 
                    to="/admin" 
                    className="px-3 py-2 rounded hover:bg-indigo-700 mr-2 transition duration-150"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/dashboard" 
                    className="px-3 py-2 rounded hover:bg-indigo-700 mr-2 transition duration-150"
                  >
                    My Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded bg-red-600 hover:bg-red-700 transition duration-150"
                >
                  <LogOut className="mr-1" size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded hover:bg-indigo-700 mr-2 transition duration-150"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;