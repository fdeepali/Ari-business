import React, { useState, useEffect } from 'react';
import {
  Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin,
  Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText,
  Calculator, Instagram, ChevronLeft, ChevronRight
} from 'lucide-react';

import h1 from '../assets/hero_slider1.webp';
import h2 from '../assets/hero_slider2.png';
import h3 from '../assets/hero_slider3.png';
import h4 from '../assets/hero_slider4.jpg';

import HeroSection from '../components/HeroSection';
import PartnerSlider from '../components/PartnerSlider';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import CatalogManagement from '../components/CatalogManagement';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import CrossBorderSellerQuestionnaire from '../components/CrossBorderSellerQuestionnaire';
import ServicesSummary from '../components/ServicesSummary';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [h1, h2, h3, h4];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero / Landing Section */}
      <HeroSection />

      {/* Partner Companies */}
      <PartnerSlider />

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services */}
      <ServicesSummary />

      {/* Catalog Management */}
      <CatalogManagement />

      {/* How It Works */}
      <HowItWorks id="how-it-works" />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
