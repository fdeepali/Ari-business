import React, { useEffect, useState } from "react";
import p1 from "../assets/partner1.jpg";
import p2 from "../assets/partner2.jpg";
import p3 from "../assets/partner3.jpg";
import p4 from "../assets/partner4.jpg";
import p5 from "../assets/partner5.jpg";
import p6 from "../assets/partner6.jpg";
import p7 from "../assets/partner7.png";
import p8 from "../assets/partner8.png";
import p9 from "../assets/partner9.png";

const partners = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

export default function PartnerSlider() {
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(5); // default for large screens

  // Adjust number of logos per slide based on window width
  useEffect(() => {
    const updatePerSlide = () => {
      if (window.innerWidth < 640) {
        setPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setPerSlide(3);
      } else {
        setPerSlide(5);
      }
    };

    updatePerSlide();
    window.addEventListener("resize", updatePerSlide);
    return () => window.removeEventListener("resize", updatePerSlide);
  }, []);

  const slidesCount = Math.ceil(partners.length / perSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slidesCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [slidesCount]);

  return (
    <section className="py-20 px-4 sm:px-6 bg-white border-y-2 border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600">
            Partnering with industry leaders to drive Amazon success
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {Array.from({ length: slidesCount }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full flex justify-center items-center gap-4 md:gap-8 px-2"
              >
                {partners
                  .slice(slideIndex * perSlide, slideIndex * perSlide + perSlide)
                  .map((img, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center p-2 sm:p-4 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 hover:border-black"
                    >
                      <img
                        src={img}
                        alt={`Partner ${slideIndex * perSlide + index + 1}`}
                        className="object-contain w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === slide ? "bg-black w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
