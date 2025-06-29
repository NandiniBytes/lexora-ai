"use client"

import { useState } from "react"
import {
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Grid,
  Column,
  ProgressIndicator,
  ProgressStep,
  Loading,
  Checkbox,
  RadioButton,
  RadioButtonGroup,
} from "@carbon/react"
import { Navigation } from "@/components/navigation"
import { DocumentAdd, Download, Information, CheckmarkFilled, Security, Time, Edit } from "@carbon/icons-react"
import { apiClient, downloadFile, type NDAGenerateRequest } from "@/lib/api"

export default function NDAGenerator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [generatedNDA, setGeneratedNDA] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [error, setError] = useState("")

  const [ndaForm, setNdaForm] = useState({
    // Basic Information
    partyA: "",
    partyAAddress: "",
    partyB: "",
    partyBAddress: "",
    purpose: "",

    // Agreement Terms
    duration: "",
    jurisdiction: "",
    ndaType: "mutual",
    includeNonSolicitation: false,
    includeNonCompete: false,

    // Advanced Options
    penaltyAmount: "",
    returnPeriod: "30",
    survivingClauses: true,
    customClauses: "",
  })

  const handleFormChange = (field: string, value: string | boolean) => {
    setNdaForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError("")

    try {
      const request: NDAGenerateRequest = {
        party_1: ndaForm.partyA,
        party_2: ndaForm.partyB,
        jurisdiction: ndaForm.jurisdiction,
        purpose: ndaForm.purpose,
      }

      const response = await apiClient.generateNDA(request)
      setGeneratedNDA(response.nda_draft)
      setDownloadUrl(response.download_url)
      setIsGenerated(true)
    } catch (err) {
      setError("Failed to generate NDA. Please try again.")
      console.error("NDA generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadNDA = async () => {
    if (!downloadUrl) return

    try {
      const filename = downloadUrl.split("/").pop() || "nda.docx"
      const blob = await apiClient.downloadNDA(filename)
      downloadFile(blob, filename)
    } catch (err) {
      setError("Failed to download NDA. Please try again.")
      console.error("Download error:", err)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const blob = await apiClient.downloadPDF({
        question: `NDA Generation for ${ndaForm.partyA} and ${ndaForm.partyB}`,
        answer: generatedNDA,
      })
      downloadFile(blob, `NDA_${Date.now()}.pdf`)
    } catch (err) {
      setError("Failed to download PDF. Please try again.")
      console.error("PDF download error:", err)
    }
  }

  const steps = ["Basic Information", "Agreement Terms", "Review & Generate"]

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
            <DocumentAdd className="mr-2" size={16} />
            AI-Powered Document Generation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            NDA Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Create comprehensive, legally sound Non-Disclosure Agreements in minutes with our advanced AI system
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckmarkFilled size={20} />
              <span>Legally Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Security size={20} />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <Time size={20} />
              <span>Generated in Minutes</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-12">
          <ProgressIndicator currentIndex={currentStep} className="max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <ProgressStep key={index} label={step} />
            ))}
          </ProgressIndicator>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden">
          <Grid className="min-h-[600px]">
            {/* Form Section */}
            <Column sm={4} md={10} lg={10}>
              <div className="p-8 h-full">
                {/* Step 1: Basic Information */}
                {currentStep === 0 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white mb-8">Basic Information</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-blue-300 mb-4">Disclosing Party</h3>
                        <TextInput
                          id="partyA"
                          labelText="Company/Individual Name"
                          placeholder="Enter disclosing party name"
                          value={ndaForm.partyA}
                          onChange={(e) => handleFormChange("partyA", e.target.value)}
                          className="enhanced-input"
                        />
                        <TextArea
                          id="partyAAddress"
                          labelText="Address"
                          placeholder="Enter complete address"
                          rows={3}
                          value={ndaForm.partyAAddress}
                          onChange={(e) => handleFormChange("partyAAddress", e.target.value)}
                          className="enhanced-textarea"
                        />
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-purple-300 mb-4">Receiving Party</h3>
                        <TextInput
                          id="partyB"
                          labelText="Company/Individual Name"
                          placeholder="Enter receiving party name"
                          value={ndaForm.partyB}
                          onChange={(e) => handleFormChange("partyB", e.target.value)}
                          className="enhanced-input"
                        />
                        <TextArea
                          id="partyBAddress"
                          labelText="Address"
                          placeholder="Enter complete address"
                          rows={3}
                          value={ndaForm.partyBAddress}
                          onChange={(e) => handleFormChange("partyBAddress", e.target.value)}
                          className="enhanced-textarea"
                        />
                      </div>
                    </div>

                    <div>
                      <TextArea
                        id="purpose"
                        labelText="Purpose of Disclosure"
                        placeholder="Describe the business purpose and context for sharing confidential information..."
                        rows={4}
                        value={ndaForm.purpose}
                        onChange={(e) => handleFormChange("purpose", e.target.value)}
                        className="enhanced-textarea"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Agreement Terms */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white mb-8">Agreement Terms</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <Select
                          id="duration"
                          labelText="Agreement Duration"
                          value={ndaForm.duration}
                          onChange={(e) => handleFormChange("duration", e.target.value)}
                          className="enhanced-select"
                        >
                          <SelectItem value="" text="Select duration" />
                          <SelectItem value="1-year" text="1 Year" />
                          <SelectItem value="2-years" text="2 Years" />
                          <SelectItem value="3-years" text="3 Years" />
                          <SelectItem value="5-years" text="5 Years" />
                          <SelectItem value="indefinite" text="Indefinite" />
                        </Select>

                        <Select
                          id="jurisdiction"
                          labelText="Governing Jurisdiction"
                          value={ndaForm.jurisdiction}
                          onChange={(e) => handleFormChange("jurisdiction", e.target.value)}
                          className="enhanced-select"
                        >
                          <SelectItem value="" text="Select jurisdiction" />
                          <SelectItem value="United States" text="United States" />
                          <SelectItem value="United Kingdom" text="United Kingdom" />
                          <SelectItem value="Canada" text="Canada" />
                          <SelectItem value="Australia" text="Australia" />
                          <SelectItem value="European Union" text="European Union" />
                        </Select>

                        <div className="space-y-4">
                          <label className="text-white font-medium">NDA Type</label>
                          <RadioButtonGroup
                            name="ndaType"
                            value={ndaForm.ndaType}
                            onChange={(value) => handleFormChange("ndaType", value)}
                          >
                            <RadioButton
                              labelText="Mutual (Both parties share confidential information)"
                              value="mutual"
                            />
                            <RadioButton
                              labelText="One-way (Only one party shares confidential information)"
                              value="oneway"
                            />
                          </RadioButtonGroup>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <TextInput
                          id="penaltyAmount"
                          labelText="Penalty Amount (Optional)"
                          placeholder="e.g., $50,000"
                          value={ndaForm.penaltyAmount}
                          onChange={(e) => handleFormChange("penaltyAmount", e.target.value)}
                          className="enhanced-input"
                        />

                        <Select
                          id="returnPeriod"
                          labelText="Return Period for Materials"
                          value={ndaForm.returnPeriod}
                          onChange={(e) => handleFormChange("returnPeriod", e.target.value)}
                          className="enhanced-select"
                        >
                          <SelectItem value="7" text="7 Days" />
                          <SelectItem value="14" text="14 Days" />
                          <SelectItem value="30" text="30 Days" />
                          <SelectItem value="60" text="60 Days" />
                        </Select>

                        <div className="space-y-4">
                          <label className="text-white font-medium">Additional Clauses</label>
                          <div className="space-y-3">
                            <Checkbox
                              id="nonSolicitation"
                              labelText="Include Non-Solicitation Clause"
                              checked={ndaForm.includeNonSolicitation}
                              onChange={(checked) => handleFormChange("includeNonSolicitation", checked)}
                            />
                            <Checkbox
                              id="nonCompete"
                              labelText="Include Non-Compete Clause"
                              checked={ndaForm.includeNonCompete}
                              onChange={(checked) => handleFormChange("includeNonCompete", checked)}
                            />
                            <Checkbox
                              id="survivingClauses"
                              labelText="Include Surviving Clauses"
                              checked={ndaForm.survivingClauses}
                              onChange={(checked) => handleFormChange("survivingClauses", checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <TextArea
                      id="customClauses"
                      labelText="Custom Clauses (Optional)"
                      placeholder="Add any specific clauses or requirements..."
                      rows={4}
                      value={ndaForm.customClauses}
                      onChange={(e) => handleFormChange("customClauses", e.target.value)}
                      className="enhanced-textarea"
                    />
                  </div>
                )}

                {/* Step 3: Review & Generate */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white mb-8">Review & Generate</h2>

                    {!isGenerated ? (
                      <div className="space-y-6">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h3 className="text-xl font-semibold text-white mb-4">Agreement Summary</h3>
                          <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-3">
                              <div>
                                <span className="text-gray-400">Disclosing Party:</span>
                                <div className="text-white font-medium">{ndaForm.partyA || "Not specified"}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Receiving Party:</span>
                                <div className="text-white font-medium">{ndaForm.partyB || "Not specified"}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Duration:</span>
                                <div className="text-white font-medium">{ndaForm.duration || "Not specified"}</div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <span className="text-gray-400">Type:</span>
                                <div className="text-white font-medium capitalize">{ndaForm.ndaType}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Jurisdiction:</span>
                                <div className="text-white font-medium">{ndaForm.jurisdiction || "Not specified"}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Purpose:</span>
                                <div className="text-white font-medium">{ndaForm.purpose || "Not specified"}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={handleGenerate}
                            disabled={
                              isGenerating ||
                              !ndaForm.partyA ||
                              !ndaForm.partyB ||
                              !ndaForm.purpose ||
                              !ndaForm.jurisdiction
                            }
                            className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isGenerating ? (
                              <div className="flex items-center">
                                <Loading className="mr-3" />
                                Generating Your NDA...
                              </div>
                            ) : (
                              <span className="flex items-center">
                                <DocumentAdd className="mr-3" size={24} />
                                Generate NDA Document
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                            <CheckmarkFilled size={32} className="text-green-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">NDA Generated Successfully!</h3>
                          <p className="text-gray-300">Your legally compliant NDA is ready for download and use.</p>
                        </div>

                        {/* Generated NDA Preview */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 max-h-96 overflow-y-auto">
                          <h4 className="text-lg font-semibold text-white mb-4">Generated NDA Preview</h4>
                          <div className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{generatedNDA}</div>
                        </div>

                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={handleDownloadNDA}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-semibold transform hover:scale-105 transition-all duration-300"
                          >
                            <Download className="mr-2 inline" size={20} />
                            Download DOCX
                          </button>
                          <button
                            onClick={handleDownloadPDF}
                            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold transform hover:scale-105 transition-all duration-300"
                          >
                            <Download className="mr-2 inline" size={20} />
                            Download PDF
                          </button>
                          <button
                            onClick={() => {
                              setIsGenerated(false)
                              setCurrentStep(0)
                            }}
                            className="px-8 py-3 border-2 border-white/30 rounded-xl text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                          >
                            <Edit className="mr-2 inline" size={20} />
                            Create New NDA
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                {!isGenerated && (
                  <div className="flex justify-between pt-8 border-t border-white/10">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="px-6 py-3 border-2 border-white/30 rounded-xl text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {currentStep < 2 && (
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold transform hover:scale-105 transition-all duration-300"
                      >
                        Next Step
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Column>

            {/* Preview Section */}
            <Column sm={4} md={6} lg={6}>
              <div className="bg-white/5 backdrop-blur-sm h-full p-8 border-l border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Live Preview</h3>

                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-white">NON-DISCLOSURE AGREEMENT</h4>
                      <p className="text-gray-400 text-xs">Generated by Lexora AI</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Between:</span>
                        <div className="text-white font-medium">{ndaForm.partyA || "[Disclosing Party]"}</div>
                        <div className="text-gray-300 text-xs">{ndaForm.partyAAddress || "[Address]"}</div>
                      </div>

                      <div>
                        <span className="text-gray-400">And:</span>
                        <div className="text-white font-medium">{ndaForm.partyB || "[Receiving Party]"}</div>
                        <div className="text-gray-300 text-xs">{ndaForm.partyBAddress || "[Address]"}</div>
                      </div>

                      <div>
                        <span className="text-gray-400">Purpose:</span>
                        <div className="text-white text-xs">{ndaForm.purpose || "[Purpose of disclosure]"}</div>
                      </div>

                      <div>
                        <span className="text-gray-400">Jurisdiction:</span>
                        <div className="text-white text-xs">{ndaForm.jurisdiction || "[Governing jurisdiction]"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <div className="flex items-start">
                      <Information className="mr-3 mt-1 text-blue-400" size={20} />
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-2">AI Enhancement Active</h4>
                        <p className="text-blue-200 text-xs">
                          Your document includes industry-standard clauses, compliance checks, and jurisdiction-specific
                          requirements powered by IBM Granite AI.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-white font-medium">Included Clauses:</h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Definition of Confidential Information</li>
                      <li>• Obligations of Receiving Party</li>
                      <li>• Term and Termination</li>
                      <li>• Return of Materials</li>
                      <li>• Legal Remedies</li>
                      <li>• Governing Law</li>
                      {ndaForm.includeNonSolicitation && <li>• Non-Solicitation</li>}
                      {ndaForm.includeNonCompete && <li>• Non-Compete</li>}
                      {ndaForm.survivingClauses && <li>• Surviving Provisions</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </Column>
          </Grid>
        </div>
      </div>
    </div>
  )
}
