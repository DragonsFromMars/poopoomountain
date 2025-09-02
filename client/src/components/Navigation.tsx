import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-[#3D2B1F] text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-2xl">💩</span>
              <span className="text-xl font-bold text-amber-900 font-['Bangers'] hidden sm:block">
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
                    ? "bg-amber-600 hover:bg-amber-700 text-white" 
                    : "text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                }`}
              >
                Home
              </Button>
            </Link>
            <Link href="/legend">
              <Button
                variant={location === "/legend" ? "default" : "ghost"}
                className={`font-bold ${
                  location === "/legend" 
                    ? "bg-amber-600 hover:bg-amber-700 text-white" 
                    : "text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                }`}
              >
                The Legend
              </Button>
            </Link>
            <Link href="/how-to-play">
              <Button
                variant={location === "/how-to-play" ? "default" : "ghost"}
                className={`font-bold ${
                  location === "/how-to-play" 
                    ? "bg-amber-600 hover:bg-amber-700 text-white" 
                    : "text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                }`}
              >
                How to Play
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}