"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user) return "?";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e35]/20 to-transparent"></div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute right-4 top-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center py-4">
        <div className="flex items-center gap-8 bg-[#1a2e35]/20 backdrop-blur-[2px] rounded-full px-2 py-1">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center px-6 py-2 rounded-full bg-[#1a2e35] bg-opacity-90 shadow-sm"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white/80"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-white/90 text-sm font-medium">
                7Z Neck Bracket
              </span>
            </div>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            What is it?
          </button>
          <button
            onClick={() => scrollToSection("design")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            Who Needs It?
          </button>
          <button
            onClick={() => scrollToSection("techbehind")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            The Tech Behind
          </button>
          <button
            onClick={() => scrollToSection("difference")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            What Makes Difference
          </button>
          <button
            onClick={() => scrollToSection("whywear")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            Why Wear It?             
          </button>
          <button
            onClick={() => scrollToSection("product")}
            className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer"
          >
            Buy Now
          </button>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-2 pl-2">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              <div ref={dropdownRef} className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#044588] flex items-center justify-center text-white text-sm cursor-pointer hover:bg-[#033366] transition-colors">
                    {getInitials()}
                  </div>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    
                    {user.isAdmin && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-white/70 hover:text-white/90 text-sm font-medium px-4 cursor-pointer">
                  Login
                </Link>
                <Link href="/signup" className="text-white bg-[#044588] hover:bg-[#033366] text-sm font-medium px-4 py-2 rounded-full cursor-pointer">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-[#1a2e35]/95 backdrop-blur-sm transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 pt-16">
          {[
            { id: "hero", label: "7Z Neck Bracket" },
            { id: "about", label: "What is it?" },
            { id: "design", label: "Who Needs It?" },
            { id: "techbehind", label: "The Tech Behind" },
            { id: "difference", label: "What Makes Difference" },
            { id: "whywear", label: "Why Wear It" },
            { id: "product", label: "Buy Now" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white text-lg font-medium px-6 py-3 hover:bg-white/10 rounded-full w-64 text-center"
            >
              {item.label}
            </button>
          ))}
          
          {/* Auth Buttons for Mobile */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse flex items-center justify-center mb-6">
              <div className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : user ? (
            <>
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#044588] flex items-center justify-center text-white text-xl mb-2">
                  {getInitials()}
                </div>
                <p className="text-white text-sm">{user.email}</p>
              </div>
              
              {user.isAdmin && (
                <Link 
                  href="/admin" 
                  className="text-white text-lg font-medium px-6 py-3 hover:bg-white/10 rounded-full w-64 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              
              <Link 
                href="/profile" 
                className="text-white text-lg font-medium px-6 py-3 hover:bg-white/10 rounded-full w-64 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-white text-lg font-medium px-6 py-3 hover:bg-white/10 rounded-full w-64 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-white text-lg font-medium px-6 py-3 hover:bg-white/10 rounded-full w-64 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="text-white text-lg font-medium bg-[#044588] hover:bg-[#033366] px-6 py-3 rounded-full w-64 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;