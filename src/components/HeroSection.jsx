import React, { useState, useEffect } from 'react';
import hero1 from '../assets/hero_slider1.webp'; 
import hero2 from '../assets/hero_slider2.png'; 
import hero3 from '../assets/hero_slider3.png'; 
import hero4 from '../assets/hero_slider4.jpg'; 

const HeroSection = () => {
    const images = [
        { 
            src: hero1, // Image: Upward Trend
            alt: 'Graphs showing growth',
            headline: 'Maximize Your Visibility with Strategic Content',
            subtext: 'We meticulously utilize every word and image space to boost product algorithms and enhance search results.'
        }, 
        { 
            src: hero2, // Image: Team Analyzing Charts
            alt: 'Team analyzing reports',
            headline: 'Drive Targeted Traffic with Advanced PPC Strategies',
            subtext: 'Leverage thorough account monitoring, accurate category placement, and advanced PPC to boost sales.'
        }, 
        { 
            src: hero4, // Image: Large Fulfillment Warehouse
            alt: 'Warehouse full of boxes',
            headline: 'Streamline Operations, Reduce Logistics Costs',
            subtext: 'We manage packaging, labeling, and inventory repositioning to ensure complete sales and minimize FBA costs.'
        },
        { 
            src: hero3, // Image: Mobile Shopping Cart
            alt: 'A smartphone in a shopping cart',
            headline: 'Navigate Global E-commerce Finance and Taxes',
            subtext: 'Our chartered accountants provide bull\'s-eye solutions for complex international transactions, taxes, and optimized profitability.'
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
    
    const handleCtaClick = () => {
        console.log("CTA clicked: Ready to grow on Amazon!");
    };


    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {images.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Image with Dark Filter */}
                    <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.4)' }} // Dark overlay for text readability
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                        <div className="text-center max-w-4xl text-white">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight shadow-text">
                                {slide.headline}
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-gray-200 shadow-text">
                                {slide.subtext}
                            </p>
                            {/* Call to Action Button */}
                            <button 
                                onClick={handleCtaClick} 
                                className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                            >
                                Start Your Amazon Success
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Prev/Next Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
                aria-label="Previous Slide"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
                aria-label="Next Slide"
            >
                &#10095;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;