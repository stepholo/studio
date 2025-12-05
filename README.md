# The Circle (Unified Youth Credit Score)

Overview

The Circle is a Next.js TypeScript web app that provides a unified view of a user's financial activity to help compute a clear credit score. This repository contains the frontend app, UI components, and Firebase configuration used to run and host the site.

This README has been scoped to reflect only what is implemented in this repository.

What is implemented in this repo
- Next.js (app directory) landing page and UI
  - See src/app/page.tsx — the landing page that redirects signed-in users to /dashboard
- Firebase Authentication integration (client hooks under src/firebase/)
- UI components and styling (TailwindCSS, components under src/components/)
- Firebase hosting / configuration and Firestore rules present in the repo

What is NOT implemented here
- Machine learning models (BigQuery ML / Vertex AI) are not part of this repo
- OCR or statement-parsing pipelines are not implemented in this codebase
- External data ingestion (M‑Pesa connectors, bank integrations) are not included

Quick links
- App entry / landing page: src/app/page.tsx
- Firebase auth utilities: src/firebase/auth/
- UI components: src/components/
- Tailwind config: tailwind.config.ts
- Next.js config: next.config.ts
- Firebase config / hosting metadata: .firebaserc, apphosting.yaml, firestore.rules

Key features (what the code currently implements)
- Landing page with hero and call-to-action (Get Started)
- Links to Log In and Sign Up pages (UI routing present)
- Client-side auth check that redirects authenticated users to /dashboard
- Responsive UI built with Tailwind CSS and Next.js Image optimization

Tech stack
- Next.js (TypeScript)
- React
- Tailwind CSS
- Firebase Authentication
- Firebase Hosting metadata included

Local development

```bash
git clone https://github.com/stepholo/studio.git
cd studio
npm install
npm run dev
# Visit http://localhost:3000
```

Recommended scripts
- npm run dev — development server
- npm run build — build for production
- npm run start — run the production build
- npm test — run tests (if tests are added)

Deployment (Firebase Hosting)
This repository contains Firebase hosting metadata. To deploy to Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

(Adjust commands to match your Firebase project and setup.)

Contributing
Contributions are welcome. If you plan to add new features (for example: statement ingestion, OCR parsing, ML models or external integrations), please open an issue describing the change before submitting a PR. Keep changes small and focused.

Team
- Philip Coutinho
- Stephen Oloo
- Reuben Ngeywo
- Rym Njuguna
- Enock Mases

License
- MIT (add a LICENSE file if you want to publish under this license)

Contact
Team Circle – FinTech Hackathon
