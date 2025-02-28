import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <NavLink to='/' className="text-lg font-bold">
          Logo
        </NavLink>
      </div>

      <div className="hidden md:flex space-x-4">
        <NavLink to='/' className="hover:text-gray-300">Home</NavLink>
        <NavLink to='/pages/contact' className="hover:text-gray-300">Contact</NavLink>
        <NavLink to='/components/blog' className="hover:text-gray-300">Blog</NavLink>
        <NavLink to='/components/services' className="hover:text-gray-300">Services</NavLink>
        <NavLink to='auth/signup/user' className="hover:text-gray-300">Register</NavLink>
        <NavLink to='auth/login' className="hover:text-gray-300">Login</NavLink>
        <NavLink to='pages/discount' className="hover:text-gray-300">Discount</NavLink>
        <NavLink to='components/cart' className="hover:text-gray-300">Cart</NavLink>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 w-full bg-gray-800 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'} md:hidden`}>
        <div className="flex flex-col space-y-2 p-4">
          <NavLink to='/' onClick={toggleMenu} className="hover:text-gray-300">Home</NavLink>
          <NavLink to='/pages/contact' onClick={toggleMenu} className="hover:text-gray-300">Contact</NavLink>
          <NavLink to='/components/blog' onClick={toggleMenu} className="hover:text-gray-300">Blog</NavLink>
          <NavLink to='/components/services' onClick={toggleMenu} className="hover:text-gray-300">Services</NavLink>
          <NavLink to='auth/signup/user' onClick={toggleMenu} className="hover:text-gray-300">Register</NavLink>
          <NavLink to='auth/login' onClick={toggleMenu} className="hover:text-gray-300">Login</NavLink>
          <NavLink to='pages/discount' onClick={toggleMenu} className="hover:text-gray-300">Discount</NavLink>
          <NavLink to='components/cart' onClick={toggleMenu} className="hover:text-gray-300">Cart</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
