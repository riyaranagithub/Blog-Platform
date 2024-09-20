import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#624E88] text-white py-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Footer Content */}
        <div>
          <p className="text-lg font-semibold mb-2">Thank you for visiting our blog!</p>
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
