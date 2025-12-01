import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDetailPage =
    location.pathname === '/services' ||
    location.pathname === '/about-rahul' ||
    location.pathname === '/book-appointment' ||
    location.pathname === '/business-solutions';

  const underlineClass =
    "cursor-pointer relative after:absolute after:left-0 after:bottom-0 after:w-0 " +
    "after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const offset = 80;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleScrollOrNavigate = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 200);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer">
            <button onClick={() => handleScrollOrNavigate('home')}>
              <img src={logo} alt="" className="h-12 w-auto object-contain" />
            </button>

            <span
              className={`text-xl font-bold hover:text-gray-600 transition ${underlineClass}`}
              onClick={() => handleScrollOrNavigate('home')}
            >
              ARI BUSINESS NETWORK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {isDetailPage ? (
              <button
                onClick={() => navigate('/')}
                className={`font-medium hover:text-gray-600 transition ${underlineClass}`}
              >
                Home
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/')}
                  className={`font-medium hover:text-gray-600 transition ${underlineClass}`}
                >
                  Home
                </button>

                <button
                  onClick={() => handleScrollOrNavigate('about')}
                  className={`font-medium hover:text-gray-600 transition ${underlineClass}`}
                >
                  About
                </button>

                <button
                  onClick={() => handleScrollOrNavigate('services')}
                  className={`font-medium hover:text-gray-600 transition ${underlineClass}`}
                >
                  Services
                </button>

                <button
                  onClick={() => handleScrollOrNavigate('catalog')}
                  className={`font-medium hover:text-gray-600 transition ${underlineClass}`}
                >
                  Catalog & Content
                </button>

                <button
                  onClick={() => handleScrollOrNavigate('contact')}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold cursor-pointer"
                >
                  Let's Talk
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">

              {isDetailPage ? (
                <button
                  onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left font-medium hover:text-gray-600 transition ${underlineClass}`}
                >
                  Home
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/');
                      setIsOpen(false);
                    }}
                    className={`w-full text-left font-medium hover:text-gray-600 transition ${underlineClass}`}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => handleScrollOrNavigate('about')}
                    className={`w-full text-left font-medium hover:text-gray-600 transition ${underlineClass}`}
                  >
                    About
                  </button>

                  <button
                    onClick={() => handleScrollOrNavigate('services')}
                    className={`w-full text-left font-medium hover:text-gray-600 transition ${underlineClass}`}
                  >
                    Services
                  </button>

                  <button
                    onClick={() => handleScrollOrNavigate('catalog')}
                    className={`w-full text-left font-medium hover:text-gray-600 transition ${underlineClass}`}
                  >
                    Catalog & Content
                  </button>

                  <button
                    onClick={() => handleScrollOrNavigate('contact')}
                    className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition cursor-pointer"
                  >
                    Let's Talk
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
