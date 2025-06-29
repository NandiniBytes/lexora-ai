#!/usr/bin/env python3
"""
Setup script for legal documents directory and sample documents
"""
import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_legal_docs_directory():
    """Create the legal documents directory structure"""
    docs_path = Path("data/legal_docs")
    docs_path.mkdir(parents=True, exist_ok=True)
    
    # Create subdirectories for different types of legal documents
    subdirs = [
        "contracts",
        "ndas",
        "employment",
        "intellectual_property",
        "compliance",
        "international"
    ]
    
    for subdir in subdirs:
        (docs_path / subdir).mkdir(exist_ok=True)
    
    logger.info(f"Created legal documents directory structure at {docs_path}")
    return docs_path

def create_sample_legal_documents(docs_path: Path):
    """Create sample legal documents for testing"""
    
    # Sample NDA content
    nda_content = """
    NON-DISCLOSURE AGREEMENT
    
    This Non-Disclosure Agreement ("Agreement") is entered into between the parties for the purpose of preventing the unauthorized disclosure of Confidential Information.
    
    1. DEFINITION OF CONFIDENTIAL INFORMATION
    Confidential Information means any and all non-public, proprietary or confidential information, including but not limited to:
    - Technical data, trade secrets, know-how, research, product plans
    - Business information, customer lists, financial information
    - Any other information that should reasonably be recognized as confidential
    
    2. OBLIGATIONS OF RECEIVING PARTY
    The Receiving Party agrees to:
    - Hold and maintain the Confidential Information in strict confidence
    - Not disclose the Confidential Information to third parties
    - Use the Confidential Information solely for the Purpose
    
    3. TERM
    This Agreement shall remain in effect for a period of [X] years from the date of execution.
    
    4. GOVERNING LAW
    This Agreement shall be governed by the laws of [Jurisdiction].
    """
    
    # Sample contract content
    contract_content = """
    SERVICE AGREEMENT
    
    This Service Agreement governs the provision of services between the parties.
    
    1. SCOPE OF SERVICES
    The Service Provider agrees to provide the following services:
    - Professional consulting services
    - Technical support and maintenance
    - Training and documentation
    
    2. PAYMENT TERMS
    - Payment shall be made within 30 days of invoice
    - Late payments may incur interest charges
    - All fees are non-refundable unless otherwise specified
    
    3. LIABILITY LIMITATIONS
    IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES.
    
    4. INTELLECTUAL PROPERTY
    All intellectual property rights shall remain with the respective owners.
    
    5. TERMINATION
    Either party may terminate this agreement with 30 days written notice.
    """
    
    # Sample employment content
    employment_content = """
    EMPLOYMENT AGREEMENT
    
    This Employment Agreement establishes the terms of employment between the Company and Employee.
    
    1. POSITION AND DUTIES
    Employee shall serve in the capacity of [Title] and perform duties as assigned.
    
    2. COMPENSATION
    - Base salary of $[Amount] per year
    - Eligible for annual bonus based on performance
    - Standard benefits package including health insurance
    
    3. CONFIDENTIALITY
    Employee agrees to maintain confidentiality of all proprietary information.
    
    4. NON-COMPETE
    Employee agrees not to compete with Company for [X] months after termination.
    
    5. TERMINATION
    Employment may be terminated by either party with appropriate notice.
    """
    
    # Write sample documents
    documents = [
        ("ndas/sample_nda.txt", nda_content),
        ("contracts/service_agreement.txt", contract_content),
        ("employment/employment_agreement.txt", employment_content)
    ]
    
    for file_path, content in documents:
        full_path = docs_path / file_path
        with open(full_path, 'w') as f:
            f.write(content)
        logger.info(f"Created sample document: {full_path}")

def main():
    """Main setup function"""
    logger.info("Setting up legal documents directory...")
    
    # Create directory structure
    docs_path = create_legal_docs_directory()
    
    # Create sample documents
    create_sample_legal_documents(docs_path)
    
    logger.info("Legal documents setup complete!")
    logger.info(f"You can add more legal documents to: {docs_path}")
    logger.info("Supported formats: .txt, .pdf, .docx")

if __name__ == "__main__":
    main()
