import React from 'react'
import services from '../assets/services.png';
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

function Services() {
  return (
    <>
    <section id="services" className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
                <p className="text-xl text-gray-600">Simple. Focused. Results that scale your store.</p>
              </div>
    
              {/* Services Image Banner */}
              <div className="mb-12 rounded-lg overflow-hidden">
                <img 
                  src={services} 
                  alt="Our Services" 
                  className="w-full h-64 md:h-96 object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
    
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 border-2 border-black">
                  <Package size={40} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Catalog & Content</h3>
                  <p className="text-gray-700 mb-4">We optimize your titles, bullets, and A+ content so your listings convert.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />SEO-optimized product titles</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Compelling bullet points</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Premium A+ content design</li>
                  </ul>
                </div>
    
                <div className="bg-white p-8 border-2 border-black">
                  <BarChart3 size={40} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Advertising & Account Management</h3>
                  <p className="text-gray-700 mb-4">Lower ACoS, higher ROI – and your account stays healthy.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Sponsored Ads optimization</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Account health monitoring</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Performance analytics</li>
                  </ul>
                </div>
    
                <div className="bg-white p-8 border-2 border-black">
                  <Rocket size={40} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Logistics & Fulfillment</h3>
                  <p className="text-gray-700 mb-4">From FBA prep to returns – we help you stay compliant and profitable.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />FBA prep and shipment</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Inventory management</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Returns processing</li>
                  </ul>
                </div>
    
                <div className="bg-white p-8 border-2 border-black">
                  <Calculator size={40} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Accounting & Taxes</h3>
                  <p className="text-gray-700 mb-4">Tax filing and cross-border compliance made simple.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />GST and tax filing</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Cross-border compliance</li>
                    <li className="flex items-start gap-2"><Check size={20} className="flex-shrink-0 mt-1" />Financial reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
    
    </>
  )
}

export default Services