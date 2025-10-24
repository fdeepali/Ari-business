import React from 'react';
import { Linkedin, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">ARI BUSINESS NETWORK</div>
          <p className="text-gray-300 mb-6">© 2025 ARI BUSINESS NETWORK | Amazon Consulting Partner</p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6 text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <Phone size={18} />
              <span>+91 91376 96515</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail size={18} />
              <span>info@aribusinessnetwork.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={18} />
              <span>244/246 Gayatri Niwas, 5th Floor, Flat 10, Perin Nariman Street, Fort, Mumbai - 400001</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6 text-gray-300">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Linkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Youtube size={24} />
            </a>
          </div>

          {/* GST & Legal */}
          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm text-gray-400">
            <span>GST: 27AAUHR8087C1ZG</span>
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
