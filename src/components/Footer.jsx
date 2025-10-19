import React from 'react'
import { Linkedin, Twitter, Instagram, Facebook, Phone, Mail, MapPin, Youtube  } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mb-4">MD CONSULTING</div>
          <p className="text-lg font-semibold mb-6">© 2025 MD Consulting | Amazon Consulting Partner</p>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6 text-gray-600">
            <a href="tel:+919876543210" className="flex items-center justify-center gap-2 hover:text-black transition">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:hello@mdconsulting.com" className="flex items-center justify-center gap-2 hover:text-black transition">
              <Mail size={18} />
              <span>hello@mdconsulting.com</span>
            </a>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={18} />
              <span>Nashik, Maharashtra</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">
              <Linkedin size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">
              <Youtube size={24} />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <a href="#privacy" className="hover:text-black transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-black transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
