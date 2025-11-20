import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import ServicePage from './page/ServicePage';
import Preloader from './components/Preloader';
import AboutRahul from './components/AboutRahul';

function App() {
  const location = useLocation();

  // Show preloader only when on home page
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage ? (
        <Preloader>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<ServicePage />} />
            <Route path='/about-rahul' element={<AboutRahul />} />
          </Routes>
          <Footer />
        </Preloader>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<ServicePage />} />
            <Route path='/about-rahul' element={<AboutRahul />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
