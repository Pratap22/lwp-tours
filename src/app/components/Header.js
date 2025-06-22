"use client";
import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const defaultNavigation = [
  { name: "About Us", href: "/about-us" },
  { name: "Tours", href: "/tours" },
  { name: "Travel Info", href: "/travel-info" },
  { name: "Awards", href: "/awards" },
  { name: "Why Us", href: "/why-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Admin", href: "/admin" },
];

const MenuItem = ({ item, isScrolled }) => {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || (hasChildren && item.children.some(c => c.href === pathname));

  const linkClasses = `${
    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'
  } ${isActive && isScrolled ? 'text-blue-600 font-semibold' : ''} ${isActive && !isScrolled ? 'font-semibold' : ''} px-3 py-2 text-sm font-medium transition-colors duration-300`;

  // Style "Contact Us" as a button
  if (item.name === 'Contact Us') {
    return (
      <Link
        href={item.href}
        className={`${
          isScrolled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-white/20 hover:bg-white/30 text-white'
        } px-6 py-2 rounded-full text-sm font-medium transition-all duration-300`}
      >
        {item.name}
      </Link>
    );
  }

  // Handle items with dropdowns
  if (hasChildren) {
    return (
      <div className="relative group">
        <div className={`${linkClasses} flex items-center gap-1`}>
          {item.name}
          <ChevronDownIcon className="h-3 w-3" />
        </div>
        <div className="absolute hidden group-hover:block top-full left-0 pt-2 z-20">
          <div className="bg-white rounded-md shadow-lg py-1 w-48">
            {item.children.map(child => {
              const isChildActive = child.href === pathname;
              return (
                <Link
                  key={child.name}
                  href={child.href}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isChildActive ? 'font-semibold text-blue-600' : ''}`}
                >
                  {child.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Handle regular links
  return (
    <Link
      href={item.href}
      className={linkClasses}
    >
      {item.name}
    </Link>
  );
};

export default function Header({ content }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigation, setNavigation] = useState(defaultNavigation);
  const pathname = usePathname();

  const siteName = content?.siteName || "Bhutan Travel";
  const siteLogo = content?.siteLogo;
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    if (pathname === "/") {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [pathname]);

  useEffect(() => {
    const navigationSection = content?.sections?.find(section => section.sectionId === 'navigation');
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
                {siteLogo ? (
                  <Image src={siteLogo} alt={siteName} width={40} height={40} className="rounded-lg"/>
                ) : (
                  <div className={`w-10 h-10 ${isScrolled ? 'bg-blue-600' : 'bg-blue-600/80'} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                    <span className="text-white font-bold text-lg">{siteName.charAt(0)}</span>
                  </div>
                )}
                <div className="ml-3">
                  <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}>
                    {siteName}
                  </h1>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navigation.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                isScrolled={isScrolled}
              />
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'
              } focus:outline-none transition-colors duration-300`}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => {
                const isActive = item.href === pathname || (item.children && item.children.some(c => c.href === pathname));
                return (
                  <Link
                    key={item.name}
                    href={item.href || '#'}
                    className={`text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium ${isActive ? 'font-semibold text-blue-600' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
