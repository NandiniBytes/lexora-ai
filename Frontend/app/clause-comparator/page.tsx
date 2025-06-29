"use client"

import { useState } from "react"
import { Button, TextArea, Grid, Column, Loading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react"
import {
  Compare,
  Upload,
  CheckmarkFilled,
  WarningFilled,
  Analytics,
  ArrowRight,
  ArrowsHorizontal,
} from "@carbon/icons-react"
import { Navigation } from "@/components/navigation"

export default function ClauseComparator() {
  const [isComparing, setIsComparing] = useState(false)
  const [hasComparison, setHasComparison] = useState(false)
  const [documentA, setDocumentA] = useState("")
  const [documentB, setDocumentB] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)

  const handleCompare = () => {
    setIsComparing(true)
    setTimeout(() => {
      setIsComparing(false)
      setHasComparison(true)
    }, 3000)
  }

  const swapDocuments = () => {
    const temp = documentA
    setDocumentA(documentB)
    setDocumentB(temp)
  }

  const sampleComparisons = [
    {
      title: "Employment Contract vs Freelance Agreement",
      description: "Compare employment terms with freelance contractor agreements",
      docA: "Standard Employment Contract",
      docB: "Freelance Service Agreement",
    },
    {
      title: "SaaS Terms vs Enterprise License",
      description: "Analyze differences between SaaS and enterprise licensing terms",
      docA: "SaaS Terms of Service",
      docB: "Enterprise License Agreement",
    },
    {
      title: "Mutual NDA vs One-Way NDA",
      description: "Compare bilateral vs unilateral non-disclosure agreements",
      docA: "Mutual NDA",
      docB: "One-Way NDA",
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
            <Compare className="mr-2" size={16} />
            AI-Powered Document Comparison
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Clause Comparator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Compare legal documents and clauses side-by-side with intelligent AI analysis highlighting differences and
            recommendations
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckmarkFilled size={20} />
              <span>Side-by-Side Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Analytics size={20} />
              <span>Smart Difference Detection</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <WarningFilled size={20} />
              <span>Risk Comparison</span>
            </div>
          </div>
        </div>

        <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
          <TabList aria-label="Clause Comparator Tools" className="mb-8 flex justify-center">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <Tab className="tab-enhanced">Compare Text</Tab>
              <Tab className="tab-enhanced">Upload Documents</Tab>
              <Tab className="tab-enhanced">Sample Comparisons</Tab>
            </div>
          </TabList>

          <TabPanels>
            {/* Text Comparison Tab */}
            <TabPanel>
              <div className="space-y-8">
                {/* Input Section */}
                <Grid className="gap-8">
                  <Column sm={4} md={8} lg={8}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-blue-300">Document A</h2>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-all duration-300">
                            <Upload size={16} />
                          </button>
                        </div>
                      </div>
                      <TextArea
                        id="document-a"
                        labelText="Paste clause or document text"
                        placeholder="Paste the first clause or document here..."
                        rows={12}
                        value={documentA}
                        onChange={(e) => setDocumentA(e.target.value)}
                        className="enhanced-textarea"
                      />
                      <div className="mt-3 text-sm text-gray-400">{documentA.length} characters</div>
                    </div>
                  </Column>

                  <Column sm={4} md={8} lg={8}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-purple-300">Document B</h2>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-all duration-300">
                            <Upload size={16} />
                          </button>
                        </div>
                      </div>
                      <TextArea
                        id="document-b"
                        labelText="Paste clause or document text"
                        placeholder="Paste the second clause or document here..."
                        rows={12}
                        value={documentB}
                        onChange={(e) => setDocumentB(e.target.value)}
                        className="enhanced-textarea"
                      />
                      <div className="mt-3 text-sm text-gray-400">{documentB.length} characters</div>
                    </div>
                  </Column>
                </Grid>

                {/* Action Buttons */}
                <div className="flex justify-center items-center space-x-6">
                  <button
                    onClick={swapDocuments}
                    className="p-3 border-2 border-white/30 rounded-xl text-white hover:bg-white/10 transition-all duration-300 group"
                    title="Swap documents"
                  >
                    <ArrowsHorizontal size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={handleCompare}
                    disabled={isComparing || !documentA.trim() || !documentB.trim()}
                    className="px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isComparing ? (
                      <div className="flex items-center">
                        <Loading className="mr-3" />
                        Comparing with AI...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <Compare className="mr-3" size={24} />
                        Compare Documents
                      </span>
                    )}
                  </button>
                </div>

                {/* Results Section */}
                {hasComparison && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Comparison Results</h2>

                    <Grid className="gap-6 mb-8">
                      <Column sm={4} md={8} lg={8}>
                        <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 h-full">
                          <h3 className="font-semibold text-green-300 mb-4 flex items-center">
                            <CheckmarkFilled className="mr-2" size={20} />
                            Similarities Found
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <div className="text-green-200 font-medium">Confidentiality Obligations</div>
                              <div className="text-green-100 text-xs">
                                Both documents include similar confidentiality requirements
                              </div>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <div className="text-green-200 font-medium">Term Duration</div>
                              <div className="text-green-100 text-xs">Matching 2-year agreement periods</div>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <div className="text-green-200 font-medium">Governing Law</div>
                              <div className="text-green-100 text-xs">Both specify Delaware state law</div>
                            </div>
                          </div>
                        </div>
                      </Column>

                      <Column sm={4} md={8} lg={8}>
                        <div className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 h-full">
                          <h3 className="font-semibold text-orange-300 mb-4 flex items-center">
                            <WarningFilled className="mr-2" size={20} />
                            Key Differences
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                              <div className="text-orange-200 font-medium">Liability Limits</div>
                              <div className="text-orange-100 text-xs">
                                Doc A: $100K cap | Doc B: Unlimited liability
                              </div>
                            </div>
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                              <div className="text-orange-200 font-medium">Termination Notice</div>
                              <div className="text-orange-100 text-xs">Doc A: 30 days | Doc B: 60 days required</div>
                            </div>
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                              <div className="text-orange-200 font-medium">IP Ownership</div>
                              <div className="text-orange-100 text-xs">
                                Doc A: Shared rights | Doc B: Exclusive to company
                              </div>
                            </div>
                          </div>
                        </div>
                      </Column>
                    </Grid>

                    {/* Detailed Analysis */}
                    <div className="space-y-6">
                      <div className="p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                        <h3 className="font-semibold text-blue-300 mb-3 flex items-center">
                          <Analytics className="mr-2" size={20} />
                          AI Risk Analysis
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-blue-200 font-medium mb-2">Document A Risks:</div>
                            <ul className="text-blue-100 space-y-1">
                              <li>• Lower liability protection</li>
                              <li>• Shorter termination notice</li>
                              <li>• Shared IP rights may cause disputes</li>
                            </ul>
                          </div>
                          <div>
                            <div className="text-blue-200 font-medium mb-2">Document B Risks:</div>
                            <ul className="text-blue-100 space-y-1">
                              <li>• Unlimited liability exposure</li>
                              <li>• Longer commitment period</li>
                              <li>• More restrictive IP terms</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-purple-500/20 rounded-2xl border border-purple-500/30">
                        <h3 className="font-semibold text-purple-300 mb-3 flex items-center">
                          <CheckmarkFilled className="mr-2" size={20} />
                          AI Recommendations
                        </h3>
                        <div className="space-y-3 text-sm text-purple-200">
                          <div className="p-3 bg-purple-500/10 rounded-lg">
                            <div className="font-medium mb-1">Negotiate Liability Cap</div>
                            <div className="text-purple-100">
                              Consider Document A's $100K liability cap for Document B to reduce risk exposure
                            </div>
                          </div>
                          <div className="p-3 bg-purple-500/10 rounded-lg">
                            <div className="font-medium mb-1">Standardize Notice Periods</div>
                            <div className="text-purple-100">
                              Align termination notice to 30 days for both parties for consistency
                            </div>
                          </div>
                          <div className="p-3 bg-purple-500/10 rounded-lg">
                            <div className="font-medium mb-1">IP Rights Clarification</div>
                            <div className="text-purple-100">
                              Define clear IP ownership rules to prevent future disputes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabPanel>

            {/* Document Upload Tab */}
            <TabPanel>
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Upload Documents for Comparison</h2>
                  <p className="text-gray-300">Upload two documents to compare them side-by-side with AI analysis</p>
                </div>

                <Grid className="gap-8">
                  <Column sm={4} md={8} lg={8}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                      <h3 className="text-xl font-bold text-blue-300 mb-6">Document A</h3>
                      <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors duration-300 cursor-pointer group">
                        <Upload
                          size={48}
                          className="mx-auto mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                        />
                        <h4 className="text-lg font-semibold text-white mb-2">Upload First Document</h4>
                        <p className="text-gray-400 mb-4">PDF, DOC, DOCX up to 25MB</p>
                        <Button kind="secondary">Choose File</Button>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Supported formats:</span>
                          <span className="text-white">PDF, DOC, DOCX</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Max file size:</span>
                          <span className="text-white">25MB</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Processing time:</span>
                          <span className="text-white">~30 seconds</span>
                        </div>
                      </div>
                    </div>
                  </Column>

                  <Column sm={4} md={8} lg={8}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                      <h3 className="text-xl font-bold text-purple-300 mb-6">Document B</h3>
                      <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-colors duration-300 cursor-pointer group">
                        <Upload
                          size={48}
                          className="mx-auto mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                        />
                        <h4 className="text-lg font-semibold text-white mb-2">Upload Second Document</h4>
                        <p className="text-gray-400 mb-4">PDF, DOC, DOCX up to 25MB</p>
                        <Button kind="secondary">Choose File</Button>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Supported formats:</span>
                          <span className="text-white">PDF, DOC, DOCX</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Max file size:</span>
                          <span className="text-white">25MB</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Processing time:</span>
                          <span className="text-white">~30 seconds</span>
                        </div>
                      </div>
                    </div>
                  </Column>
                </Grid>

                <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <h4 className="text-blue-300 font-semibold mb-3">Advanced Comparison Features</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-200">
                    <div>
                      <div className="font-medium mb-2">📄 Document Structure Analysis</div>
                      <div>Compare document organization, clause ordering, and section hierarchy</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">🔍 Semantic Comparison</div>
                      <div>AI understands meaning, not just text differences</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">⚖️ Legal Risk Assessment</div>
                      <div>Identify which document has more favorable terms</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">📊 Visual Difference Mapping</div>
                      <div>Color-coded highlighting of changes and variations</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Sample Comparisons Tab */}
            <TabPanel>
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Sample Document Comparisons</h2>
                  <p className="text-gray-300">Explore pre-loaded document comparisons to see AI analysis in action</p>
                </div>

                <div className="grid gap-6">
                  {sampleComparisons.map((sample, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        setDocumentA(`Sample ${sample.docA} content...`)
                        setDocumentB(`Sample ${sample.docB} content...`)
                        setSelectedTab(0)
                        setTimeout(() => handleCompare(), 500)
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
                            {sample.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4">{sample.description}</p>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                              <span className="text-blue-300">{sample.docA}</span>
                            </div>
                            <ArrowRight size={16} className="text-gray-400" />
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                              <span className="text-purple-300">{sample.docB}</span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-6">
                          <Compare
                            size={32}
                            className="text-gray-400 group-hover:text-white transition-colors duration-300"
                          />
                        </div>
                      </div>

                      <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                        Click to compare →
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="px-8 py-3 border-2 border-white/30 rounded-xl text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    View More Sample Comparisons
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
