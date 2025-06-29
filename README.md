# ⚖️ Lexora.AI – Decode Legalese, the Smart Way

[🌐 Visit the Live Web App](https://v0-lexora-ai-website-seven.vercel.app/)  
Built with 🧠 IBM Watsonx | 🤖 Granite LLM | ⚙️ FastAPI | 🧪 LangChain | 💅 Vercel + V0

---

## ✨ What is Lexora.AI?

**Lexora.AI** is your cross-border legal assistant, powered by cutting-edge AI. Whether you’re a startup founder or a legal intern, Lexora helps you:

- 🔍 **Explain** complex legal clauses  
- 📑 **Generate** customized NDAs  
- ⚖️ **Compare** clauses across different jurisdictions  
- 🧠 **Retrieve** legal context using RAG (Retrieval-Augmented Generation)  

---

## 🛠️ Tech Stack

| Layer       | Tech Used                            |
|-------------|--------------------------------------|
| 🌐 Frontend | [V0.dev](https://v0.dev) + React + Tailwind CSS |
| 🚀 Backend  | FastAPI, Python, LangChain, Faiss    |
| 🧠 LLM      | IBM Watsonx + Granite-3-3-8B-Instruct |
| 🔌 Hosting  | Backend via Ngrok (dev) | Frontend via Vercel |

---

## 🔮 Features

- 🧾 **Clause Explainer** — Enter a clause, get a simplified explanation.  
- 🤝 **NDA Generator** — Auto-generate professional NDAs with one click.  
- 🌍 **Clause Comparator** — Compare how a clause is interpreted across two countries.  
- 📚 **Legal RAG** — Retrieve relevant legal context before generating outputs.

---

## 🚀 Try It Live

👉 [**Web App**](https://v0-lexora-ai-website-seven.vercel.app/)  
👉 **Backend (Dev)**: Exposed locally via **ngrok** — see setup below

---

## 🧑‍💻 Local Setup Instructions

### 🔂 Backend Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/lexora-ai.git
   cd lexora-ai/backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create `.env` file**
   ```env
   IBM_API_KEY=your_ibm_api_key
   IBM_PROJECT_ID=your_project_id
   IBM_MODEL_ID=ibm/granite-3-3-8b-instruct
   IBM_GRANITE_URL=https://us-south.ml.cloud.ibm.com
   ```

4. **Start FastAPI server**
   ```bash
   uvicorn app:app --reload
   ```

5. **Expose backend using ngrok**
   ```bash
   ngrok http 8000
   ```
   Use the generated `https://xxxxx.ngrok-free.app` as your backend URL.

---

### 💡 Getting IBM Watsonx Credentials

- Sign up at [IBM Cloud](https://cloud.ibm.com)
- Go to **Watsonx.ai** and create a project
- Enable **Foundation Models** in your project
- Generate your **IAM API Key**
- Find your **Project ID** from the Watsonx dashboard

---

### 💻 Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set environment variable:
   ```env
   VITE_BACKEND_URL=https://xxxxx.ngrok-free.app
   ```

4. Run frontend dev server:
   ```bash
   npm run dev
   ```

Or use [Vercel](https://vercel.com) for hosting (we used V0.dev to design and deploy with Vercel).

---

## 🧪 API Endpoints

### 1. Clause Explainer
**POST** `/api/explainer/explain`
```json
{
  "clause_text": "This agreement shall be governed by the laws of India."
}
```

### 2. NDA Generator
**POST** `/api/generator/generate`
```json
{
  "disclosing_party": "ABC Corp",
  "receiving_party": "XYZ Pvt Ltd",
  "disclosure_description": "Evaluating AI model performance for collaboration."
}
```

### 3. Clause Comparator
**POST** `/api/comparator/compare`
```json
{
  "clause_type": "confidentiality",
  "country_1": "India",
  "country_2": "USA"
}
```

---

## 🧠 How We Used IBM Granite LLM

- Used **Watsonx’s Granite-3-3-8B-Instruct** model to power all clause explanations, comparisons, and NDA generation
- Token and authentication handled via IBM IAM service
- Model queried with formatted prompts using FastAPI + LangChain
- RAG implementation done with FAISS vector search + custom clause dataset

---

## 🛡️ Legal Disclaimer

This tool is for **educational and testing purposes only**.  
Lexora.AI does **not provide real legal advice**.

---

## 🧑‍🚀 Team Lexora.AI

| Role         | Name                            |
|--------------|---------------------------------|
| AI & Backend | Nandini (You 💅)                |
| Frontend     | Your Teammate 💻                |
| Inspiration  | Watsonx, Vercel, Open Source 🧠 |

---

## 💬 Final Note

Lexora.AI is a bold leap into legal-tech, making legal understanding easier and faster for everyone, using AI ethically and creatively.

> “Code less. Comply more. The future of legal is Lexora.”

---