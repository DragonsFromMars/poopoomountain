import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-amber-100 text-white p-4 sticky top-0 z-50 shadow-md border-b-4 border-[#3D2B1F]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="/poo-character-optimized.webp" 
                alt="Poo Poo Mountain Character" 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3D2B1F] font-['Bangers'] hidden sm:block">
                Poo Poo Mountain
              </span>
              <img 
                src="/toilet-man-optimized.webp" 
                alt="Toilet Character" 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button
                variant={location === "/" ? "default" : "ghost"}
                className={`font-bold ${
                  location === "/" 
                    ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                    : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                } flex flex-col items-center py-1 h-auto`}
              >
                <span className="font-['Bangers'] text-sm sm:text-base lg:text-lg">Home</span>
                <span className="text-xs sm:text-sm lg:text-base font-normal">首頁</span>
              </Button>
            </Link>
            <Link href="/how-to-play">
              <Button
                variant={location === "/how-to-play" ? "default" : "ghost"}
                className={`font-bold ${
                  location === "/how-to-play" 
                    ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                    : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                } flex flex-col items-center py-1 h-auto`}
              >
                <span className="font-['Bangers'] text-sm sm:text-base lg:text-lg">How to Play</span>
                <span className="text-xs sm:text-sm lg:text-base font-normal">玩法</span>
              </Button>
            </Link>
            <Link href="/legend">
              <Button
                variant={location === "/legend" ? "default" : "ghost"}
                className={`font-bold ${
                  location === "/legend" 
                    ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                    : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                } flex flex-col items-center py-1 h-auto`}
              >
                <span className="font-['Bangers'] text-sm sm:text-base lg:text-lg">The Legend</span>
                <span className="text-xs sm:text-sm lg:text-base font-normal">傳說</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                if (location !== "/") {
                  // Navigate to home page with scroll parameter (SPA navigation, no reload)
                  navigate("/?scroll=journey");
                } else {
                  // Already on home page, just scroll
                  document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
                  // Update URL for shareable link
                  history.replaceState(null, "", "#journey");
                }
              }}
              className="font-bold text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200 flex flex-col items-center py-1 h-auto"
            >
              <span className="font-['Bangers'] text-sm sm:text-base lg:text-lg">Road Map</span>
              <span className="text-xs sm:text-sm lg:text-base font-normal">路線圖</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#3D2B1F]/20">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/">
                <Button
                  variant={location === "/" ? "default" : "ghost"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full font-bold ${
                    location === "/" 
                      ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                      : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                  } flex flex-col items-center py-3 h-auto`}
                >
                  <span className="font-['Bangers'] text-base">Home</span>
                  <span className="text-sm font-normal">首頁</span>
                </Button>
              </Link>
              <Link href="/how-to-play">
                <Button
                  variant={location === "/how-to-play" ? "default" : "ghost"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full font-bold ${
                    location === "/how-to-play" 
                      ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                      : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                  } flex flex-col items-center py-3 h-auto`}
                >
                  <span className="font-['Bangers'] text-base">How to Play</span>
                  <span className="text-sm font-normal">玩法</span>
                </Button>
              </Link>
              <Link href="/legend">
                <Button
                  variant={location === "/legend" ? "default" : "ghost"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full font-bold ${
                    location === "/legend" 
                      ? "bg-[#3D2B1F] hover:bg-amber-900 text-white" 
                      : "text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200"
                  } flex flex-col items-center py-3 h-auto`}
                >
                  <span className="font-['Bangers'] text-base">The Legend</span>
                  <span className="text-sm font-normal">傳說</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location !== "/") {
                    navigate("/?scroll=journey");
                  } else {
                    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, "", "#journey");
                  }
                }}
                className="w-full font-bold text-[#3D2B1F] hover:text-amber-900 hover:bg-amber-200 flex flex-col items-center py-3 h-auto"
              >
                <span className="font-['Bangers'] text-base">Road Map</span>
                <span className="text-sm font-normal">路線圖</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}