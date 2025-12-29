import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/auth/authSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/');
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-white flex items-center gap-2">
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Campus Diaries
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/ProfilePage" className="hover:text-purple-400 transition">Find Students</Link>
        <Link to="/about" className="hover:text-purple-400 transition">About</Link>
        <Link to="/post" className="hover:text-purple-400 transition">Posts</Link>
        {currentUser && (
          <Link to="/dashboard" className="hover:text-purple-400 transition">Dashboard</Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3 items-center">
        {currentUser ? (
          <>
            <span className="text-sm text-gray-300 hidden md:block">
              Welcome, {currentUser.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-sm text-white px-4 py-2 rounded-md transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
