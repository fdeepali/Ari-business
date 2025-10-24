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
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Catalog & Content Management */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-lg tracking-wide">PREMIUM CONTENT SERVICES</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Catalog & Content Management</h2>
              <p className="text-gray-600 text-xl mt-6 max-w-3xl mx-auto">Transform your product presence with stunning visuals and compelling content that converts browsers into buyers</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Professional Imaging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Captivate customers with stunning product photography that tells your brand's story. We maximize Amazon's 9-image slots with strategic visuals that highlight features, build trust, and drive conversions. Our images don't just show products—they sell them.
                </p>
                <div className="mt-6 flex items-center text-yellow-600 font-semibold">
                  <span>See examples</span>
                  <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Strategic Cataloging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dominate search results with expertly optimized listings. We craft compelling product descriptions, strategic keywords, and metadata that Amazon's algorithm loves. Watch your visibility soar as we transform ordinary listings into conversion machines.
                </p>
                <div className="mt-6 flex items-center text-yellow-600 font-semibold">
                  <span>View strategy</span>
                  <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Enhanced Brand Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build brand authority with A+ content that tells your unique story. We create immersive shopping experiences that differentiate your products, build customer loyalty, and command premium pricing. Stand out in a crowded marketplace.
                </p>
                <div className="mt-6 flex items-center text-yellow-600 font-semibold">
                  <span>Explore benefits</span>
                  <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Account & Advertising Management */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-lg tracking-wide">EXPERT ACCOUNT MANAGEMENT</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Account & Advertising Management</h2>
              <p className="text-gray-600 text-xl mt-6 max-w-3xl mx-auto">Maximize your Amazon potential with proactive account management and data-driven advertising strategies</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">360° Account Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sleep easy knowing your Amazon business is in expert hands. We provide comprehensive monitoring, strategic category placement, and proactive policy management to protect and grow your seller reputation.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    24/7 account monitoring
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Policy compliance assurance
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Performance optimization
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Advertising Optimization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Turn ad spend into profit with our sophisticated PPC strategies. We leverage advanced targeting, bid optimization, and performance analytics to maximize your return on advertising investment.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Advanced PPC campaigns
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    ROI-focused budgeting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Continuous optimization
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Check className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Rapid Account Reinstatement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Account suspended? Our dedicated legal team works around the clock to investigate issues and restore your account quickly. Minimize downtime and get back to selling faster.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    24/7 legal support
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Quick reinstatement
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={18} className="text-yellow-600 mr-2" />
                    Preventive guidance
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logistics & Fulfillment */}
          <div>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-lg tracking-wide">SEAMLESS LOGISTICS</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Logistics & Fulfillment</h2>
              <p className="text-gray-600 text-xl mt-6 max-w-3xl mx-auto">Streamline your supply chain with our end-to-end logistics solutions designed to save you time and money</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 mb-12">
              <p className="text-gray-700 text-xl leading-relaxed text-center">
                Worried about surplus inventory? We provide smart solutions to reposition and strategically sell through your stock. From optimized packaging that reduces shipping costs to leveraging our network of cost-effective logistics partners—we handle the complexities so you can focus on growth.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
                  <Package className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">FBA Preparation</h3>
                <p className="text-gray-600">
                  Perfectly prepared products for seamless Fulfillment by Amazon integration
                </p>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
                  <MapPin className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Domestic Shipping</h3>
                <p className="text-gray-600">
                  Optimized domestic logistics balancing speed, cost, and reliability
                </p>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
                  <Calculator className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">International Shipping</h3>
                <p className="text-gray-600">
                  Hassle-free cross-border logistics with customs expertise built-in
                </p>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
                  <Check className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Returns & Compliance</h3>
                <p className="text-gray-600">
                  Professional returns management and regulatory compliance assurance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-semibold text-lg tracking-wide">SIMPLE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">How We Drive Your Growth</h2>
            <p className="text-gray-300 text-xl mt-6 max-w-2xl mx-auto">Three simple steps to transform your Amazon business and accelerate your success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Comprehensive Audit</h3>
              <p className="text-gray-300 text-lg leading-relaxed">We conduct a deep-dive analysis of your listings, identifying hidden opportunities and immediate growth potential</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Custom Growth Plan</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Receive a tailored strategy with clear milestones, specific actions, and measurable goals for your business</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Accelerated Growth</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Watch your sales soar while we handle the day-to-day management, optimization, and scaling of your Amazon presence</p>
            </div>
          </div>
          <div className="text-center mt-16">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Growth Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* contact */}
      <Contact/>
    </div>
  );
}