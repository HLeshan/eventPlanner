# Getting Started

## Step 1: Install dependencies

```bash
# using npm
npm install
```

### For iOS

```bash
cd ios && pod install
```

## Step 2: Run the Application

Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
npx react-native run-android
```

### For iOS

```bash
npx react-native run-ios
```

# When Releasing the application

set following variable to false to disable logs and to disable other debug conditions

```bash
# src/constants/index.tsx
export const isDEV_ = false;
```