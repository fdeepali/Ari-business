import React from 'react'
import { Phone, Mail, MapPin, FileText, MessageCircle, Send, ArrowRight } from 'lucide-react'

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-lg tracking-wide mb-4 block">READY TO GROW?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Let's Scale Your Amazon Business
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get your free strategy session and discover how we can help you dominate your category on Amazon
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Business Info - Enhanced */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
              <h3 className="text-3xl font-bold mb-8 text-white">Get In Touch</h3>
              
              <div className="space-y-6">
                {/* Company Info */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Business Details</h4>
                    <p className="text-gray-300">Ari Business Network</p>
                    <p className="text-gray-400 text-sm">GST: 27AAUHR8087C1ZG</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Our Location</h4>
                    <p className="text-gray-300 leading-relaxed">
                      244/246 Gayatri Niwas, 5th Floor, Flat 10<br />
                      Perin Nariman Street, Fort<br />
                      Mumbai - 400001
                    </p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                    <a href="mailto:info@aribusinessnetwork.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                      info@aribusinessnetwork.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Call Us</h4>
                    <a href="tel:+919137696515" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                      +91 91376 96515
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">100+</div>
                    <div className="text-sm text-gray-400">Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">₹50Cr+</div>
                    <div className="text-sm text-gray-400">Sales Managed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/919137696515" 
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <MessageCircle className="mr-3" size={20} />
                Chat on WhatsApp
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
              <a 
                href="tel:+919137696515" 
                className="flex items-center justify-center border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="mr-3" size={20} />
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form - Enhanced */}
          <div className="bg-gradient-to-br from-white to-gray-50 text-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-3 text-gray-900">Free Strategy Session</h3>
              <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 group-hover:border-gray-300"
                    required 
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 group-hover:border-gray-300"
                    required 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000" 
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 group-hover:border-gray-300"
                    required 
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amazon Store URL</label>
                  <input 
                    type="text" 
                    placeholder="Paste your store link" 
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 group-hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Business Goals *</label>
                <textarea 
                  placeholder="Tell us about your current Amazon performance and what you'd like to achieve..."
                  rows="4" 
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 group-hover:border-gray-300 resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex items-center justify-center flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <Send className="mr-3 group-hover:translate-x-1 transition-transform" size={20} />
                  Get Free Strategy Session
                </button>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6">
                We respect your privacy. Your information is 100% secure.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-4">Ready to transform your Amazon business?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@aribusinessnetwork.com" 
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              <Mail className="mr-2" size={20} />
              Email for Priority Support
            </a>
            <span className="text-gray-600 hidden sm:block">•</span>
            <a 
              href="https://wa.me/919137696515" 
              className="inline-flex items-center text-green-400 hover:text-green-300 font-semibold transition-colors duration-300"
            >
              <MessageCircle className="mr-2" size={20} />
              Instant WhatsApp Response
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact