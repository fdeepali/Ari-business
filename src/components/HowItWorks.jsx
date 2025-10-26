import React from 'react'

function HowItWorks() {
  return (
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
  )
}

export default HowItWorks