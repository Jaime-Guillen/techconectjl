import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfnDZYioRYEj6R9p0MEvEzMTRGkVFObKo", 
  authDomain: "techconectjl-6d47e.firebaseapp.com",
  projectId: "techconectjl-6d47e",
  storageBucket: "techconectjl-6d47e.firebasestorage.app",
  messagingSenderId: "567805054187",
  appId: "1:567805054187:web:36c924df39a1e47b9e82ae"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- NUEVO: Variable para el contador visual ---
let contadorLocal = 0;

// Esta función es la que "atrapa" el clic del botón
window.añadirAlCarrito = async (nombre, precio) => {
    try {
        console.log(`Guardando en Firebase: ${nombre} - ${precio}€`);

        // 1. Guardar en la base de datos
        const docRef = await addDoc(collection(db, "carrito"), {
            producto: nombre,
            precio: precio,
            fecha: serverTimestamp() 
        });

        console.log("Documento guardado con ID: ", docRef.id);

        // --- 2. NUEVO: Actualizar el contador del carrito en el HTML ---
        contadorLocal++;
        const elementoContador = document.getElementById('contador-carrito');
        if (elementoContador) {
            elementoContador.innerText = contadorLocal;
        }

        alert(`¡${nombre} añadido al carrito!`);

    } catch (error) {
        console.error("Error al añadir al carrito: ", error);
        alert("Error de conexión. Revisa la consola (F12).");
    }
};