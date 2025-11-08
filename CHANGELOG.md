# Changelog

All notable changes to HabitDaily will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-11-08

### Added

#### Authentication & Cloud Sync
- Firebase Authentication with Email/Password support
- Google OAuth sign-in integration
- User account management (profile, settings, logout)
- Secure account deletion with data cleanup
- Cloud synchronization with Firebase Firestore
- Real-time data sync across all devices
- User-specific Firestore security rules

#### Guest Mode
- Guest mode for instant app access without signup
- LocalStorage-based data persistence for guests
- Welcome screen with 3-step onboarding flow
- Feature comparison cards (Guest vs. Account)
- Guest warning banner with upgrade prompts
- Seamless migration from guest to authenticated account

#### Customization Features
- Emoji picker with 16 unique emoji options
- Color picker with 6 vibrant color choices
- Personalized habit cards with emoji and color
- Animated emoji display with entrance effects
- Hover effects on emojis (scale + rotate)

#### UI/UX Improvements
- Modern login page with animated backgrounds
- Enhanced signup page with validation
- 3-step welcome screen with feature showcase
- Settings dropdown menu in navbar
- Animated gradient backgrounds (floating blobs)
- 3-color button gradients (blue → purple → pink)
- Loading spinners for async operations
- Input focus effects (icon color changes)
- Lift animations on button hover
- Larger, more prominent logos (20x20)
- Comparison cards for user choices
- Feature badges on welcome screen
- Confetti celebrations when completing habits

#### Technical
- `AuthContext` for global authentication state
- `useFirebaseHabits` custom hook for Firestore operations
- `useLocalStorage` custom hook for guest mode
- Dual storage system (Firebase + localStorage)
- Environment variable configuration for Firebase
- Version-based localStorage migration
- Component reorganization (auth, habits, shared)
- Optimistic UI updates
- Comprehensive error handling
- Real-time Firestore listeners

#### Documentation
- `BEGINNER_FIREBASE_GUIDE.md` - Complete Firebase setup
- `AUTH_SETUP_GUIDE.md` - Authentication configuration
- `GUEST_MODE_GUIDE.md` - Guest mode documentation
- `DELETE_ACCOUNT_GUIDE.md` - Account deletion guide
- `RELEASE_NOTES_v2.0.0.md` - Detailed release notes
- Updated `README.md` with complete Firebase documentation
- Troubleshooting section in README
- Vercel deployment guide with Firebase configuration

### Changed

#### UI/UX
- Logout now redirects to welcome screen (not login page)
- Account deletion redirects to welcome screen
- Enhanced login/signup forms with better styling
- Improved button animations (lift + scale effects)
- Thicker borders (2px instead of 1px)
- Rounded corners (xl instead of lg)
- Better shadows and depth
- Larger text sizes for readability
- Enhanced color gradients throughout

#### Data Structure
- Added `emoji` field to habit objects
- Added `color` field to habit objects (now user-selectable)
- Habits stored in Firestore for authenticated users
- Habits stored in localStorage for guest users

#### Technical
- Migrated from localStorage-only to dual storage system
- Improved code organization and component structure
- Better error messages for authentication failures
- Enhanced form validation
- Optimized Firestore queries
- Better loading state management

### Fixed

#### Authentication
- Logout properly shows welcome screen with guest option
- Account deletion shows welcome screen with guest option
- Better error handling for unauthorized domains
- Improved error messages for auth failures

#### Data Persistence
- Fixed localStorage version conflicts
- Automatic migration for outdated data structures
- Preserved theme preference across updates
- Guest data properly saved and retrieved on page refresh

#### UI/UX
- Fixed modal backdrop click-to-close behavior
- Improved responsive design on mobile devices
- Fixed dark mode color inconsistencies
- Better error state handling and display
- Resolved animation glitches

### Breaking Changes

- **Firebase Required for Full Features**: Authentication and cloud sync require Firebase project setup
- **Environment Variables Required**: Must configure `.env` file with Firebase credentials
- **Data Structure Changed**: Habits now include `emoji` and `color` fields
- **Storage Method Changed**: Authenticated users now use Firestore instead of localStorage

### Migration Guide

#### For Existing Users
1. App will show welcome screen on first load after update
2. Choose "Continue as Guest" to keep using localStorage
3. Or "Create Account" to migrate to cloud sync
4. Existing localStorage habits preserved in guest mode
5. Can upgrade to cloud account anytime

#### For Developers
1. Pull latest changes: `git pull origin main`
2. Install dependencies: `npm install`
3. Set up Firebase project (see `BEGINNER_FIREBASE_GUIDE.md`)
4. Copy `.env.example` to `.env`
5. Add Firebase credentials to `.env`
6. Start dev server: `npm run dev`

#### For Deployment
1. Add Firebase environment variables to hosting provider
2. Add production domain to Firebase authorized domains
3. Deploy as usual

### Security

- Implemented Firestore security rules for user-specific data access
- Environment variables for secure Firebase configuration
- Input validation on all forms
- Secure account deletion with confirmation
- Protected routes based on authentication state

### Performance

- Optimized Firestore queries with proper indexing
- GPU-accelerated animations using transform
- Code splitting for better load times
- Memoization to reduce unnecessary re-renders
- Debounced input handlers

### Dependencies

#### Added
- `firebase@^10.x.x` - Firebase SDK for authentication and Firestore

#### No Breaking Changes
- All existing dependencies remain compatible

---

## [1.0.0] - 2024-10-01

### Added

#### Core Features
- Habit tracking with add, complete, and delete functionality
- Streak tracking for consecutive days
- Progress visualization with progress bars
- Mini 7-day calendar view
- Completion rate calculation
- Stats dashboard with comprehensive overview
- Motivational greetings based on time and progress
- Dark/light theme toggle
- LocalStorage data persistence
- Responsive design (mobile, tablet, desktop)

#### UI/UX
- Glass-morphism design with translucent cards
- Smooth animations with Framer Motion
- Custom confirmation modals (no browser alerts)
- Color-coded habit cards (6 colors, randomly assigned)
- Interactive hover effects
- Beautiful gradient effects
- Stats dashboard at top of page
- Motivational greeting component

#### Technical
- React 18 with hooks
- Vite for fast build and development
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- LocalStorage API for data persistence
- Custom `useLocalStorage` hook

### Components
- `Home.jsx` - Main page component
- `HabitCard.jsx` - Individual habit card
- `AddHabitModal.jsx` - Modal for adding habits
- `ConfirmationModal.jsx` - Confirmation dialog
- `StatsDashboard.jsx` - Statistics overview
- `MotivationalGreeting.jsx` - Dynamic greetings
- `Confetti.jsx` - Celebration effects
- `Doodles.jsx` - Decorative SVG elements

---

## [Unreleased]

### Planned for v2.1.0
- Email verification
- Password reset flow
- Advanced statistics and insights
- Habit scheduling and reminders
- Achievement badges
- Progress charts and graphs
- Multi-language support
- Push notifications (PWA)
- Mobile app (React Native)
- Social features (share progress)

### Under Consideration
- Habit categories
- Custom themes
- Export/import data
- Habit templates
- Team/family sharing
- API integrations

---

## Version History

- **v2.0.0** (2024-11-08) - Major update with Firebase integration, authentication, emoji/color picker
- **v1.0.0** (2024-10-01) - Initial release with core habit tracking features

---

[2.0.0]: https://github.com/yourusername/habit-tracker/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/yourusername/habit-tracker/releases/tag/v1.0.0
[Unreleased]: https://github.com/yourusername/habit-tracker/compare/v2.0.0...HEAD
