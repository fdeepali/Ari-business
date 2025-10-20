import React, { useState, useEffect } from 'react';
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import h1 from '../assets/hero_slider1.webp';
import h2 from '../assets/hero_slider2.png';
import h3 from '../assets/hero_slider3.png';
import h4 from '../assets/hero_slider4.jpg';
import testimonial from '../assets/testimonials.webp';
import about from '../assets/about.jpg';
import PartnerSlider from '../components/PartnerSlider';

import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Contact from '../components/Contact';

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
      <section id="home" className="pt-20 relative">
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
          {/* Image Slider */}
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt={`Hero ${index + 1}`} 
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.4)' }}
              />
            </div>
          ))}

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-6xl mx-auto text-center px-6 text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                We help your Amazon store sell more. <span className="border-b-4 border-white">Fast.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto">
                Listings · Ads · Logistics – we manage the work so you can grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => scrollToSection('contact')} className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition">
                  Get a Free Audit
                </button>
                <a href="https://wa.me/919876543210" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition"
          >
            <ChevronRight className="text-white" size={32} />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About with Image */}
      <About/>

      {/* Why Choose Us */}
      
      <WhyChooseUs/>

      {/* Services with Image */}
      <Services/>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How We Work</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4">Audit</h3>
              <p className="text-gray-600 text-lg">We check your listings and identify opportunities for growth.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4">Plan</h3>
              <p className="text-gray-600 text-lg">We share a clear strategy tailored to your business goals.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold mb-4">Grow</h3>
              <p className="text-gray-600 text-lg">You sell more, we manage the rest. Simple as that.</p>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <Contact/>
    </div>
  );
}