#!/usr/bin/env python3
"""
Lexora AI Backend Startup Script
"""
import os
import sys
import subprocess
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_requirements():
    """Check if all required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import sqlalchemy
        import transformers
        import torch
        logger.info("✅ All required packages are installed")
        return True
    except ImportError as e:
        logger.error(f"❌ Missing required package: {e}")
        return False

def install_requirements():
    """Install required packages"""
    logger.info("📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        logger.info("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ Failed to install requirements: {e}")
        return False

def check_environment():
    """Check environment variables"""
    required_vars = ["DATABASE_URL"]
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.warning(f"⚠️  Missing environment variables: {', '.join(missing_vars)}")
        logger.info("Please set these in your .env file")
        return False
    
    logger.info("✅ Environment variables configured")
    return True

def start_server():
    """Start the FastAPI server"""
    logger.info("🚀 Starting Lexora AI Backend Server...")
    try:
        import uvicorn
        uvicorn.run(
            "app:app",
            host="0.0.0.0",
            port=5000,
            reload=True,
            log_level="info"
        )
    except Exception as e:
        logger.error(f"❌ Failed to start server: {e}")
        sys.exit(1)

def main():
    """Main startup function"""
    logger.info("🔧 Lexora AI Backend Setup")
    
    # Check if requirements are installed
    if not check_requirements():
        logger.info("Installing missing requirements...")
        if not install_requirements():
            sys.exit(1)
    
    # Check environment
    if not check_environment():
        logger.info("Please configure your environment variables and try again")
        sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()
