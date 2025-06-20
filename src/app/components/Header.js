"use client";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultNavigation = [
  { name: "About Us", href: "/about-us" },
  { name: "Tours", href: "/tours" },
  { name: "Travel Info", href: "/travel-info" },
  { name: "Awards", href: "/awards" },
  { name: "Why Us", href: "/why-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Admin", href: "/admin" },
];

export default function Header({ content }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigation, setNavigation] = useState(defaultNavigation);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const pathname = usePathname();
  
  // Only apply scroll behavior on home page
  const isHomePage = pathname === "/";
  
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true); // Always show white header on non-home pages
      return;
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    // Find navigation section in the new sections array structure
    const navigationSection = content?.sections?.find(section => section.sectionId === 'navigation');
    
    // Use content navigation if available, otherwise use default
    if (navigationSection?.isActive && navigationSection.navigationItems) {
      const navItems = navigationSection.navigationItems
        .filter(item => item.isActive)
        .sort((a, b) => a.order - b.order);
      setNavigation(navItems);
    } else {
      setNavigation(defaultNavigation);
    }
  }, [content]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${isScrolled ? 'bg-blue-600' : 'bg-blue-600/80'} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                  <span className="text-white font-bold text-lg">LWP</span>
                </div>
                <div className="ml-3">
                  <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}>
                    LWP Travel & Tours
                  </h1>
                  <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/80'} transition-colors duration-300`}>Local Experts</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'
                } px-3 py-2 text-sm font-medium transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Secret Admin Link */}
          <div 
            className="hidden md:flex items-center relative"
            onMouseEnter={() => setShowAdminLink(true)}
            onMouseLeave={() => setShowAdminLink(false)}
          >
            {showAdminLink && (
              <Link
                href="/admin"
                className={`
                  ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'}
                  px-3 py-2 text-sm font-medium transition-all duration-300 animate-fade-in
                `}
              >
                Admin
              </Link>
            )}
            <Link
              href="/contact-us"
              className={`${
                isScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              } px-6 py-2 rounded-full text-sm font-medium transition-all duration-300`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'
              } focus:outline-none transition-colors duration-300`}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact-us"
                  className="w-full block text-center bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
