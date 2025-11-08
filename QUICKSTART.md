# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will be available at `http://localhost:5173` (or the port shown in your terminal)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Features Overview

- ✅ Add habits with custom names
- ✅ Mark habits as complete for today
- ✅ Automatic streak tracking (consecutive days)
- ✅ Light/Dark theme toggle
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations with Framer Motion
- ✅ Data persisted in localStorage

## Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── HabitCard.jsx
│   │   └── AddHabitModal.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

Enjoy building better habits! 🎯

