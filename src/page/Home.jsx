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
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold">MD CONSULTING</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="font-medium hover:text-gray-600 transition">Home</button>
              <button onClick={() => scrollToSection('services')} className="font-medium hover:text-gray-600 transition">Services</button>
              <button onClick={() => scrollToSection('case-studies')} className="font-medium hover:text-gray-600 transition">Case Studies</button>
              <button onClick={() => scrollToSection('about')} className="font-medium hover:text-gray-600 transition">About</button>
              <button onClick={() => scrollToSection('contact')} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <button onClick={() => scrollToSection('home')} className="text-left font-medium">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-left font-medium">Services</button>
                <button onClick={() => scrollToSection('case-studies')} className="text-left font-medium">Case Studies</button>
                <button onClick={() => scrollToSection('about')} className="text-left font-medium">About</button>
                <button onClick={() => scrollToSection('contact')} className="bg-black text-white px-6 py-3 rounded">
                  Let's Talk
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

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

      {/* Case Studies with Testimonial Image */}
      <section id="case-studies" className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Real Results</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border-2 border-white p-8">
              <h3 className="text-2xl font-bold mb-4">Organic Essentials</h3>
              <div className="text-5xl font-bold mb-4 text-green-400">+65%</div>
              <p className="text-xl mb-6">Sales growth in 90 days</p>
              <div className="border-t border-gray-700 pt-6">
                <p className="italic mb-3">"They fixed our listings and ads – everything clicked."</p>
                <p className="text-gray-400">— Founder, Organic Essentials</p>
              </div>
            </div>

            <div className="border-2 border-white p-8">
              <h3 className="text-2xl font-bold mb-4">Zelo Electronics</h3>
              <div className="text-5xl font-bold mb-4 text-green-400">3x</div>
              <p className="text-xl mb-6">ROAS improvement</p>
              <div className="border-t border-gray-700 pt-6">
                <p className="italic mb-3">"We got clarity, structure, and growth – fast."</p>
                <p className="text-gray-400">— CEO, Zelo Electronics</p>
              </div>
            </div>
          </div>

          {/* Testimonial Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={testimonial} 
              alt="Client Testimonials" 
              className="w-full h-auto"
              style={{ filter: 'grayscale(100%) brightness(0.7)' }}
            />
          </div>
        </div>
      </section>

      {/* About with Image */}
      <About/>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Simple Plans for Every Seller</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-3xl font-bold mb-2">₹7,999<span className="text-lg font-normal">/mo</span></div>
              <p className="text-gray-600 mb-6">Perfect for new sellers</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Listing audit</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />2 SKUs setup</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Basic optimization</li>
              </ul>
              <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition">
                Get Started
              </button>
            </div>

            <div className="bg-black text-white border-2 border-black p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <div className="text-3xl font-bold mb-2">₹14,999<span className="text-lg font-normal">/mo</span></div>
              <p className="text-gray-300 mb-6">For scaling businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Ads management</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />A+ content creation</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Account optimization</li>
              </ul>
              <button className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition">
                Start Growing
              </button>
            </div>

            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">Custom</h3>
              <div className="text-3xl font-bold mb-2">Let's Talk</div>
              <p className="text-gray-600 mb-6">Tailored solutions</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Full service</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Dedicated manager</li>
                <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Custom integrations</li>
              </ul>
              <button onClick={() => scrollToSection('contact')} className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Grow Your Amazon Business</h2>
            <p className="text-xl text-gray-300">Drop your details – we'll reply with a free audit.</p>
          </div>
          <div className="bg-white text-black p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="border-2 border-gray-300 p-4 rounded" />
              <input type="email" placeholder="Email Address" className="border-2 border-gray-300 p-4 rounded" />
              <input type="tel" placeholder="WhatsApp Number" className="border-2 border-gray-300 p-4 rounded" />
              <input type="text" placeholder="Amazon Store URL" className="border-2 border-gray-300 p-4 rounded" />
            </div>
            <textarea placeholder="Tell us about your goals..." rows="4" className="w-full border-2 border-gray-300 p-4 rounded mt-6"></textarea>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition">
                Send & Let's Talk
              </button>
              <a href="https://wa.me/919876543210" className="flex-1 border-2 border-black py-4 rounded-lg font-semibold text-center hover:bg-black hover:text-white transition">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg font-semibold mb-4">© 2025 MD Consulting | Amazon Consulting Partner</p>
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="hover:text-gray-600 transition"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-gray-600 transition"><Youtube size={24} /></a>
            </div>
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition">Privacy Policy</a>
              <a href="#" className="hover:text-black transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}