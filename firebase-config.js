
// PASTE YOUR FIREBASE CONFIGURATION HERE

// This is a placeholder configuration. To get your actual configuration, go to:
// 1. Your Firebase Project -> Project Settings (gear icon)
// 2. In the "Your apps" card, select your web app.
// 3. In the "SDK setup and configuration" section, select "Config".
// 4. Copy the entire `firebaseConfig` object and paste it below.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
