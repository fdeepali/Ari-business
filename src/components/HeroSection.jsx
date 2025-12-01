import React, { useState, useEffect } from 'react';
import slider1 from '../assets/hero_slider1.avif'
import slider2 from '../assets/slider2.jpg'
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const images = [
        { 
            src: slider1,
            alt: 'Empowering Global Trade with ARI Business Network',
            headline: 'Empowering Global Trade with ARI Business Network',
            subtext: 'Connecting businesses across continents through trust, innovation, and royal excellence.'
        }, 
        { 
            src: slider2,
            alt: 'Driven by Excellence',
            headline: 'Driven by Excellence. Powered by Trust.',
            subtext: 'At ARI Business Network, we believe business success should move with the elegance and precision of royalty.'
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
        <section id="home" className="relative mt-20 min-h-[500px] md:min-h-[700px] overflow-hidden bg-black">
            {images.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                    }`}
                >
                    {/* Background Image with Royal Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                        {/* Royal gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                        {/* Gold accent gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-transparent to-yellow-900/20"></div>
                    </div>

                    {/* Decorative Royal Border Top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent z-20"></div>

                    {/* Text Content with Royal Styling */}
                    <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4 md:px-8">
                        {/* Crown Icon */}
                        <div className="mb-6 opacity-0 animate-[fadeInDown_1s_ease-out_0.3s_forwards]">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L15 8.5L21 9L16.5 13.5L18 20L12 16.5L6 20L7.5 13.5L3 9L9 8.5L12 2Z"/>
                            </svg>
                        </div>

                        {/* Headline with Royal Typography */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                            <span className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                                {slide.headline}
                            </span>
                        </h1>

                        {/* Decorative Divider */}
                        <div className="flex items-center gap-3 my-6 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-yellow-500"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                            <div className="w-16 h-[2px] bg-yellow-500"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-500"></div>
                        </div>

                        {/* Subtext */}
                        <p className="mt-2 mx-3 text-base sm:text-lg md:text-xl text-gray-100 font-medium drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] max-w-3xl leading-relaxed tracking-wide opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
                            {slide.subtext}
                        </p>

                        {/* Royal CTA Button */}
                        <button 
                            onClick={handleCtaClick}
                            className="mt-10 px-8 py-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:shadow-[0_0_50px_rgba(234,179,8,0.7)] transition-all duration-300 transform hover:scale-105 border-2 border-yellow-300 opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards] relative overflow-hidden group"
                        >
                            <Link to='/book-appointment'><span className="relative z-10">Start Your Amazon Success</span></Link>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Decorative Royal Border Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent z-20"></div>
                </div>
            ))}

            {/* Royal Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/40 hover:to-yellow-600/40 text-yellow-400 p-3 sm:p-4 rounded-full z-30 backdrop-blur-md border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 hover:scale-110"
                aria-label="Previous Slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/40 hover:to-yellow-600/40 text-yellow-400 p-3 sm:p-4 rounded-full z-30 backdrop-blur-md border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 hover:scale-110"
                aria-label="Next Slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Royal Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-yellow-500/20">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${
                            i === current 
                                ? 'w-8 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]' 
                                : 'w-3 h-3 bg-yellow-500/30 hover:bg-yellow-500/50 border border-yellow-500/50'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Decorative Corner Ornaments */}
            <div className="absolute top-24 left-4 w-16 h-16 border-l-2 border-t-2 border-yellow-500/30 z-20 opacity-50"></div>
            <div className="absolute top-24 right-4 w-16 h-16 border-r-2 border-t-2 border-yellow-500/30 z-20 opacity-50"></div>
            <div className="absolute bottom-16 left-4 w-16 h-16 border-l-2 border-b-2 border-yellow-500/30 z-20 opacity-50"></div>
            <div className="absolute bottom-16 right-4 w-16 h-16 border-r-2 border-b-2 border-yellow-500/30 z-20 opacity-50"></div>

            <style>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;