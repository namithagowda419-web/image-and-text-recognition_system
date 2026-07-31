# 🎨 Lumina AI - Luxury Soft Aesthetic Image & Text Recognition Platform

Lumina AI is a premium, modern AI-powered **Image & Text Recognition Platform** built from scratch. Designed with a luxury soft aesthetic inspired by Apple, Notion, Linear, Arc Browser, and Awwwards-winning web designs, Lumina combines browser-edge neural vision with precision document OCR and interactive visual analytics.

---

## ✨ Features & Capabilities

- **🎨 Luxury Soft Aesthetic Theme**:
  - Background: `#F9F7FC` (Pearl White)
  - Primary: `#BFA2DB` (Soft Lavender)
  - Secondary: `#E8DFF5` (Lilac Mist)
  - Accent: `#C7D2FE` (Soft Periwinkle)
  - Cards: `#FFFFFF` with glassmorphic accents & soft glow shadows
  - Typography: Satoshi / General Sans / Inter clean typography

- **🤖 Multi-Object AI Recognition**:
  - Real-time browser-edge inference using `@tensorflow/tfjs` & `@tensorflow-models/coco-ssd`
  - Interactive HTML5 canvas rendering bounding box overlays with pastel pill badges and confidence meters
  - Multi-class object classification (Laptop, Coffee Cup, Keyboard, Person, Car, Traffic Light, etc.)

- **📄 Precision OCR Text Extraction**:
  - WebAssembly powered OCR using `tesseract.js`
  - Formatted text display with editable textarea, term search/highlighting, character & word counters
  - Multi-format export: Copy to Clipboard, Export as `.txt`, Download styled `.pdf` report

- **📸 Live Webcam Snapshot System**:
  - Native media stream integration allowing users to snap photos directly from their camera and feed them into the neural engine.

- **📊 Comprehensive Dashboard & History Logs**:
  - Metric statistic cards (Images Processed, OCR Requests, Accuracy %, Storage Saved)
  - Interactive SVG usage trend charts & category doughnut breakdowns
  - Filterable & searchable history table with direct preview modals

- **👤 User Management & Profile**:
  - Auth modal supporting Login, Registration, and Password Reset
  - Profile manager with avatar presets, bio editing, password update, and API secret key generator

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (v19) + Vite
- **Styling**: Tailwind CSS (v4) with custom luxury soft theme tokens
- **Animations**: Framer Motion & CSS custom keyframes
- **Icons**: Lucide React
- **AI Libraries**: `@tensorflow/tfjs`, `@tensorflow-models/coco-ssd`, `tesseract.js`
- **PDF Export**: `jspdf`, `html2canvas`

### Backend
- **Runtime**: Node.js (v24+) & Express.js
- **Database**: MongoDB (Mongoose ORM) with built-in in-memory store for 100% offline local fallback
- **Auth & Upload**: JSON Web Tokens (`jsonwebtoken`), CORS, Multer

---

## 📁 Folder Structure

```
AI_Project4/
├── client/                      # React Vite Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── CameraModal.jsx
│   │   │   ├── BoundingBoxCanvas.jsx
│   │   │   └── AuthModal.jsx
│   │   ├── pages/              # Platform Pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── WorkspacePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── FeaturesPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── RecognitionContext.jsx
│   │   ├── utils/              # Helper engines & PDF exporter
│   │   │   ├── aiEngine.js
│   │   │   └── exportUtils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Soft luxury custom CSS
│   ├── vite.config.js
│   └── package.json
├── server/                      # Express REST API Backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── historyController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   └── History.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── historyRoutes.js
│   │   └── aiRoutes.js
│   ├── storage/
│   │   └── inMemoryDb.js
│   ├── index.js
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+) and npm

### 1. Client Setup
```bash
cd client
npm install
npm run dev
```
The client app will launch locally at `http://localhost:5173`.

### 2. Server Setup (Optional for API Backend)
```bash
cd server
npm install
npm start
```
The Express backend server will run on `http://localhost:5000`.

---

## 📄 License

Crafted for portfolio & production presentation. Distributed under the MIT License.
