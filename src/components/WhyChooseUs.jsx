import React from 'react'
import PartnerSlider from './PartnerSlider'

function WhyChooseUs() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PartnerSlider />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete Amazon Expertise Under One Roof. Stop juggling multiple vendors and consultants. ARI Business Network provides every service you need to succeed on Amazon—from onboarding to daily operations, compliance, and growth strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Full-Stack Amazon Expertise</h3>
              <p className="text-gray-600 group-hover:text-gray-300">
                We handle everything Amazon—onboarding, operations, compliance, and growth strategies—all under one roof.
              </p>
            </div>

            <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-3">We Speak Amazon Fluently</h3>
              <p className="text-gray-600 group-hover:text-gray-300">
                Amazon policies evolve constantly. Our team stays ahead of updates so your business never misses a beat or faces unexpected suspensions.
              </p>
            </div>

            <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition group">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-gray-600 group-hover:text-gray-300">
                We’ve helped countless sellers navigate Amazon—from launching new brands to reinstating suspended accounts—across every category and challenge.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => scrollToSection('case-studies')} 
              className="text-lg font-semibold hover:underline"
            >
              See how we helped others →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyChooseUs
