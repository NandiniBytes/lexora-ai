"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Close,
  Search,
  User,
  ChevronDown,
  DocumentAdd,
  Analytics,
  Compare,
  Home,
  Star,
  ArrowRight,
} from "@carbon/icons-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "NDA Generator", href: "/nda-generator", icon: DocumentAdd },
    { name: "Clause Explainer", href: "/clause-explainer", icon: Analytics },
    { name: "Clause Comparator", href: "/clause-comparator", icon: Compare },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? "backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-20"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Lexora AI
                </span>
                <div className="text-xs text-gray-400 -mt-1 group-hover:text-gray-300 transition-colors duration-300">
                  Legal Intelligence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-white bg-white/10 backdrop-blur-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </div>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Search size={20} />
              </button>

              {/* Get Started Button */}
              <Link
                href="/nda-generator"
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-sm overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                  <User size={20} />
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      Sign In
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      Create Account
                    </a>
                    <div className="border-t border-white/10 my-2"></div>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      Pricing
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-4 animate-fade-in-up">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search legal documents, clauses, or ask a question..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                  autoFocus
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">NDA templates</span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Liability clauses</span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Contract analysis</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/20 shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Lexora AI
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Close size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2 mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-2xl text-white transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                    {isActive(item.href) && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <Link
                  href="/nda-generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-center transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 border border-white/30 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300">
                    Sign In
                  </button>
                  <button className="px-4 py-3 border border-white/30 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300">
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Support
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Pricing
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <span className="ml-2 text-sm text-gray-400">Trusted by 10K+ users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
