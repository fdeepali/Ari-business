import React from 'react'
import PartnerSlider from './PartnerSlider'

function WhyChooseUs() {
  return (
    <>
        <PartnerSlider/>
        <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Work With Us?</h2>
                    <p className="text-xl text-gray-600">Because we actually know how Amazon thinks.</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
                      <div className="text-5xl mb-4">⚡</div>
                      <h3 className="text-xl font-bold mb-3">Full-Stack Amazon Expertise</h3>
                      <p className="text-gray-600 group-hover:text-gray-300">From listings to logistics, we handle everything Amazon.</p>
                    </div>
                    <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
                      <div className="text-5xl mb-4">📊</div>
                      <h3 className="text-xl font-bold mb-3">Data-Driven PPC</h3>
                      <p className="text-gray-600 group-hover:text-gray-300">Results, not reports. We optimize for ROI, not vanity metrics.</p>
                    </div>
                    <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
                      <div className="text-5xl mb-4">🤝</div>
                      <h3 className="text-xl font-bold mb-3">Trusted by 20+ Brands</h3>
                      <p className="text-gray-600 group-hover:text-gray-300">Fast, flexible, and transparent. No fluff, just growth.</p>
                    </div>
                  </div>
                  <div className="text-center mt-10">
                    <button onClick={() => scrollToSection('case-studies')} className="text-lg font-semibold hover:underline">
                      See how we helped others →
                    </button>
                  </div>
                </div>
              </section>
    </>
  )
}

export default WhyChooseUs