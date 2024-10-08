import React from 'react';
import { LogoutBtn } from '../index'; 
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link

function Header() {
  console.log("header is rendered");
  const authStatus = useSelector((state) => state.auth.status); // Get auth status from Redux store
  
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus
    },
    {
      name: "Sign Up", 
      url: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts", 
      url: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus
    },
    {
      name: "User Post",
      url: "/user-post",
      active: authStatus
    }
  ];

  return (
    <header className="bg-[#030637] text-white sticky top-0 z-50 shadow-md font-poppins">
      <nav className="container mx-auto px-3 py-4 flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Blog Vibe
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <Link 
                  to={item.url} 
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ) : null
          )}
        </ul>

        {/* Logout Button */}
        {authStatus && (
          <div className="bg-[#AD49E1] hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            <LogoutBtn />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
