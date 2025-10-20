import React from 'react'

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
        <p className="text-xl text-gray-300">Send us a message or use the details below to connect with us.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
        {/* Business Info */}
        <div className="space-y-6">
            <div>
            <h3 className="text-2xl font-bold mb-2">Business Name</h3>
            <p className="text-gray-300">Ari Business Network</p>
            </div>
            <div>
            <h3 className="text-2xl font-bold mb-2">GST</h3>
            <p className="text-gray-300">27AAUHR8087C1ZG</p>
            </div>
            <div>
            <h3 className="text-2xl font-bold mb-2">Address</h3>
            <p className="text-gray-300">244/246 Gayatri Niwas, 5th Floor, Flat 10, Perin Nariman Street, Fort, Mumbai - 400001</p>
            </div>
            <div>
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-gray-300">info@aribusinessnetwork.com</p>
            </div>
            <div>
            <h3 className="text-2xl font-bold mb-2">Phone</h3>
            <p className="text-gray-300">+91 91376 96515</p>
            </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
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
            <a href="https://wa.me/919137696515" className="flex-1 border-2 border-black py-4 rounded-lg font-semibold text-center hover:bg-black hover:text-white transition">
                Chat on WhatsApp
            </a>
            </div>
        </div>
        </div>
    </div>
    </section>

  )
}

export default Contact