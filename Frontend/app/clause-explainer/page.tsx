"use client"

import { useState } from "react"
import { Button, TextArea, Grid, Column, Loading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react"
import {
  Analytics,
  Upload,
  Information,
  CheckmarkFilled,
  WarningFilled,
  DocumentPdf,
  Search,
  Bookmark,
  Share,
  DocumentAdd,
} from "@carbon/icons-react"

import { Navigation } from "@/components/navigation"

export default function ClauseExplainer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [inputText, setInputText] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalysis(true)
    }, 3000)
  }

  const sampleClauses = [
    {
      title: "Limitation of Liability",
      text: "IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM THE USE OF OR INABILITY TO USE THE SERVICE.",
      category: "Liability",
    },
    {
      title: "Force Majeure",
      text: "Neither party shall be liable for any failure or delay in performance under this Agreement which is due to an earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor strike, lockout, or boycott.",
      category: "Risk Management",
    },
    {
      title: "Intellectual Property",
      text: "All intellectual property rights in and to the Work Product shall be owned exclusively by Company. Contractor hereby assigns to Company all right, title and interest in and to the Work Product.",
      category: "IP Rights",
    },
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
            <Analytics className="mr-2" size={16} />
            AI-Powered Legal Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Clause Explainer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform complex legal language into clear, understandable explanations with AI-powered analysis
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckmarkFilled size={20} />
              <span>Plain English Translation</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <WarningFilled size={20} />
              <span>Risk Assessment</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <Information size={20} />
              <span>Legal Context</span>
            </div>
          </div>
        </div>

        <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
          <TabList aria-label="Clause Explainer Tools" className="mb-8 flex justify-center">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <Tab className="tab-enhanced">Analyze Text</Tab>
              <Tab className="tab-enhanced">Upload Document</Tab>
              <Tab className="tab-enhanced">Sample Clauses</Tab>
            </div>
          </TabList>

          <TabPanels>
            {/* Text Analysis Tab */}
            <TabPanel>
              <Grid className="gap-8">
                <Column sm={4} md={8} lg={8}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">Paste Your Legal Text</h2>

                    <div className="space-y-6">
                      <TextArea
                        id="clause-text"
                        labelText="Legal Clause or Contract Text"
                        placeholder="Paste your legal clause, contract section, or any legal text here for instant AI analysis..."
                        rows={12}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="enhanced-textarea"
                      />

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          {inputText.length} characters •{" "}
                          {inputText.split(" ").filter((word) => word.length > 0).length} words
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
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !inputText.trim()}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center justify-center">
                            <Loading className="mr-3" />
                            Analyzing with AI...
                          </div>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Analytics className="mr-3" size={24} />
                            Analyze with AI
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </Column>

                <Column sm={4} md={8} lg={8}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-full">
                    <h2 className="text-2xl font-bold text-white mb-6">AI Analysis Results</h2>

                    {!hasAnalysis ? (
                      <div className="text-center py-12">
                        <Analytics size={64} className="mx-auto mb-4 text-gray-500" />
                        <p className="text-gray-400">
                          Paste your legal text and click "Analyze with AI" to see detailed explanations
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-fade-in-up">
                        {/* Plain English Summary */}
                        <div className="p-6 bg-green-500/20 rounded-2xl border border-green-500/30">
                          <h3 className="font-semibold text-green-300 mb-3 flex items-center">
                            <CheckmarkFilled className="mr-2" size={20} />
                            Plain English Summary
                          </h3>
                          <p className="text-green-200 text-sm leading-relaxed">
                            This clause limits the company's liability for indirect damages like lost profits or data.
                            It means if something goes wrong, they won't pay for business losses beyond direct damages.
                          </p>
                        </div>

                        {/* Key Terms */}
                        <div className="p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                          <h3 className="font-semibold text-blue-300 mb-3 flex items-center">
                            <Information className="mr-2" size={20} />
                            Key Terms & Definitions
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-blue-200">Indirect Damages:</span>
                              <span className="text-blue-100">Secondary losses not directly caused</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Consequential:</span>
                              <span className="text-blue-100">Damages that result as a consequence</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Punitive:</span>
                              <span className="text-blue-100">Damages meant to punish wrongdoing</span>
                            </div>
                          </div>
                        </div>

                        {/* Risk Assessment */}
                        <div className="p-6 bg-yellow-500/20 rounded-2xl border border-yellow-500/30">
                          <h3 className="font-semibold text-yellow-300 mb-3 flex items-center">
                            <WarningFilled className="mr-2" size={20} />
                            Risk Assessment
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                              <div>
                                <div className="text-yellow-200 font-medium">High Risk</div>
                                <div className="text-yellow-100">
                                  Very broad limitation - covers almost all meaningful damages
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                              <div>
                                <div className="text-yellow-200 font-medium">Medium Risk</div>
                                <div className="text-yellow-100">May not be enforceable in all jurisdictions</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="p-6 bg-purple-500/20 rounded-2xl border border-purple-500/30">
                          <h3 className="font-semibold text-purple-300 mb-3 flex items-center">
                            <Analytics className="mr-2" size={20} />
                            AI Recommendations
                          </h3>
                          <ul className="text-purple-200 text-sm space-y-2">
                            <li>• Consider negotiating for exceptions to gross negligence or willful misconduct</li>
                            <li>• Request a liability cap instead of complete exclusion</li>
                            <li>• Ensure mutual limitation applies to both parties</li>
                            <li>• Review enforceability under applicable state/country laws</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </Column>
              </Grid>
            </TabPanel>

            {/* Document Upload Tab */}
            <TabPanel>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Upload Legal Document</h2>

                  <div className="space-y-8">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-white/30 rounded-3xl p-12 text-center hover:border-white/50 transition-colors duration-300 cursor-pointer group">
                      <Upload
                        size={64}
                        className="mx-auto mb-6 text-gray-400 group-hover:text-white transition-colors duration-300"
                      />
                      <h3 className="text-xl font-semibold text-white mb-2">Drop your document here</h3>
                      <p className="text-gray-400 mb-6">PDF, DOC, DOCX up to 25MB</p>
                      <Button kind="secondary" size="lg">
                        Browse Files
                      </Button>
                    </div>

                    {/* Supported Formats */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                        <DocumentPdf size={32} className="mx-auto mb-3 text-red-400" />
                        <div className="text-white font-medium">PDF Documents</div>
                        <div className="text-gray-400 text-sm">Contracts, Agreements, Legal Forms</div>
                      </div>
                      <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                        <DocumentAdd size={32} className="mx-auto mb-3 text-blue-400" />
                        <div className="text-white font-medium">Word Documents</div>
                        <div className="text-gray-400 text-sm">DOC, DOCX files</div>
                      </div>
                      <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                        <Analytics size={32} className="mx-auto mb-3 text-purple-400" />
                        <div className="text-white font-medium">AI Analysis</div>
                        <div className="text-gray-400 text-sm">Clause-by-clause breakdown</div>
                      </div>
                    </div>

                    {/* Processing Info */}
                    <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500/30">
                      <h4 className="text-blue-300 font-semibold mb-3">What happens after upload?</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-200">
                        <div>
                          <div className="font-medium mb-1">1. Document Processing</div>
                          <div>AI extracts and identifies all clauses</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">2. Clause Analysis</div>
                          <div>Each clause gets detailed explanation</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">3. Risk Assessment</div>
                          <div>Potential issues and risks identified</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">4. Recommendations</div>
                          <div>AI suggests improvements and alternatives</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Sample Clauses Tab */}
            <TabPanel>
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Explore Sample Clauses</h2>
                  <p className="text-gray-300">Click on any clause below to see detailed AI analysis</p>
                </div>

                <div className="grid gap-6">
                  {sampleClauses.map((clause, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        setInputText(clause.text)
                        setSelectedTab(0)
                        setTimeout(() => handleAnalyze(), 500)
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                            {clause.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full mt-2">
                            {clause.category}
                          </span>
                        </div>
                        <Search
                          size={24}
                          className="text-gray-400 group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{clause.text}</p>
                      <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                        Click to analyze →
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="px-8 py-3 border-2 border-white/30 rounded-xl text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    View More Sample Clauses
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
