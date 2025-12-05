# The Circle (Unified Youth Credit Score)

📌 Overview

The Circle is a web application that helps Kenyan youth access fair credit by combining their financial data from M‑Pesa, banks, SACCOs, and digital lenders into one unified credit score. Users can connect financial institutions or upload statements, which the system processes using Google Cloud services to generate a clear, accurate score.

This empowers young people to access loans with confidence while giving lenders a complete view of a customer’s financial behavior.

🚀 Key Features

- Unified Credit Score: Combines data from M‑Pesa, banks, SACCOs, and digital lenders.
- Institution Connections: Users can add and manage all their financial accounts.
- Statement Upload: Accepts M‑Pesa statements (PDF/CSV) using OCR processing.
- Real‑time Transaction Logging: New activities across institutions update the user’s score.
- Insights Dashboard: Shows spending habits, income patterns, and score improvement tips.
- Secure Login/Signup: Youth‑friendly, fast sign-in experience via phone/email.
- Google Cloud Powered: OCR, ML scoring, pipelines, and secure data storage.

🛠️ Tech Stack

Frontend
- HTML / CSS / JavaScript
- React / Next.js (optional)
- Modern sleek UI for youth users

Backend
- Google Cloud Run (API service)
- Firebase Authentication (user login)
- Cloud Functions / PubSub for data pipeline
- Cloud Storage for statement uploads

Machine Learning
- BigQuery ML for credit scoring
- Vertex AI (optional)

OCR + Data Parsing
- Google Cloud Vision API
- Python/Node.js parsers for PDFs & CSVs

📂 Project Structure

/circle-app
│
├── frontend/           # UI pages and components
├── backend/            # APIs, parsing logic, scoring logic
├── cloud-functions/    # PubSub, Data processing
├── ml/                 # BigQuery ML models
└── README.md

⚙️ How It Works

1. User signs up on The Circle using email or phone.
2. User adds financial institutions or uploads an M‑Pesa statement.
3. The statement is processed with OCR and converted into clean transaction data.
4. All financial activity is aggregated across connected accounts.
5. Google Cloud ML models compute a Unified Credit Score.
6. The user sees their score, insights, and can share it with lenders.

🌐 Core Screens

- Login / Signup
- Add Institutions
- Upload M‑Pesa Statements
- Unified Credit Score Dashboard
- Transaction History
- Insights & Recommendations

🔒 Security

- Firebase Authentication
- Encrypted data storage
- User-authorized sharing only
- Google Cloud IAM and role-based access

📦 Installation (Local)

```bash
git clone https://github.com/your-repo/the-circle.git
cd the-circle
npm install
npm run dev
```

☁️ Deployment (Google Cloud)

Deploy Backend:

```bash
gcloud run deploy circle-backend \
  --source . \
  --region us-central1 \
  --platform managed
```

Deploy Functions:

```bash
gcloud functions deploy parseStatement \
  --trigger-topic=process-statement
```

🧪 Testing

```bash
npm test
```

👥 Team

- Oloo Brian
- Philip Cotmo
- Enoch Masese

📄 License

MIT License (or another license of your choice). Add a LICENSE file to the repository.

💬 Contact

For inquiries, collaboration, or feedback:

Team Circle – FinTech Hackathon

---

Notes
- This README replaces the earlier minimal Firebase Studio starter README with a project-focused overview for "The Circle". If you want to restore the original starter notes or keep both, I can merge them into a single README or split into docs/.
- Repository language composition: TypeScript 98.5% + Other 1.5%.