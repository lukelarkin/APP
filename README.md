# TARU - iOS App (Expo/React Native)

TARU is a mental health and self-discovery iOS app built with Expo/React Native. The app helps users explore their archetypes, practice Internal Family Systems (IFS), and access quick mental wellness tools.

## Features

- **5-Question Archetype Quiz**: Discover your primary archetype (Warrior/Sage/Lover/Seeker)
- **Archetype-Based Interventions**: 
  - Letters to your archetype
  - Journaling prompts
  - Ubuntu rituals
- **Daily IFS Check-In**:
  - Choose your active part
  - Track Self streaks
  - Earn tokens for consistency
- **Community Connection**: Connect with others on similar journeys
- **Quick Resets**:
  - Alternate nostril breathing
  - Physiologic sigh
  - EFT tapping guide
- **Dark Theme**: Easy on the eyes
- **Card-based UI**: Clean Figma-inspired layouts
- **Fast Flows**: All interactions designed to be ≤ 90 seconds

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)

### Installation

```bash
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Project Structure

```
src/
├── screens/        # Screen components
├── components/     # Reusable components
├── navigation/     # Navigation configuration
├── utils/          # Helper functions and utilities
├── types/          # TypeScript type definitions
└── data/           # Static data (questions, interventions, etc.)
```

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for app navigation
- **AsyncStorage** for local data persistence
- **Dark theme** with custom styling

## License

Private project
