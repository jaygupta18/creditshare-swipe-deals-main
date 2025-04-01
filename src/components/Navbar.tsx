
import React, { useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "nav-link font-bold" : "nav-link";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden space-x-1 md:flex">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/buyer" className={isActive("/buyer")}>
            Buyers
          </Link>
          <Link to="/card-holder" className={isActive("/card-holder")}>
            Card Holders
          </Link>
          <Link to="/how-it-works" className={isActive("/how-it-works")}>
            How It Works
          </Link>
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          <Button variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="credit-gradient" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="animate-fade-in bg-background px-4 py-2 md:hidden">
          <div className="flex flex-col space-y-2 pb-3 pt-2">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-base font-medium hover:bg-accent ${location.pathname === "/" ? "font-bold" : ""}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/buyer"
              className={`rounded-md px-3 py-2 text-base font-medium hover:bg-accent ${location.pathname === "/buyer" ? "font-bold" : ""}`}
              onClick={toggleMenu}
            >
              Buyers
            </Link>
            <Link
              to="/card-holder"
              className={`rounded-md px-3 py-2 text-base font-medium hover:bg-accent ${location.pathname === "/card-holder" ? "font-bold" : ""}`}
              onClick={toggleMenu}
            >
              Card Holders
            </Link>
            <Link
              to="/how-it-works"
              className={`rounded-md px-3 py-2 text-base font-medium hover:bg-accent ${location.pathname === "/how-it-works" ? "font-bold" : ""}`}
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login" onClick={toggleMenu}>
                  Log In
                </Link>
              </Button>
              <Button className="flex-1 credit-gradient" asChild>
                <Link to="/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
