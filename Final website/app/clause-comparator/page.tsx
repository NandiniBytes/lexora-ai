"use client"

import { useState } from "react"
import {
  Button,
  Grid,
  Column,
  Loading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  SelectItem,
} from "@carbon/react"
import { Compare, Upload, CheckmarkFilled, WarningFilled, Analytics, ArrowRight, Download } from "@carbon/icons-react"
import { Navigation } from "@/components/navigation"
import { apiClient, downloadFile, type ClauseCompareRequest } from "@/lib/api"

export default function ClauseComparator() {
  const [isComparing, setIsComparing] = useState(false)
  const [hasComparison, setHasComparison] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [error, setError] = useState("")

  // For cross-border comparison
  const [clauseType, setClauseType] = useState("")
  const [country1, setCountry1] = useState("")
  const [country2, setCountry2] = useState("")
  const [comparisonResult, setComparisonResult] = useState<{
    country_1: string
    country_2: string
    key_differences: string
  } | null>(null)

  const handleCompare = async () => {
    if (!clauseType || !country1 || !country2) return

    setIsComparing(true)
    setError("")

    try {
      const request: ClauseCompareRequest = {
        clause_type: clauseType,
        country_1: country1,
        country_2: country2,
      }

      const response = await apiClient.compareClause(request)
      setComparisonResult(response)
      setHasComparison(true)
    } catch (err) {
      setError("Failed to compare clauses. Please try again.")
      console.error("Clause comparison error:", err)
    } finally {
      setIsComparing(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!comparisonResult) return

    try {
      const blob = await apiClient.downloadPDF({
        question: `Cross-border comparison of ${clauseType} between ${country1} and ${country2}`,
        answer: `${country1}: ${comparisonResult.country_1}\n\n${country2}: ${comparisonResult.country_2}\n\nKey Differences: ${comparisonResult.key_differences}`,
      })
      downloadFile(blob, `Clause_Comparison_${Date.now()}.pdf`)
    } catch (err) {
      setError("Failed to download PDF. Please try again.")
      console.error("PDF download error:", err)
    }
  }

  const clauseTypes = [
    "Non-Disclosure Agreement",
    "Limitation of Liability",
    "Intellectual Property Rights",
    "Employment Termination",
    "Data Protection",
    "Force Majeure",
    "Governing Law",
    "Dispute Resolution",
    "Non-Compete Clause",
    "Confidentiality",
  ]

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "Singapore",
    "Netherlands",
    "Switzerland",
  ]

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
            AI-Powered Cross-Border Legal Comparison
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Clause Comparator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Compare how legal clauses are interpreted and enforced across different jurisdictions with intelligent AI
            analysis
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckmarkFilled size={20} />
              <span>Cross-Border Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Analytics size={20} />
              <span>Jurisdiction Comparison</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <WarningFilled size={20} />
              <span>Risk Comparison</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-center">
            {error}
          </div>
        )}

        <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
          <TabList aria-label="Clause Comparator Tools" className="mb-8 flex justify-center">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <Tab className="tab-enhanced">Cross-Border Comparison</Tab>
              <Tab className="tab-enhanced">Upload Documents</Tab>
              <Tab className="tab-enhanced">Sample Comparisons</Tab>
            </div>
          </TabList>

          <TabPanels>
            {/* Cross-Border Comparison Tab */}
            <TabPanel>
              <div className="space-y-8">
                {/* Input Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">Cross-Border Legal Comparison</h2>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <Select
                        id="clause-type"
                        labelText="Clause Type"
                        value={clauseType}
                        onChange={(e) => setClauseType(e.target.value)}
                        className="enhanced-select"
                      >
                        <SelectItem value="" text="Select clause type" />
                        {clauseTypes.map((type) => (
                          <SelectItem key={type} value={type} text={type} />
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Select
                        id="country-1"
                        labelText="Country 1"
                        value={country1}
                        onChange={(e) => setCountry1(e.target.value)}
                        className="enhanced-select"
                      >
                        <SelectItem value="" text="Select first country" />
                        {countries.map((country) => (
                          <SelectItem key={country} value={country} text={country} />
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Select
                        id="country-2"
                        labelText="Country 2"
                        value={country2}
                        onChange={(e) => setCountry2(e.target.value)}
                        className="enhanced-select"
                      >
                        <SelectItem value="" text="Select second country" />
                        {countries
                          .filter((c) => c !== country1)
                          .map((country) => (
                            <SelectItem key={country} value={country} text={country} />
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleCompare}
                      disabled={isComparing || !clauseType || !country1 || !country2}
                      className="px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isComparing ? (
                        <div className="flex items-center">
                          <Loading className="mr-3" />
                          Comparing Legal Systems...
                        </div>
                      ) : (
                        <span className="flex items-center">
                          <Compare className="mr-3" size={24} />
                          Compare Across Jurisdictions
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Results Section */}
                {hasComparison && comparisonResult && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-white">Cross-Border Comparison Results</h2>
                      <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-sm font-semibold transform hover:scale-105 transition-all duration-300"
                      >
                        <Download className="mr-2 inline" size={16} />
                        Download PDF
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                        <h3 className="font-semibold text-blue-300 mb-4 flex items-center">🇺🇸 {country1}</h3>
                        <div className="text-blue-200 text-sm leading-relaxed whitespace-pre-wrap">
                          {comparisonResult.country_1}
                        </div>
                      </div>

                      <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                        <h3 className="font-semibold text-purple-300 mb-4 flex items-center">🇩🇪 {country2}</h3>
                        <div className="text-purple-200 text-sm leading-relaxed whitespace-pre-wrap">
                          {comparisonResult.country_2}
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
                      <h3 className="font-semibold text-orange-300 mb-4 flex items-center">
                        <WarningFilled className="mr-2" size={20} />
                        Key Differences and Risk Flags
                      </h3>
                      <div className="text-orange-200 text-sm leading-relaxed whitespace-pre-wrap">
                        {comparisonResult.key_differences}
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
                    </div>
                  </Column>
                </Grid>
              </div>
            </TabPanel>

            {/* Sample Comparisons Tab */}
            <TabPanel>
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Sample Cross-Border Comparisons</h2>
                  <p className="text-gray-300">Explore pre-loaded comparisons to see AI analysis in action</p>
                </div>

                <div className="grid gap-6">
                  {sampleComparisons.map((sample, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        setClauseType("Non-Disclosure Agreement")
                        setCountry1("United States")
                        setCountry2("Germany")
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
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
