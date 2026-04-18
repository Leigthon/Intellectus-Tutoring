import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const mainSiteUrl = "https://leigthon.github.io/Intellectus-Platform/#/";

  const navLinks = [
    {
      name: "Intellectus Main",
      href: mainSiteUrl,
      external: true,
    },
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Subjects", path: "/subjects" },
    { name: "Tutors", path: "/tutors" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Resources", path: "/resources" },
    // { name: "Bursary", path: "/bursary" },

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3 min-h-16 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="profile images/logo.jpg"
              alt="Intellectus Academy"
              className="h-12 w-auto rounded-full object-cover"
            />
            <div className="hidden sm:flex flex-col leading-tight ">
              <span className="text-[20px] chunkfive-font text-gray-600">Intellectus<span className="text-[5px] chunkfive-font text-gray-600">©</span></span>
            
              <span className="text-[9px] font-normal header-text ">TUTORING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium transition-colors relative text-gray-700 hover:text-[#1ac8db]"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(link.path)
                      ? "text-[#1ac8db]"
                      : "text-gray-700 hover:text-[#1ac8db]"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#1ac8db]" />
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:flex items-center gap-3">
            <Link to="/contact">
              <Button className="bg-[#1ac8db] hover:bg-[#15a3c0] text-white">
                Book Session
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-[#1ac8db]/10 text-[#1ac8db] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#1ac8db] hover:bg-[#15a3c0] text-white">
                Book Session
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

