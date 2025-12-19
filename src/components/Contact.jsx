import React, { useState } from 'react';
import { Phone, Mail, MapPin, FileText, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.target);
    formData.append("access_key", "fcac1743-0e41-404a-bba1-70105e78370b");
    formData.append("subject", "New Contact Form Submission");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Your message has been sent! We'll contact you shortly.", {
          position: "top-center",
        });
        event.target.reset();
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-center",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
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

            {/* Business Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-3xl font-bold mb-8 text-white">Get In Touch</h3>

                <div className="space-y-6">
                  
                  {/* Business */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <FileText size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Business Details</h4>
                      <p className="text-gray-300">Ari Business Network</p>
                      <p className="text-gray-400 text-sm">GST: 27AAUHR8087C1ZG</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Our Location</h4>
                      <p className="text-gray-300 leading-relaxed">
                        244/246 Gayatri Niwas, 5th Floor, Flat 10<br />
                        Perin Nariman Street, Fort<br />
                        Mumbai - 400001
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email Us</h4>
                      <a href="mailto:info@aribusinessnetwork.com" className="text-gray-300 hover:text-yellow-400 transition">
                        info@aribusinessnetwork.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Call Us</h4>
                      <a href="tel:+919137696515" className="text-gray-300 hover:text-yellow-400 transition">
                        +91 91376 96515
                      </a>
                    </div>
                  </div>

                </div>

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="grid grid-cols-3 text-center gap-4">
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">24/7</p>
                      <p className="text-sm text-gray-400">Support</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">100+</p>
                      <p className="text-sm text-gray-400">Clients</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">₹50Cr+</p>
                      <p className="text-sm text-gray-400">Sales Managed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/919137696515"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="mr-3" />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:+919137696515"
                  className="flex items-center justify-center border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black py-4 px-6 rounded-xl font-semibold transition transform hover:scale-105"
                >
                  <Phone className="mr-3" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-gray-50 text-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-3">Free Strategy Session</h3>
                <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
              </div>

              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amazon Store / Social Media URL</label>
                    <input
                      type="text"
                      name="storeUrl"
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Business Goals *</label>
                  <textarea
                    name="goals"
                    rows="4"
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-yellow-500 resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center w-full py-4 px-8 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg transition transform hover:scale-105
                      ${loading ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}
                    `}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-6 w-6 mr-3 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="mr-3" size={20} />
                    )}

                    {loading ? "Sending..." : "Get Free Strategy Session"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4">Ready to transform your Amazon business?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@aribusinessnetwork.com"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition"
              >
                <Mail className="mr-2" size={20} />
                Email for Priority Support
              </a>

              <span className="text-gray-600 hidden sm:block">•</span>

              <a
                href="https://wa.me/919137696515"
                className="inline-flex items-center text-green-400 hover:text-green-300 font-semibold transition"
              >
                <MessageCircle className="mr-2" size={20} />
                Instant WhatsApp Response
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Contact;
