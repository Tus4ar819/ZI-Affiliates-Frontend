# ZI Affiliates Mobile App

This is an Expo React Native app for ZI Affiliates.

## Features
- Login page with loading animation (ZI logo)
- Dashboard with:
  - Tiles: Total Leads, Hot, Warm, Cold
  - Bar graph for reach
  - Total projects
- Lead creation form with:
  - Name (required)
  - Phone (required, validated)
  - Email (required, validated)
  - Status (Hot, Cold, Warm)
  - Notes
  - Date
- Attractive UI/UX with linear gradient colors (#FF9500, #FF0000)
- Secure storage of JWT token and employeeId using expo-secure-store

## Tech Stack
- Expo (React Native)
- react-navigation
- react-native-paper
- lottie-react-native
- expo-linear-gradient
- victory-native or react-native-chart-kit
- expo-secure-store

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```

## Notes
- JWT token expires in 3 days (handled in app)
- App is online-only
- Uses ZI branding colors