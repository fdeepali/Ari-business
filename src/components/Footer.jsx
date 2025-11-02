import React, { useState } from 'react';
import { Linkedin, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import PdfViewer from './PdfViewer';
import terms_of_use from '../assets/TERMS_OF_USE.pdf';
import privacy_policy from '../assets/PRIVACY_POLICY.pdf';

export function Footer() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <>
      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 py-14 px-6">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Brand Info */}
          <h2 className="text-3xl font-bold text-white mb-2">ARI BUSINESS NETWORK</h2>
          <p className="text-gray-400 mb-8">
            © 2025 ARI BUSINESS NETWORK | Amazon Consulting Partner
          </p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>+91 91376 96515</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>info@aribusinessnetwork.com</span>
            </div>
            <div className="flex items-center gap-2 text-center md:text-left max-w-md">
              <MapPin size={18} />
              <span>
                244/246 Gayatri Niwas, 5th Floor, Flat 10, Perin Nariman Street, Fort, Mumbai - 400001
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8 text-gray-400">
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

          {/* GST & Legal Links */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-500">
            <span>GST: 27AAUHR8087C1ZG</span>
            <button
              onClick={() => setSelectedPdf(privacy_policy)}
              className="hover:text-white transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setSelectedPdf(terms_of_use)}
              className="hover:text-white transition"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* PDF Modal */}
      {selectedPdf && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="relative bg-white rounded-2xl w-11/12 md:w-3/4 lg:w-2/3 h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              ✕ Close
            </button>

            <div className="h-full overflow-y-auto p-4">
              <PdfViewer file={selectedPdf} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
