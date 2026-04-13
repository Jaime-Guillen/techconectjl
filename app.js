import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "techconectjl-6d47e.firebaseapp.com",
  projectId: "techconectjl-6d47e",
  storageBucket: "techconectjl-6d47e.firebasestorage.app",
  messagingSenderId: "567805054187",
  appId: "1:567805054187:web:36c924df39a1e47b9e82ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  await addDoc(collection(db, "test"), {
    mensaje: "funciona"
  });

  console.log("GUARDADO");
}

test();
