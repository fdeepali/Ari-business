import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <button onClick={() => scrollToSection('home')}>
              <img 
                src={logo} 
                alt="Ari Business Network" 
                className="h-12 w-auto object-contain" 
              />
            </button>
            <span 
              className="text-xl font-bold hover:text-gray-600 transition cursor-pointer" 
              onClick={() => scrollToSection('home')}
            >
              ARI BUSINESS NETWORK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="font-medium hover:text-gray-600 transition">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="font-medium hover:text-gray-600 transition">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="font-medium hover:text-gray-600 transition">
              Services
            </button>
            <button onClick={() => scrollToSection('case-studies')} className="font-medium hover:text-gray-600 transition">
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('home')} className="w-full text-left font-medium hover:text-gray-600 transition">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="w-full text-left font-medium hover:text-gray-600 transition">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="w-full text-left font-medium hover:text-gray-600 transition">
                Services
              </button>
              <button onClick={() => scrollToSection('case-studies')} className="w-full text-left font-medium hover:text-gray-600 transition">
                Case Studies
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition">
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
