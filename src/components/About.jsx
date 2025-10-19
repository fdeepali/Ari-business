import React from 'react'
import about from '../assets/about.jpg';
import profile_image from '../assets/pfp_rahul.jpeg'
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a team of eCommerce professionals obsessed with scaling Amazon brands through strategic consulting and FBA expertise.
            </p>
          </div>

          {/* About Image Banner */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <img 
              src={about} 
              alt="Our Team" 
              className="w-full h-64 md:h-96 object-cover"
              style={{ filter: 'grayscale(100%)' }}
            />
          </div>
          
          {/* Founder Spotlight */}
          <div className="bg-black text-white p-10 mb-12 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src={profile_image} 
                alt="Rahul Vanzara" 
                className="w-32 h-32 rounded-full object-cover flex-shrink-0 border-4 border-white"
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">Rahul Vanzara</h3>
                <p className="text-xl text-gray-300 mb-4">Founder, Ari Business Network</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Leading expert in Amazon FBA and global e-commerce expansion. Specializing in brand growth strategies, cross-border selling, IP protection, and tax compliance. Actively shares insights on Amazon selling strategies through Ari Business Network and social media platforms.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="https://www.instagram.com/ari_business_network/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/rahulv96?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border-2 border-black hover:bg-gray-50 transition">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2 text-center">Pinki Sharma</h3>
              <p className="text-gray-600 text-center mb-3">Strategy & Growth</p>
              <p className="text-sm text-gray-600 text-center">Expert in Amazon growth strategies and brand positioning</p>
            </div>
            <div className="p-8 border-2 border-black hover:bg-gray-50 transition">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2 text-center">Riddhi Vanzara</h3>
              <p className="text-gray-600 text-center mb-3">Seller Success & Operations</p>
              <p className="text-sm text-gray-600 text-center">Specialized in seller account management and operational excellence</p>
            </div>
          </div>

          {/* Credentials */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">In collaboration with</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="px-6 py-3 border-2 border-black rounded">
                <span className="font-bold">Ari Business Network</span>
              </div>
              <div className="px-6 py-3 border-2 border-black rounded">
                <span className="font-bold">Bombay Ad Cartel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About