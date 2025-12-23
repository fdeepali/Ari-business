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
import p10 from "../assets/partner10.png";
import axios from "axios";

/**
 * Partners as objects
 * (Dummy links for now)
 */
const partners = [
  { img: p1, link: "https://yushefashion.com/" },
  { img: p2, link: "#" },
  { img: p3, link: "#" },
  { img: p4, link: "#" },
  { img: p5, link: "https://www.robincollection.com/en/?srsltid=AfmBOorw-Ihi7uDIzbDocXWun3zA44KEIQyQsl9zdvXgfE0jBk69a0go" },
  { img: p6, link: "https://miraclejewelsbymj.com/" },
  { img: p7, link: "#" },
  { img: p8, link: "#" },
  { img: p9, link: "https://purelyindian.us/" },
  { img: p10, link: "https://tantratshirts.com/", whiteLogo : true }
];

export default function PartnerSlider() {
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(5);

  // Responsive logos per slide
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

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % slidesCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [slidesCount]);

  return (
    <section className="py-20 px-4 sm:px-6 bg-white border-y-2 border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600">
            Partnering with industry leaders to drive Amazon success
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Slider */}
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
                  .slice(
                    slideIndex * perSlide,
                    slideIndex * perSlide + perSlide
                  )
                  .map((partner, index) => (
                    <div
                      key={index}
                      className={`group relative flex-shrink-0
                        w-20 sm:w-28 md:w-36
                        h-20 sm:h-28 md:h-36
                        border-2 rounded-lg shadow-sm
                        flex items-center justify-center
                        p-2 sm:p-4 overflow-hidden
                        transition-all duration-500
                        hover:scale-105 hover:border-black hover:shadow-md
                        ${
                          partner.whiteLogo
                            ? "bg-black border-black grayscale-0"
                            : "bg-white border-gray-200 grayscale hover:grayscale-0"
                        }
                      `}
                    >

                      {/* Logo */}
                      <img
                        src={partner.img}
                        alt={`Partner ${slideIndex * perSlide + index + 1}`}
                        className={`object-contain w-full h-full transition-opacity duration-500
                          ${
                            partner.whiteLogo
                              ? "opacity-100"
                              : "opacity-70 group-hover:opacity-100"
                          }
                        `}
                      />

                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 bg-black/60
                                   opacity-0 group-hover:opacity-100
                                   transition-opacity duration-300
                                   flex items-center justify-center"
                      >
                        <a
                          href={partner.link === "#" ? "/" : partner.link}
                          target={partner.link === "#" ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          onClick={async (e) => {
                            if (partner.link === "#") {
                              e.preventDefault();                               
                            } else {
                              try {
                                axios.get(`https://ari-business-network-3.onrender.com/api/increament-url?url=${encodeURIComponent(partner.link)}`, {
                                  headers : {
                                    Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
                                  }
                                });
                              } catch (error) {
                                console.error("Error incrementing URL count:", error);
                              }                          
                            }
                          }}
                          className="px-4 py-2 text-sm font-semibold
                                    bg-white text-black rounded-md
                                    hover:bg-black hover:text-white
                                    transition-colors"
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === slide
                    ? "bg-black w-8"
                    : "bg-gray-300 hover:bg-gray-400"
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
