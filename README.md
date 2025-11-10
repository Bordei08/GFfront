# 🐠 Golden Fish

This repository contains **only the front-end (mobile app)** of the **Golden Fish** project, built with [React Native](https://reactnative.dev) using [`@react-native-community/cli`](https://github.com/react-native-community/cli).  
The back-end and other components of the project are developed separately.  
Currently, this mobile app is tested and supported **only on Android devices**.

## Table of Contents
- [Getting Started](#getting-started)
- [Notes](#notes)
- [Screenshots](#screenshots)

---


## ⚙️ Getting Started

> **Note:** Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) for **React Native CLI (Android)** before running the app.

### Step 1: Clone the repository

```bash
git clone <repo-url>
cd GFfront
```

### Step 2: Install dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Start Metro

```bash
npm start
# or
yarn start
```

### Step 4: Build and run on Android

Open a new terminal (with Metro still running) and run:

```bash
npm run android
# or

yarn android
```

This will build and install the app on your connected Android device or emulator.

## 🧩 Notes

  * Tested only on Android (for now).
  * Make sure you have Android Studio and an emulator or a real device with USB debugging enabled.
  * If you see errors, try cleaning the build with:

```bash
  cd android && gradlew clean && cd ..
```

## 📸 Screenshots

<p align="center">
  <a href="https://github.com/user-attachments/assets/140027a6-75c7-4cf2-9432-869405363332">
    <img src="https://github.com/user-attachments/assets/140027a6-75c7-4cf2-9432-869405363332" width="230" alt="Golden Fish Screenshot 1" style="margin: 10px;"/>
  </a>
  <img src="https://github.com/user-attachments/assets/684d636e-c272-47e5-9cea-485538a59076" width="230" alt="Golden Fish Screenshot 2" style="margin: 10px;"/>
  <img src="https://github.com/user-attachments/assets/bde0b0a6-07e4-4577-9755-b8a084061998" width="230" alt="Golden Fish Screenshot 3" style="margin: 10px;"/>
  <img src="https://github.com/user-attachments/assets/e244d22d-b9cf-4139-ac9d-dcd65706c0f8" width="230" alt="Golden Fish Screenshot 4" style="margin: 10px;"/>
</p>

<p align="center">
  <em>Golden Fish mobile app — Android screenshots</em>
</p>

  
