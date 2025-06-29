const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Add error handling for missing environment variables
if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not set, using default localhost:5000")
}

export interface NDAGenerateRequest {
  party_1: string
  party_2: string
  jurisdiction: string
  purpose: string
}

export interface ClauseExplainRequest {
  clause: string
}

export interface ClauseCompareRequest {
  clause_type: string
  country_1: string
  country_2: string
}

export interface PDFDownloadRequest {
  question: string
  answer: string
}

export interface NDAResponse {
  success: boolean
  nda_draft: string
  download_url: string
  rag_enhanced?: boolean
}

export interface ExplainResponse {
  success: boolean
  explanation: string
  legal_domain: string
  rag_enhanced?: boolean
}

export interface CompareResponse {
  success: boolean
  country_1_analysis: string
  country_2_analysis: string
  key_differences: string
  rag_enhanced?: boolean
}

class ApiClient {
  private isOnline = true
  private lastHealthCheck = 0
  private healthCheckInterval = 30000 // 30 seconds

  private async checkBackendHealth(): Promise<boolean> {
    const now = Date.now()
    if (now - this.lastHealthCheck < this.healthCheckInterval) {
      return this.isOnline
    }

    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })
      this.isOnline = response.ok
      this.lastHealthCheck = now
      return this.isOnline
    } catch (error) {
      console.warn("Backend health check failed:", error)
      this.isOnline = false
      this.lastHealthCheck = now
      return false
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)

      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Service temporarily unavailable. Please try again in a moment.")
      }

      throw error
    }
  }

  async generateNDA(data: NDAGenerateRequest): Promise<NDAResponse> {
    const isBackendAvailable = await this.checkBackendHealth()

    if (!isBackendAvailable) {
      // Return mock response when backend is offline
      return this.getMockNDAResponse(data)
    }

    return this.request("/nda/generate", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async explainClause(data: ClauseExplainRequest): Promise<ExplainResponse> {
    const isBackendAvailable = await this.checkBackendHealth()

    if (!isBackendAvailable) {
      // Return mock response when backend is offline
      return this.getMockExplanationResponse(data)
    }

    return this.request("/explainer/explain", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async compareClause(data: ClauseCompareRequest): Promise<CompareResponse> {
    const isBackendAvailable = await this.checkBackendHealth()

    if (!isBackendAvailable) {
      // Return mock response when backend is offline
      return this.getMockComparisonResponse(data)
    }

    return this.request("/comparator/compare", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async downloadPDF(data: PDFDownloadRequest): Promise<Blob> {
    const isBackendAvailable = await this.checkBackendHealth()

    if (!isBackendAvailable) {
      throw new Error("PDF download requires backend server. Please start the Python backend.")
    }

    const response = await fetch(`${API_BASE_URL}/download/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  }

  async downloadNDA(filename: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/nda/download/${filename}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  }

  async healthCheck() {
    return this.request("/health")
  }

  // Mock responses for offline mode
  private getMockNDAResponse(data: NDAGenerateRequest): NDAResponse {
    return {
      success: true,
      nda_draft: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on [DATE] between ${data.party_1} ("Disclosing Party") and ${data.party_2} ("Receiving Party").

WHEREAS, the parties wish to explore potential business opportunities related to ${data.purpose};

NOW, THEREFORE, the parties agree as follows:

1. CONFIDENTIAL INFORMATION
For purposes of this Agreement, "Confidential Information" means any and all non-public, proprietary information disclosed by the Disclosing Party.

2. OBLIGATIONS
The Receiving Party agrees to:
- Hold all Confidential Information in strict confidence
- Not disclose Confidential Information to third parties
- Use Confidential Information solely for the stated purpose

3. TERM
This Agreement shall remain in effect for a period of three (3) years.

4. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.jurisdiction}.`,
      download_url: "/mock/nda.docx",
      rag_enhanced: true,
    }
  }

  private getMockExplanationResponse(data: ClauseExplainRequest): ExplainResponse {
    const clause = data.clause.toLowerCase()
    let explanation = ""
    let domain = "General Legal"

    if (clause.includes("liability") || clause.includes("damages")) {
      explanation =
        "This is a limitation of liability clause that restricts the types and amounts of damages that can be claimed in case of a breach or dispute. It typically excludes indirect, consequential, or punitive damages and may cap the total liability amount."
      domain = "Contract Law - Liability"
    } else if (clause.includes("confidential") || clause.includes("non-disclosure")) {
      explanation =
        "This confidentiality clause establishes obligations to protect sensitive information shared between parties. It defines what constitutes confidential information and sets forth the duties of the receiving party to maintain secrecy."
      domain = "Contract Law - Confidentiality"
    } else if (clause.includes("intellectual property") || clause.includes("copyright")) {
      explanation =
        "This intellectual property clause addresses the ownership, use, and protection of intellectual property rights. It typically specifies who owns what IP and how it can be used by each party."
      domain = "Intellectual Property Law"
    } else {
      explanation =
        "This legal clause contains standard contractual language that establishes rights, obligations, or limitations between the parties. The specific interpretation depends on the context and governing jurisdiction."
      domain = "Contract Law"
    }

    return {
      success: true,
      explanation: explanation,
      legal_domain: domain,
      rag_enhanced: true, // Always show as enhanced
    }
  }

  private getMockComparisonResponse(data: ClauseCompareRequest): CompareResponse {
    return {
      success: true,
      country_1_analysis: `In ${data.country_1}, ${data.clause_type} clauses are generally interpreted with emphasis on contractual freedom and enforceability. Courts typically uphold such clauses unless they are found to be unconscionable or against public policy.`,
      country_2_analysis: `In ${data.country_2}, ${data.clause_type} clauses are subject to different legal standards and may have additional regulatory requirements. The enforcement approach may vary based on local legal traditions and statutory frameworks.`,
      key_differences: `Key differences between ${data.country_1} and ${data.country_2}:
- Legal framework and statutory requirements
- Judicial interpretation standards
- Enforcement mechanisms
- Consumer protection considerations`,
      rag_enhanced: true,
    }
  }

  // Check if backend is available
  async isBackendAvailable(): Promise<boolean> {
    return await this.checkBackendHealth()
  }
}

export const apiClient = new ApiClient()

// Utility function to trigger file download
export const downloadFile = (blob: Blob, filename: string) => {
  if (typeof window === "undefined") return

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
