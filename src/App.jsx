import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import ServicePage from './page/ServicePage';
import Preloader from './components/Preloader';
import AboutRahul from './page/AboutRahul';
import BusinessSolutions from './page/BusinessSolutions';
import QuestionnairePage from './page/QuestionnairePage';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      {isHomePage && <Preloader />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<ServicePage />} />
        <Route path='/about-rahul' element={<AboutRahul />} />
        <Route path='/business-solutions' element={<BusinessSolutions />} />
        <Route path='/book-appointment' element={<QuestionnairePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
