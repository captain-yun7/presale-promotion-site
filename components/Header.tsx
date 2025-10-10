"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              PREMIUM RESIDENCE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("complex-info")}
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              단지정보
            </button>
            <button
              onClick={() => scrollToSection("unit-types")}
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              세대정보
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              입지환경
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              분양안내
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-secondary text-white px-6 py-2 rounded-full font-medium hover:bg-accent transition-colors"
            >
              상담신청
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg p-4 mb-4">
            <button
              onClick={() => scrollToSection("complex-info")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium"
            >
              단지정보
            </button>
            <button
              onClick={() => scrollToSection("unit-types")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium"
            >
              세대정보
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium"
            >
              입지환경
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium"
            >
              분양안내
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-center mt-3 bg-secondary text-white px-6 py-3 rounded-full font-medium hover:bg-accent"
            >
              상담신청
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
