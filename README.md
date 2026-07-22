# 🌾 KrishiRakshak - Smart AI Farming Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

> **KrishiRakshak ("Crop Protector")** is an AI-powered end-to-end platform designed to empower Indian farmers with instant plant disease diagnosis, hyper-local weather alerts, real-time mandi prices, and multilingual AI advisory.

---

## 🚀 Live Demo & Deployment

🔗 **Live Platform Link:** [https://krishirakshak-app.netlify.app/](https://krishirakshak-app.netlify.app/) 

---

## ✨ Key Features

### 📸 1. AI Crop Disease Detector
- **Instant Scan:** Upload or capture a picture of an infected leaf to get an instant AI-powered diagnosis (<2 seconds).
- **High Accuracy:** Powered by MobileNetV2 / Deep Learning trained on 54+ disease classes across major crops (Banana, Chilli, Maize, Mango, etc.).
- **Actionable Advice:** Displays confidence score along with ICAR-approved treatment protocols, organic pesticides, and preventive steps.
- **Batch Processing:** Ability to upload multiple images at once (up to 10 images).

### 🌦️ 2. Hyper-Local Weather & Alerts
- Real-time 7-day forecast via Open-Meteo.
- Specialized agricultural insights: **Spray Suitability Index**, frost warnings, and heatwave alerts.

### 💰 3. Live Mandi Prices & Analytics
- Live crop rates sourced directly from government APIs (`data.gov.in`).
- Visual 7-day price trends and a built-in **Transport Cost & Profit Estimator**.

### 🌱 4. Soil & Fertilizer Calculator
- Smart dose planner that calculates N-P-K fertilizer requirements based on soil type, target crop, and growth stage.

### 💧 5. Smart Irrigation Planner
- Evapotranspiration ($ET_0$) based irrigation schedules using the Hargreaves method for drip, sprinkler, or flood irrigation.

### 🤖 6. Krishi Mitra AI Chatbot
- 24/7 AI-powered agricultural advisor.
- **Multilingual Support:** Handles queries in Hindi, English, Telugu, Tamil, Marathi, and Bengali.

### 🗺️ 7. Outbreak Heatmap & Community Forum
- **Privacy-safe Outbreak Map:** Aggregates real-time disease trends (~1km accuracy) to alert surrounding farmers.
- **Community Hub:** Farmers can post questions, share insights, upvote answers, and view peer recommendations.

### 💳 8. Government Schemes & Financial Support
- **PMFBY Insurance Guide:** Eligibility checker, premium calculator, and claim guide.
- **Kisan Credit Card (KCC):** Step-by-step application guidance and financial advisory.

---

## 🛠️ Tech Stack

- **Frontend:** Plain HTML5, CSS3, JavaScript (Zero-build step Progressive Web App / PWA), Tailwind CSS / Bootstrap, Three.js
- **AI/ML Model:** TensorFlow / Keras
- **Database:** SQLite / PostgreSQL 
- **APIs:** Open-Meteo API (Weather), Data.gov.in API (Mandi Rates)
- **Deployment:** Netlify

---

## 📂 Repository Structure

```text
KrishiRakshak/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI Server
│   │   ├── models/              # Deep Learning Models
│   │   └── routes/              # API Endpoints (/predict, /mandi, /weather)
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Backend Docker config
├── frontend/
│   ├── index.html               # Main Web Interface
│   ├── js/                      # App Scripts & Service Worker
│   └── css/                     # Styling
├── best_model.keras             # Trained Model Weights
├── docker-compose.yml           # Multi-container Setup
└── README.md                    # Project Documentation
⚙️ Local Setup & InstallationFollow these simple steps to run KrishiRakshak locally:PrerequisitesPython 3.11 or higherGit installed on your system1. Clone the RepositoryBashgit clone [https://github.com/awasthi-1425/KrishiRakshak.git](https://github.com/awasthi-1425/KrishiRakshak.git)
cd Krishi-Rakshak
2. Set Up Environment VariablesCreate a .env file in the root directory:Code snippetANTHROPIC_API_KEY=your_anthropic_api_key_here
DATAGOV_KEY=your_data_gov_in_api_key_here
3. Backend SetupBashcd backend
python -m venv venv
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate



📸 Screenshots & WorkflowAI Disease DiagnosisLive Mandi Rates Krishi Sakhi Chatbot(Add Image Link)(Add Image Link)(Add Image Link)🤝 ContributingContributions are always welcome!Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📝 LicenseDistributed under the MIT License. See LICENSE for more information.💬 Acknowledgements & ImpactBuilt with ❤️ to support Indian Farmers. Designed to work efficiently even on low-bandwidth 2G/3G networks and accessible via lightweight PWA architecture.
