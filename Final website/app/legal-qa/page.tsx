"use client"

import { useState } from "react"
import { TextArea, Grid, Column, Loading } from "@carbon/react"
import {
  Analytics,
  Information,
  CheckmarkFilled,
  Search,
  Bookmark,
  Share,
  Download,
  ChatBot,
} from "@carbon/icons-react"

import { Navigation } from "@/components/navigation"
import { apiClient, downloadFile } from "@/lib/api"

interface LegalQAResponse {
  success: boolean
  answer: string
  sources_used: boolean
  confidence: string
}

export default function LegalQA() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnswer, setHasAnswer] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<LegalQAResponse | null>(null)
  const [error, setError] = useState("")

  const handleAskQuestion = async () => {
    if (!question.trim()) return

    setIsAnalyzing(true)
    setError("")

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

      const response = await fetch(`${API_BASE_URL}/legal-qa/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: LegalQAResponse = await response.json()
      setAnswer(result)
      setHasAnswer(true)
    } catch (err) {
      console.error("Legal Q&A error:", err)
      setError("Failed to get answer. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!answer) return

    try {
      const blob = await apiClient.downloadPDF({
        question: question,
        answer: answer.answer,
      })
      downloadFile(blob, `Legal_QA_${Date.now()}.pdf`)
    } catch (err) {
      console.error("PDF download error:", err)
      setError("Failed to download PDF. Please try again.")
    }
  }

  const sampleQuestions = [
    "What are the key elements of a valid contract?",
    "How do non-disclosure agreements work in international business?",
    "What are the differences between employment and contractor agreements?",
    "How should intellectual property rights be handled in joint ventures?",
    "What are the legal requirements for data protection in business contracts?",
    "How do force majeure clauses protect businesses during emergencies?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
            <ChatBot className="mr-2" size={16} />
            RAG-Enhanced Legal Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Legal Q&A
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get expert legal answers powered by AI and grounded in comprehensive legal document analysis
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckmarkFilled size={20} />
              <span>Document-Grounded Answers</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Analytics size={20} />
              <span>RAG-Enhanced Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <Information size={20} />
              <span>Expert Legal Context</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-center">
            {error}
          </div>
        )}

        <Grid className="gap-8">
          {/* Question Input Section */}
          <Column sm={4} md={8} lg={8}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Ask Your Legal Question</h2>

              <div className="space-y-6">
                <TextArea
                  id="legal-question"
                  labelText="Legal Question"
                  placeholder="Ask any legal question about contracts, compliance, intellectual property, employment law, or business regulations..."
                  rows={8}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="enhanced-textarea"
                />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {question.length} characters • {question.split(" ").filter((word) => word.length > 0).length} words
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-white/30 rounded-xl text-white text-sm hover:bg-white/10 transition-all duration-300">
                      <Bookmark className="mr-2 inline" size={16} />
                      Save
                    </button>
                    <button className="px-4 py-2 border border-white/30 rounded-xl text-white text-sm hover:bg-white/10 transition-all duration-300">
                      <Share className="mr-2 inline" size={16} />
                      Share
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAskQuestion}
                  disabled={isAnalyzing || !question.trim()}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <Loading className="mr-3" />
                      Analyzing Legal Documents...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Search className="mr-3" size={24} />
                      Get Legal Answer
                    </span>
                  )}
                </button>
              </div>

              {/* Sample Questions */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Sample Questions</h3>
                <div className="grid gap-2">
                  {sampleQuestions.map((sampleQ, index) => (
                    <button
                      key={index}
                      onClick={() => setQuestion(sampleQ)}
                      className="text-left p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white text-sm"
                    >
                      {sampleQ}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Column>

          {/* Answer Section */}
          <Column sm={4} md={8} lg={8}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Legal Answer</h2>
                {hasAnswer && answer && (
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-sm font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="mr-2 inline" size={16} />
                    Download PDF
                  </button>
                )}
              </div>

              {!hasAnswer ? (
                <div className="text-center py-12">
                  <ChatBot size={64} className="mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">
                    Ask your legal question to get expert answers grounded in legal documents
                  </p>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in-up">
                  {/* RAG Enhancement Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">
                    <CheckmarkFilled className="mr-2" size={16} />
                    RAG-Enhanced Answer
                  </div>

                  {/* Answer Content */}
                  <div className="p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                    <h3 className="font-semibold text-blue-300 mb-3 flex items-center">
                      <Information className="mr-2" size={20} />
                      Legal Analysis
                    </h3>
                    <div className="text-blue-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {answer?.answer || "Answer will appear here."}
                    </div>
                  </div>

                  {/* Answer Metadata */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Sources Used</h4>
                      <div className="text-purple-200 text-sm">
                        {answer?.sources_used ? "✅ Legal documents analyzed" : "❌ No sources used"}
                      </div>
                    </div>

                    <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                      <h4 className="font-semibold text-green-300 mb-2">Confidence Level</h4>
                      <div className="text-green-200 text-sm">{answer?.confidence || "Medium"} confidence</div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                    <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Legal Disclaimer</h4>
                    <div className="text-yellow-200 text-xs">
                      This AI-generated response is for informational purposes only and does not constitute legal
                      advice. Always consult with a qualified attorney for specific legal matters.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Column>
        </Grid>
      </div>
    </div>
  )
}
