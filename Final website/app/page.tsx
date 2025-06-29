"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Grid, Column, Tile } from "@carbon/react"
import { Navigation } from "@/components/navigation"
import {
  DocumentAdd,
  Compare,
  Analytics,
  ArrowRight,
  Star,
  Security,
  Time,
  ChevronDown,
  CheckmarkFilled,
} from "@carbon/icons-react"

export default function LexoraAI() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const stats = [
    { number: "50K+", label: "Documents Generated", icon: DocumentAdd },
    { number: "99.9%", label: "Accuracy Rate", icon: CheckmarkFilled },
    { number: "24/7", label: "Support Available", icon: Time },
    { number: "256-bit", label: "Security Encryption", icon: Security },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Legal Director, TechCorp",
      content: "Lexora AI has revolutionized our legal workflow. What used to take hours now takes minutes.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      content: "The NDA generator is incredibly intuitive and produces professional-grade documents.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Contract Manager",
      content: "The clause explainer feature has saved us countless hours of legal consultation.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="pt-20">
        {/* Enhanced Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-8 animate-pulse-glow">
                <Star className="mr-2" size={16} />
                Trusted by 10,000+ Legal Professionals
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Legal AI
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
                Transform your legal workflow with cutting-edge AI. Generate contracts, analyze clauses, and compare
                documents with unprecedented speed and accuracy.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <Link
                  href="/nda-generator"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      size={20}
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <button className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/50">
                  Watch Demo
                </button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mb-4 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon size={24} className="text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-white/60" />
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="relative bg-white/5 backdrop-blur-sm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powerful AI Tools for Legal Professionals
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of legal technology with our comprehensive suite of AI-powered tools
              </p>
            </div>

            <Grid className="gap-8">
              <Column sm={4} md={4} lg={4}>
                <Link href="/nda-generator" className="block group h-full">
                  <Tile className="h-full p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <DocumentAdd size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">NDA Generator</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Create legally compliant Non-Disclosure Agreements in minutes with our advanced AI system
                      </p>
                      <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        <span className="mr-2">Try Now</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Tile>
                </Link>
              </Column>

              <Column sm={4} md={4} lg={4}>
                <Link href="/clause-explainer" className="block group h-full">
                  <Tile className="h-full p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Analytics size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Clause Explainer</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Transform complex legal language into clear, understandable explanations with AI analysis
                      </p>
                      <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        <span className="mr-2">Try Now</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Tile>
                </Link>
              </Column>

              <Column sm={4} md={4} lg={4}>
                <Link href="/clause-comparator" className="block group h-full">
                  <Tile className="h-full p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Compare size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Clause Comparator</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Compare documents side-by-side with AI-powered analysis and intelligent recommendations
                      </p>
                      <div className="flex items-center justify-center text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                        <span className="mr-2">Try Now</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Tile>
                </Link>
              </Column>
            </Grid>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <h3 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-50"></div>
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Lexora AI
                  </span>
                  <div className="text-sm text-gray-400">Legal Intelligence Platform</div>
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Transforming the legal industry with cutting-edge AI technology. Join thousands of legal professionals
                who trust Lexora AI.
              </p>

              <div className="flex justify-center space-x-8 text-sm mb-8">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                  Contact
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Support
                </a>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-gray-500 text-sm">
                  © 2024 Lexora AI. All rights reserved. | Empowering Legal Excellence Through AI
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
