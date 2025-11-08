# HabitDaily 🎯

A beautiful, production-ready Habit Tracker web application built with React and Tailwind CSS. Track your daily habits, build streaks, and maintain consistency in your routine.

## ✨ Features

### Core Features
- **Modern UI Design**: Clean, sleek interface with glass-morphism effects and smooth animations
- **Dark/Light Theme**: Toggle between light and dark modes with persistent theme preference
- **Habit Management**: 
  - Add new habits with custom names
  - Mark habits as complete for the day
  - Delete habits with beautiful confirmation modal (no browser alerts!)
  - Automatic color coding for each habit (6 vibrant colors)

### Statistics & Tracking
- **Stats Dashboard**: 
  - Total habits count
  - Today's completion progress with percentage
  - Total completions across all time
  - Longest streak across all habits
- **Streak Tracking**: Automatic streak counter that tracks consecutive days of completion
  - Streaks reset if a habit isn't completed on the current day
  - Visual flame icon indicator for active streaks
- **Progress Visualization**:
  - Progress bars showing completion percentage for each habit
  - Mini 7-day calendar showing completion history
  - Total days completed counter
  - Completion rate percentage

### User Experience
- **Motivational Greeting**: Time-based greetings with dynamic motivational messages based on your progress
- **Enhanced Habit Cards**: 
  - Color-coded cards with gradient borders
  - Visual progress indicators
  - Week calendar view
  - Comprehensive statistics display
- **Custom Confirmation Modal**: Beautiful, animated confirmation dialogs (replaces browser alerts)
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
│   │   ├── HabitCard.jsx           # Individual habit card with progress & stats
│   │   ├── AddHabitModal.jsx       # Modal for adding new habits
│   │   ├── ConfirmationModal.jsx   # Beautiful confirmation dialog
│   │   ├── StatsDashboard.jsx      # Statistics overview dashboard
│   │   └── MotivationalGreeting.jsx # Dynamic motivational messages
│   ├── pages/
│   │   └── Home.jsx                # Main page component
│   ├── hooks/
│   │   └── useLocalStorage.js      # Custom hook for localStorage
│   ├── App.jsx                     # Root app component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind imports
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # This file
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

### Getting Started
1. **Add a Habit**: Click the "Add New Habit" button and enter a habit name. Each habit gets a random color.
2. **Mark Complete**: Click "Mark Complete" on any habit card to log completion for today
3. **View Progress**: 
   - See your streak count with the flame icon
   - Check completion percentage with the progress bar
   - View your week progress in the mini calendar
4. **Track Statistics**: View your overall stats in the dashboard at the top (total habits, today's progress, total completions, longest streak)
5. **Toggle Theme**: Use the sun/moon icon in the navbar to switch between light and dark modes
6. **Delete Habit**: Click the "Delete" button to remove a habit. A beautiful confirmation modal will appear to prevent accidental deletions.

### Understanding Your Data
- **Streak**: Consecutive days you've completed the habit (must include today)
- **Completion Rate**: Percentage of days completed since creating the habit
- **Week Calendar**: Visual representation of the last 7 days (today is highlighted)
- **Total Days**: Total number of days you've completed this habit

## 🎨 Design Features

### Visual Design
- **Glass-morphism**: Translucent cards with backdrop blur effects
- **Color Coding**: 6 vibrant colors (blue, green, purple, orange, pink, indigo) for habit cards
- **Gradient Effects**: Beautiful gradients throughout the interface
- **Smooth Transitions**: All interactions have smooth, polished animations
- **Responsive Grid**: Habits displayed in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- **Custom Modals**: Beautiful, animated modals for adding habits and confirmations
- **Progress Visualization**: Visual progress bars and calendar views

### User Experience
- **Motivational Messages**: Dynamic, context-aware motivational messages based on your progress
- **Stats Dashboard**: Comprehensive overview of your habit tracking progress
- **Interactive Elements**: Hover effects, button animations, and smooth transitions
- **Accessible**: Proper semantic HTML and ARIA labels
- **Theme Persistence**: Theme preference saved in localStorage
- **No Browser Alerts**: All confirmations use beautiful custom modals

## 🔄 How Features Work

### Streaks
- A streak counts consecutive days of habit completion
- The streak includes today if the habit is marked as complete
- If a habit is not completed today, the streak resets to 0
- Streaks are calculated based on the completion dates stored in localStorage
- The longest streak across all habits is displayed in the stats dashboard

### Completion Rate
- Calculated as: (Total completed days / Days since creation) × 100
- Shows your consistency over time
- Updates automatically as you complete habits
- Displayed as a percentage on each habit card

### Progress Visualization
- **Progress Bar**: Shows completion percentage visually
- **Week Calendar**: Displays the last 7 days with completion status
- **Today Indicator**: Current day is highlighted with a ring in the calendar
- **Color Coding**: Each habit has a unique color for easy identification

### Stats Dashboard
- **Total Habits**: Number of habits you're currently tracking
- **Today's Progress**: How many habits you've completed today (X/Y format + percentage)
- **Total Completions**: Sum of all habit completions across all time
- **Longest Streak**: Your best streak across all habits

### Confirmation Modal
- Replaces browser alerts with beautiful custom modals
- Prevents accidental deletions with explicit confirmation
- Shows habit name in the confirmation message
- Cannot be dismissed by clicking outside (must use Cancel or Delete button)
- Animated with smooth transitions and spring effects

## 📸 Screenshots

_Add screenshots of your application here_

### Light Mode
![Light Mode Screenshot](./screenshots/light-mode.png)

### Dark Mode
![Dark Mode Screenshot](./screenshots/dark-mode.png)

### Mobile View
![Mobile View Screenshot](./screenshots/mobile-view.png)

### Stats Dashboard
![Stats Dashboard](./screenshots/stats-dashboard.png)

### Habit Cards
![Habit Cards](./screenshots/habit-cards.png)

### Confirmation Modal
![Confirmation Modal](./screenshots/confirmation-modal.png)

## 🆕 Recent Updates

### Enhanced Features
- ✅ **Stats Dashboard**: Added comprehensive statistics overview
- ✅ **Motivational Greeting**: Time-based greetings with dynamic messages
- ✅ **Enhanced Habit Cards**: Progress bars, mini calendar, color coding, and more stats
- ✅ **Custom Confirmation Modal**: Replaced browser alerts with beautiful animated modals
- ✅ **Color Coding**: Automatic color assignment for each habit (6 vibrant colors)
- ✅ **Progress Visualization**: Visual progress bars and 7-day calendar view
- ✅ **Improved UI**: Better spacing, gradients, and visual hierarchy

### Version 1.0.0
- Initial release with core habit tracking functionality
- Dark/light theme support
- Streak tracking
- LocalStorage persistence
- Responsive design
- Smooth animations

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

