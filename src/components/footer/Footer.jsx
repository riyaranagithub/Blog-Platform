import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#624E88] text-white py-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Quick Links */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/all-posts" className="hover:text-gray-300">All Posts</Link></li>
            <li><Link to="/add-post" className="hover:text-gray-300">Add Post</Link></li>
           
          </ul>
        </div>

        {/* Footer Bottom */}
        <div>
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
