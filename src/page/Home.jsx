import React, { useState, useEffect } from 'react';
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import h1 from '../assets/hero_slider1.webp';
import h2 from '../assets/hero_slider2.png';
import h3 from '../assets/hero_slider3.png';
import h4 from '../assets/hero_slider4.jpg';

import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Contact from '../components/Contact';
import HeroSection from '../components/HeroSection';
import CatalogManagement from '../components/CatalogManagement';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [h1, h2, h3, h4];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      

      {/* Hero Section with Image Slider */}
      <HeroSection/>

      {/* About with Image */}
      <div className='-mt-1'>
        <About/>
      </div>     

      {/* Why Choose Us */}
      <WhyChooseUs/>

      {/* Services with Image */}
      <Services/>

      {/* Detailed Services Section */}
      <CatalogManagement/>

      {/* How It Works */}
      <HowItWorks id='how-it-works'/>

      {/* contact */}
      <Contact/>
    </div>
  );
}