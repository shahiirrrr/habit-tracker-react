# HabitDaily 🎯

A beautiful, production-ready Habit Tracker web application with **Firebase Authentication** and **Cloud Sync**. Track your daily habits, build streaks, and maintain consistency—across all your devices!

## ✨ Features

### 🔐 Authentication & Sync
- **Firebase Authentication**: Secure user accounts with Email/Password and Google Sign-In
- **Cloud Sync**: Your habits automatically sync across all devices
- **Guest Mode**: Try the app instantly without creating an account (uses localStorage)
- **Account Management**: Profile settings, logout, and secure account deletion
- **Welcome Screen**: Beautiful 3-step onboarding for new users

### Core Features
- **Modern UI Design**: Clean, sleek interface with glass-morphism effects and smooth animations
- **Dark/Light Theme**: Toggle between light and dark modes with persistent theme preference
- **Habit Management**: 
  - Add new habits with custom names
  - **Choose emoji icons** (16 options) 🎯 💪 📚 🏃 💧 and more!
  - **Pick custom colors** (6 vibrant color options)
  - Mark habits as complete for the day
  - Delete habits with beautiful confirmation modal
  - Personalized habit cards with emoji and color

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
  - Emoji icons and custom colors for each habit
  - Color-coded cards with gradient borders
  - Visual progress indicators with animations
  - Week calendar view with hover effects
  - Comprehensive statistics display
- **Custom Modals**: Beautiful, animated dialogs for all interactions
- **Data Persistence**: 
  - **Firebase Firestore** for authenticated users (cloud sync)
  - **LocalStorage** for guest users (local only)
  - Automatic migration when signing up from guest mode
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Confetti Celebrations**: Fun animations when completing habits

## 🛠️ Technologies

### Frontend
- **React 18** - Modern React with hooks and Context API
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Firebase Authentication** - Secure user authentication
  - Email/Password authentication
  - Google OAuth sign-in
- **Firebase Firestore** - Cloud NoSQL database
  - Real-time data synchronization
  - User-specific data security rules
- **LocalStorage API** - Client-side storage for guest mode

## 📁 Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── HabitCard.jsx           # Habit card with emoji, stats & animations
│   │   ├── AddHabitModal.jsx       # Modal with emoji & color picker
│   │   ├── ConfirmationModal.jsx   # Beautiful confirmation dialog
│   │   ├── StatsDashboard.jsx      # Statistics overview dashboard
│   │   ├── MotivationalGreeting.jsx # Dynamic motivational messages
│   │   ├── Login.jsx               # Login page with email & Google
│   │   ├── Signup.jsx              # Signup page with validation
│   │   ├── WelcomeScreen.jsx       # 3-step onboarding flow
│   │   ├── GuestWarningBanner.jsx  # Guest mode warning banner
│   │   ├── SettingsMenu.jsx        # User settings dropdown
│   │   ├── Confetti.jsx            # Celebration animations
│   │   └── Doodles.jsx             # Decorative SVG elements
│   ├── pages/
│   │   ├── Home.jsx                # Main habit tracking page
│   │   └── AuthPage.jsx            # Authentication router
│   ├── contexts/
│   │   └── AuthContext.jsx         # Firebase auth state management
│   ├── hooks/
│   │   ├── useLocalStorage.js      # LocalStorage hook for guests
│   │   └── useFirebaseHabits.js    # Firebase Firestore hook
│   ├── config/
│   │   └── firebase.js             # Firebase configuration
│   ├── App.jsx                     # Root app with routing logic
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind
├── .env                            # Firebase credentials (not in git)
├── .env.example                    # Environment variable template
├── index.html                      # HTML template
├── package.json                    # Dependencies (includes firebase)
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── README.md                       # This file

Documentation files:
├── BEGINNER_FIREBASE_GUIDE.md      # Complete Firebase setup guide
├── AUTH_SETUP_GUIDE.md             # Authentication configuration
├── GUEST_MODE_GUIDE.md             # Guest mode documentation
└── DELETE_ACCOUNT_GUIDE.md         # Account deletion guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier available)

### Quick Start (Guest Mode)

Try the app immediately without setup:
```bash
npm install
npm run dev
```
Open `http://localhost:5173` and click **"Continue as Guest"**

### Full Setup (With Authentication & Cloud Sync)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase:**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - See `BEGINNER_FIREBASE_GUIDE.md` for detailed instructions

3. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Firebase credentials
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123:web:abc123
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

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

### First Time Setup
1. **Welcome Screen**: See a beautiful 3-step onboarding with feature overview
2. **Choose Your Mode**:
   - **Continue as Guest**: Start immediately, data saved locally
   - **Create Account**: Sign up for cloud sync across devices

### For Authenticated Users
1. **Sign Up/Login**: 
   - Use email and password
   - Or sign in with Google (fastest!)
2. **Your Data Syncs**: Habits automatically sync across all your devices
3. **Account Settings**: Click the ⚙️ icon to access profile, logout, or delete account

### For Guest Users
1. **Start Immediately**: No signup required
2. **Guest Warning Banner**: Reminds you that data is local only
3. **Upgrade Anytime**: Click "Sign Up" to migrate to cloud sync

### Managing Habits
1. **Add a Habit**: 
   - Click the "+ Add Habit" button
   - Enter a habit name
   - **Choose an emoji** 🎯 💪 📚 (16 options!)
   - **Pick a color** (6 vibrant colors)
   - Click "Add Habit"
2. **Mark Complete**: Click "Mark Complete" on any habit card to log today's completion
3. **View Progress**: 
   - See your streak count with the flame icon 🔥
   - Check completion percentage with animated progress bar
   - View your week progress in the mini calendar
   - Emoji appears in top right of each card
4. **Track Statistics**: View overall stats in the dashboard (total habits, today's progress, total completions, longest streak)
5. **Toggle Theme**: Use the sun/moon icon to switch between light and dark modes
6. **Delete Habit**: Click "Delete" button—confirmation modal prevents accidents
7. **Celebrate**: Confetti animations when you complete habits! 🎉

### Understanding Your Data
- **Streak**: Consecutive days you've completed the habit (must include today)
- **Completion Rate**: Percentage of days completed since creating the habit
- **Week Calendar**: Visual representation of the last 7 days (today is highlighted)
- **Total Days**: Total number of days you've completed this habit

## 🎨 Design Features

### Visual Design
- **Glass-morphism**: Translucent cards with backdrop blur effects
- **Emoji Icons**: 16 emojis to personalize your habits (🎯 💪 📚 🏃 💧 🧘 🎨 ✍️ 🎵 🌱 ⭐ 🔥 💡 🚀 ❤️ 🍎)
- **Color Picker**: 6 vibrant colors to choose from (blue, green, purple, orange, pink, indigo)
- **Animated Emojis**: Entrance and hover animations for habit emojis
- **3-Color Gradients**: Beautiful blue → purple → pink gradients throughout
- **Animated Backgrounds**: Floating gradient blobs on auth pages
- **Smooth Transitions**: All interactions have smooth, polished animations
- **Responsive Grid**: Habits displayed in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- **Custom Modals**: Beautiful, animated modals for all interactions
- **Progress Visualization**: Visual progress bars and calendar views with animations
- **Confetti Effects**: Celebration animations when completing habits

### User Experience
- **Onboarding Flow**: 3-step welcome screen with feature comparison
- **Dual Mode System**: Seamless guest and authenticated experiences
- **Motivational Messages**: Dynamic, context-aware messages based on your progress
- **Stats Dashboard**: Comprehensive overview with real-time updates
- **Interactive Elements**: Hover effects, lift animations, and smooth transitions
- **Focus States**: Icons change color on input focus
- **Loading States**: Animated spinners for async operations
- **Accessible**: Proper semantic HTML and ARIA labels
- **Theme Persistence**: Theme preference saved across sessions
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

### Version 2.0.0 - Major Update! 🎉

#### 🔐 Firebase Integration
- ✅ **Firebase Authentication**: Email/Password and Google Sign-In
- ✅ **Cloud Sync**: Real-time data synchronization with Firestore
- ✅ **Account Management**: Profile settings, logout, and secure account deletion
- ✅ **Guest Mode**: Try the app without creating an account
- ✅ **Welcome Screen**: Beautiful 3-step onboarding flow

#### 🎨 UI/UX Enhancements
- ✅ **Emoji Picker**: 16 emoji options to personalize habits
- ✅ **Color Picker**: 6 custom colors to choose from
- ✅ **Animated Emojis**: Entrance and hover effects
- ✅ **Enhanced Login/Signup**: Modern design with animated backgrounds
- ✅ **3-Color Gradients**: Blue → Purple → Pink throughout
- ✅ **Better Animations**: Lift effects, loading spinners, focus states
- ✅ **Comparison Cards**: Visual comparison between Guest and Auth modes

#### 🔧 Technical Improvements
- ✅ **Dual Storage System**: Firebase for auth users, localStorage for guests
- ✅ **Context API**: Global auth state management
- ✅ **Custom Hooks**: useFirebaseHabits and useLocalStorage
- ✅ **Version Migration**: Automatic localStorage version handling
- ✅ **Security Rules**: User-specific Firestore data protection
- ✅ **Environment Variables**: Secure Firebase configuration

#### 📚 Documentation
- ✅ **Beginner Guides**: Step-by-step Firebase setup
- ✅ **Authentication Guide**: Complete auth configuration
- ✅ **Guest Mode Guide**: Guest mode implementation details
- ✅ **Account Deletion Guide**: Secure account removal process

### Version 1.0.0
- Initial release with core habit tracking functionality
- Stats Dashboard with comprehensive overview
- Motivational Greeting with time-based messages
- Enhanced Habit Cards with progress bars
- Custom Confirmation Modals
- Dark/light theme support
- Streak tracking
- LocalStorage persistence
- Responsive design
- Smooth animations

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Add Environment Variables** (IMPORTANT!):
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add all 6 Firebase variables:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
   - Select: Production, Preview, and Development

4. **Configure Firebase**:
   - Add your Vercel domain to Firebase Console
   - Go to Authentication → Settings → Authorized domains
   - Add: `your-app.vercel.app`

5. **Deploy**: Vercel automatically deploys on push!

### Other Hosting Options

- **Netlify**: Connect repo, add env variables in Deploy settings
- **GitHub Pages**: Build locally, push `dist` folder
- **Cloudflare Pages**: Connect repo, add env variables
- **Firebase Hosting**: Use `firebase deploy` after building

### Important Notes

- ⚠️ **Never commit `.env` file to Git**
- ✅ Always add environment variables in hosting dashboard
- ✅ Add production domain to Firebase authorized domains
- ✅ Test authentication after deployment

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Backend by [Firebase](https://firebase.google.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

## 📖 Documentation

For detailed setup and usage instructions, see:
- [`BEGINNER_FIREBASE_GUIDE.md`](./BEGINNER_FIREBASE_GUIDE.md) - Complete Firebase setup
- [`AUTH_SETUP_GUIDE.md`](./AUTH_SETUP_GUIDE.md) - Authentication configuration
- [`GUEST_MODE_GUIDE.md`](./GUEST_MODE_GUIDE.md) - Guest mode implementation
- [`DELETE_ACCOUNT_GUIDE.md`](./DELETE_ACCOUNT_GUIDE.md) - Account deletion process

## 🐛 Troubleshooting

### Authentication not working in production?
- Add your Vercel domain to Firebase Console → Authentication → Settings → Authorized domains

### Environment variables not loading?
- Ensure all variables start with `VITE_` prefix
- Check they're added in Vercel Dashboard (not just in code)
- Redeploy after adding variables

### Guest mode data lost?
- Guest data is stored in browser localStorage only
- Sign up to migrate to cloud sync

### More help?
- See documentation files above
- Check console for detailed error messages

---

Made with ❤️ for building better habits

**Start tracking your habits today!** 🚀

