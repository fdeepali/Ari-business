import { useEffect, useState } from "react";

const Preloader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "Welcome to ARI BUSINESS NETWORK";

  useEffect(() => {
    // Typing effect
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typingInterval);
    }, 80);

    // Start fade out at 2.7s, complete removal at 3s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2700);
    const hideTimer = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-yellow-400 font-sans transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Enhanced loader with rings */}
            <div className="relative mb-8">
              {/* Outer ring */}
              <div className="absolute w-24 h-24 border-2 border-yellow-500/20 rounded-full animate-ping"></div>
              {/* Middle ring */}
              <div className="absolute w-20 h-20 top-2 left-2 border-2 border-yellow-500/40 rounded-full" style={{animation: 'spin 2s linear infinite reverse'}}></div>
              {/* Inner spinning loader */}
              <div className="relative w-16 h-16 top-4 left-4 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-yellow-500/50"></div>
              {/* Center dot */}
              <div className="absolute w-3 h-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>

            {/* Typing text with enhanced styling */}
            <div className="mb-6 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                {text}
                <span className="animate-pulse text-yellow-400">|</span>
              </h2>
            </div>

            {/* Enhanced decorative elements */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="h-[2px] w-16 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-yellow-500 rounded-full"></div>
            </div>

            {/* Loading dots */}
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
        </div>
      ) : (
        <div className="animate-fadeIn">{children}</div>
      )}
    </>
  );
};

export default Preloader;