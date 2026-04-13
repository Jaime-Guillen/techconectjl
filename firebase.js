
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAfnDZYioRYEj6R9p0MEvEzMTRGkVFObKo",
  authDomain: "techconectjl-6d47e.firebaseapp.com",
  databaseURL: "https://techconectjl-6d47e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "techconectjl-6d47e",
  storageBucket: "techconectjl-6d47e.firebasestorage.app",
  messagingSenderId: "567805054187",
  appId: "1:567805054187:web:36c924df39a1e47b9e82ae",
  measurementId: "G-QLXG71XV4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };