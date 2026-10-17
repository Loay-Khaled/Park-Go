# Park & Go — Standalone Marketing & Client Pitch Website

Modern, responsive, single-page marketing website for **Park & Go**, a scalable smart parking management platform designed for malls, universities, hospitals, airports, business districts, and private garages.

Designed specifically for **client meetings, executive pitch presentations, and mobile QR-code scanning**.

---

## 🚀 Key Website Features

1. **Executive Hero Section**: Strong value proposition, key performance stats (-65% congestion, +32% yield, 99.4% accuracy), and an interactive mobile app frame simulating live parking reservations.
2. **Problem vs. Solution**: Highlights the reality of traffic bottlenecks, manual revenue leakages, and untracked parking vs. Park & Go's guaranteed digital slots and automated billing.
3. **True-to-Code Key Features**: Directly reflects the real capabilities of the platform:
   - Live Zone & Slot Telemetry (multi-level, real-time occupancy)
   - Advance Guaranteed Reservations
   - Contactless QR Code Gate Entry & Exit (<800ms)
   - Automated Smart Waiting List Queue (5-min offer window)
   - Predictive Availability & Hourly Heatmaps
   - In-App Digital Wallet & Multi-Vehicle Plate Registration
   - Automated Overstay Tariff & Dispute Appeals
   - Facility Owner Operations & Analytics Portal
4. **Interactive Live Parking Simulator**: An interactive widget where facility managers can click between Zone A, B, and C, inspect spot status (Available, Reserved, Occupied, Accessible), simulate reservations, and generate dynamic QR gate passes.
5. **Interactive Facility ROI & Revenue Calculator**: Facility owners can drag sliders for capacity bays, hourly fee, and turnover to see their projected annual revenue uplift, hours saved, and CO2 emissions avoided.
6. **Scalable Across 6 Key Sectors**: Highlights tailored benefits for Shopping Malls, Universities, Hospitals, Airports, Corporate Towers, and Municipal Garages.
7. **Company Story & Pilot Validation**: Highlights the origin story (validated during an engineering campus pilot) and showcases mission, vision, and leadership.
8. **Editable Contact & Partnership Form**: Form with validation, success animation, plus easily customizable direct phone, email, and social channels.
9. **Instant QR Code Presentation Modal**: Includes an in-app button and modal to display a live QR code on laptops or projectors for attendees to scan on their smartphones during pitch meetings.
10. **Modern UI & Themes**: Dark mode default (ideal for presentations), light mode toggle, Google Fonts (Plus Jakarta Sans & Space Grotesk), zero external broken assets, responsive across mobile, tablet, and widescreen.

---

## 📁 File Structure

```
park-and-go-website/
├── index.html        # Complete single-page semantic HTML structure
├── styles.css        # Responsive styling, design tokens, light/dark themes
├── script.js         # Config, live simulator, ROI calculator, QR modal, form validation
├── favicon.svg       # Custom Park & Go SVG brand logo and favicon
├── vercel.json       # Vercel deployment configuration with security headers
└── README.md         # Deployment and pitch guide (this file)
```

---

## ⚡ How to Run Locally

You can test the website immediately using any local web server:

### Option 1: Python (Built-in)
```bash
cd "park-and-go-website"
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js (npx serve)
```bash
cd "park-and-go-website"
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to Vercel (100% Free & Fast)

### Method A: Deploy via Vercel CLI (Quickest)
1. Open PowerShell / Terminal:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the website folder:
   ```bash
   cd "c:\Users\Loay khaled\Desktop\mobile app final al final\park-and-go-website"
   ```
3. Run:
   ```bash
   vercel
   ```
4. Follow the interactive prompts:
   - *Set up and deploy?* `Y`
   - *Which scope?* (Select your account)
   - *Link to existing project?* `N`
   - *What's your project's name?* `park-and-go`
   - *In which directory is your code located?* `./`
5. To deploy to production with your permanent URL:
   ```bash
   vercel --prod
   ```
6. Vercel will give you a live URL like: `https://park-and-go.vercel.app`

---

### Method B: Deploy via GitHub (Recommended for Team Collaboration)
1. Initialize git inside `park-and-go-website`:
   ```bash
   cd "c:\Users\Loay khaled\Desktop\mobile app final al final\park-and-go-website"
   git init
   git add .
   git commit -m "Initial release of Park & Go marketing website"
   ```
2. Create a new GitHub repository (e.g. `park-and-go-website`) and push the code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/park-and-go-website.git
   git push -u origin main
   ```
3. Go to [https://vercel.com/new](https://vercel.com/new).
4. Click **"Import"** next to `park-and-go-website`.
5. Keep default settings (Framework Preset: **Other**) and click **Deploy**.
6. Every time you push changes to GitHub, Vercel updates the website automatically!

---

## 📱 How to Generate a QR Code for Your Meeting

### Using the Built-In Presentation Tool:
- The website has a built-in QR generator!
- While presenting on your laptop or projector, simply click the **QR Code icon** in the top-right navbar (or the link in the footer).
- A QR code modal appears displaying the URL so attendees can scan it directly with their smartphones.

### Generating a High-Resolution QR Code for Slides or Printed Cards:
Once your Vercel link is live (e.g. `https://park-and-go.vercel.app`):
1. Visit [QR Code Generator](https://www.qr-code-generator.com/) or [QR.io](https://qr.io/).
2. Paste your Vercel URL.
3. Download the PNG or SVG.
4. Insert it into your final presentation slide with the caption:
   > *"Scan to experience Park & Go on your phone."*

---

## ✏️ How to Edit Information in Seconds

All key company contact information is centralized in **`script.js`** inside the `CONFIG` object at lines 12–40:

```javascript
const CONFIG = {
  companyName: "Park & Go",
  tagline: "Smart Parking Infrastructure. Zero Congestion. Maximum Revenue.",
  
  contact: {
    email: "Loay_khaled6@yahoo.com",
    emailSecondary: "mmoamenn33@gmail.com",
    phone: "+201151507298",
    phoneSecondary: "+201554056525",
    whatsapp: "+201151507298",
    address: "Cairo, Egypt"
  },

  social: {
    linkedin: "https://linkedin.com/company/park-and-go",
    twitter: "https://twitter.com/parkandgo",
    github: "https://github.com/park-and-go",
    instagram: "https://instagram.com/parkandgo"
  }
};
```

To update team members, open **`index.html`** and edit the `<div class="team-card">` cards located inside the `#about-us` section (lines 485–570).

---

## 🛡️ License & Branding
© 2026 Park & Go. Built for modern urban mobility and intelligent facility management.
