import React, { useState } from 'react';
import terms_of_use from '../assets/TERMS_OF_USE.pdf';
import privacy_policy from '../assets/PRIVACY_POLICY.pdf';
import PdfViewer from './PdfViewer';

function TermsAndConditions() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <>
      <section className="py-20 px-6 bg-gray-50 text-gray-900 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase">Our Policies</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Clear, Transparent, and Fair</h2>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            We believe in openness and transparency. Explore our Terms of Use and Privacy Policy to know how we safeguard your trust.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setSelectedPdf(terms_of_use)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              View Terms of Use
            </button>
            <button
              onClick={() => setSelectedPdf(privacy_policy)}
              className="bg-gray-800 hover:bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              View Privacy Policy
            </button>
          </div>
        </div>
      </section>

      {selectedPdf && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="relative bg-white rounded-2xl w-11/12 md:w-3/4 lg:w-2/3 h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
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

export default TermsAndConditions;
