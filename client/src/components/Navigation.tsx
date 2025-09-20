import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-amber-100 text-white p-4 sticky top-0 z-50 shadow-md border-b-4 border-[#3D2B1F]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-3xl sm:text-4xl lg:text-5xl">💩</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3D2B1F] font-['Bangers'] hidden sm:block">
                Poo Poo Mountain
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}