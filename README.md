# HabitDaily 🎯

A beautiful, production-ready Habit Tracker web application built with React and Tailwind CSS. Track your daily habits, build streaks, and maintain consistency in your routine.

## ✨ Features

- **Modern UI Design**: Clean, sleek interface with glass-morphism effects and smooth animations
- **Dark/Light Theme**: Toggle between light and dark modes with persistent theme preference
- **Habit Management**: 
  - Add new habits with custom names
  - Mark habits as complete for the day
  - Delete habits you no longer want to track
- **Streak Tracking**: Automatic streak counter that tracks consecutive days of completion
  - Streaks reset if a habit isn't completed on the current day
  - Visual flame icon indicator for active streaks
- **Local Storage**: All data persists in browser localStorage (no backend required)
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Zero Backend**: Fully client-side application, ready to deploy anywhere

## 🛠️ Technologies

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful icon library
- **LocalStorage API** - Client-side data persistence

## 📁 Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── HabitCard.jsx       # Individual habit card component
│   │   └── AddHabitModal.jsx   # Modal for adding new habits
│   ├── pages/
│   │   └── Home.jsx            # Main page component
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom hook for localStorage
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles and Tailwind imports
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Preview Production Build

```bash
npm run preview
```

## 📱 Usage

1. **Add a Habit**: Click the "Add New Habit" button and enter a habit name
2. **Mark Complete**: Click "Mark Complete" on any habit card to log completion for today
3. **Track Streaks**: View your current streak count displayed with a flame icon
4. **Toggle Theme**: Use the sun/moon icon in the navbar to switch between light and dark modes
5. **Delete Habit**: Click the "Delete" button to remove a habit (with confirmation)

## 🎨 Design Features

- **Glass-morphism**: Translucent cards with backdrop blur effects
- **Smooth Transitions**: All interactions have smooth, polished animations
- **Responsive Grid**: Habits displayed in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- **Accessible**: Proper semantic HTML and ARIA labels
- **Theme Persistence**: Theme preference saved in localStorage

## 🔄 How Streaks Work

- A streak counts consecutive days of habit completion
- The streak includes today if the habit is marked as complete
- If a habit is not completed today, the streak resets to 0
- Streaks are calculated based on the completion dates stored in localStorage

## 📸 Screenshots

_Add screenshots of your application here_

### Light Mode
![Light Mode Screenshot](./screenshots/light-mode.png)

### Dark Mode
![Dark Mode Screenshot](./screenshots/dark-mode.png)

### Mobile View
![Mobile View Screenshot](./screenshots/mobile-view.png)

## 🚢 Deployment

This application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy instantly
- **Netlify**: Drag and drop the `dist` folder or connect your repo
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Cloudflare Pages**: Connect your repo for automatic deployments

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ for building better habits

