import React, { useState } from 'react';
import terms_of_use from '../assets/TERMS_OF_USE.pdf';
import privacy_policy from '../assets/PRIVACY_POLICY.pdf';
import PdfViewer from './PdfViewer';

function TermsAndConditions() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <>
      {/* Section Header */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-yellow-400 font-semibold text-lg tracking-wide">OUR POLICIES</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Transparency You Can Trust</h2>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            We value honesty and clarity. Review our Terms of Use and Privacy Policy to understand how we protect your interests.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setSelectedPdf(terms_of_use)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View Terms of Use
            </button>
            <button
              onClick={() => setSelectedPdf(privacy_policy)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View Privacy Policy
            </button>
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {selectedPdf && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-white/10 flex justify-center items-center z-50"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="relative bg-white rounded-2xl w-11/12 md:w-3/4 lg:w-2/3 h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              ✕ Close
            </button>

            {/* PDF Viewer */}
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
