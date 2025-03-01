# V2X Dashboard

Welcome to the **V2X Dashboard** repository! This project is built using **React Native** with **Expo** for mobile application development, and it leverages various libraries and tools to enhance functionality and development experience.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)

## About

**V2X Dashboard** is a mobile application designed to provide real time telemetry of your car in your tablet. It uses the latest technologies in the mobile development ecosystem to deliver a robust and engaging user experience.

## Features

- [Feature 1] (e.g., Geolocation support)
- [Feature 2] (e.g., Customizable toast notifications)
- [Feature 3] (e.g., Navigation with react-navigation)
- [Feature 4] (e.g., Splash screen configuration and transitions)
- And more!

## Tech Stack

**Languages and Frameworks:**
- **TypeScript** (v5.3.3) for type-safe development.
- **React** (v18.3.1) and **React Native** (v0.76.7).

**Libraries and Tools:**
- UI Frameworks: `nativewind`, `@gluestack-ui`.
- Navigation: `@react-navigation`.
- Animations: `lottie-react-native`, `react-native-reanimated`.
- Location Services: `expo-location`.
- Testing: `jest`, `jest-expo`.
- Utilities: `expo`, `expo-blur`, `zustand`, `date-fns`, `react-native-maps`.

**Build and Bundling:**
- `@babel/core` (v7.25.2) with `babel-plugin-module-resolver`.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js (v16 or later)
- npm (Package Manager)
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start --dev-client
   ```

### Running on a Device/Emulator

- **For iOS:** Open the QR code in the Expo Go app (need a Mac and Xcode for iOS simulator).
- **For Android:** Scan the QR code using the Expo Go app or use an Android emulator.

### Testing

Run the test suite with Jest:
```bash
npm test
```

## Folder Structure

```plaintext
├── assets/                 # Asset files (images, fonts, etc.)
├── components/             # Reusable React components
├── store/                  # Global state management setup 
├── utils/                  # Utility functions and helpers
├── hooks/                  # Custom React hooks
├── app                     # Main entry point of the app
└── package.json            # NPM package metadata
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Run the Expo development server.
- `npm run android`: Run the application on an Android emulator or physical device.
- `npm run ios`: Run the application on an iOS simulator or physical device.
- `npm test`: Run the test suite with Jest.
- `npm run build`: Build the production-ready version of the app.

