import React, { useState, useEffect } from 'react';
import hero1 from '../assets/hero_slider1.webp'; 
import hero2 from '../assets/hero_slider2.png'; 
import hero3 from '../assets/hero_slider3.png'; 
import hero4 from '../assets/hero_slider4.jpg'; 

const HeroSection = () => {
    const images = [
        { 
            src: hero1,
            alt: 'Graphs showing growth',
            headline: 'Maximize Your Visibility with Strategic Content',
            subtext: 'We meticulously utilize every word and image space to boost product algorithms and enhance search results.'
        }, 
        { 
            src: hero2,
            alt: 'Team analyzing reports',
            headline: 'Drive Targeted Traffic with Advanced PPC Strategies',
            subtext: 'Leverage thorough account monitoring, accurate category placement, and advanced PPC to boost sales.'
        }, 
        { 
            src: hero4,
            alt: 'Warehouse full of boxes',
            headline: 'Streamline Operations, Reduce Logistics Costs',
            subtext: 'We manage packaging, labeling, and inventory repositioning to ensure complete sales and minimize FBA costs.'
        },
        { 
            src: hero3,
            alt: 'A smartphone in a shopping cart',
            headline: 'Navigate Global E-commerce Finance and Taxes',
            subtext: 'Our chartered accountants provide bull\'s-eye solutions for complex international transactions, taxes, and optimized profitability.'
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    const handleCtaClick = () => {
        console.log("CTA clicked: Ready to grow on Amazon!");
    };

    return (
        <section id="home" className="relative mt-20 h-[500px] md:h-[650px] overflow-hidden">
            {images.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Text Content */}
                    <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 pb-10 sm:pb-14">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug drop-shadow-lg">
                            {slide.headline}
                        </h1>
                        <p className="mt-4 mx-3 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                            {slide.subtext}
                        </p>
                        <button 
                            onClick={handleCtaClick}
                            className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
                        >
                            Start Your Amazon Success
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-3 sm:left-6 top-[58%] sm:top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full z-30 backdrop-blur-sm"
                aria-label="Previous Slide"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-3 sm:right-6 top-[58%] sm:top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full z-30 backdrop-blur-sm"
                aria-label="Next Slide"
            >
                &#10095;
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            i === current ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
