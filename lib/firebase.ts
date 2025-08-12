// lib/firebase.ts
import { initializeApp as _initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import type { FirebaseStorage } from "firebase/storage";

// Firebase config (keep your keys)
const firebaseConfig = {
  apiKey: "AIzaSyAfrd2gvEhS4TEY2RrqL2ftYz9g5_Cupcs",
  authDomain: "weby-44491.firebaseapp.com",
  projectId: "weby-44491",
  storageBucket: "weby-44491.firebasestorage.app",
  messagingSenderId: "814932604590",
  appId: "1:814932604590:web:92685964ce5e2e75961f3f",
  measurementId: "G-0LKL7H849G",
};

// Firebase services - initially null (use let so we can assign later)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;
let firebaseInitialized = false;

// Lazy initialization function with better error handling
export const initializeFirebaseServices = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "Firebase can only be initialized in the browser" };
    }

    if (firebaseInitialized) {
      return { success: true };
    }

    // Dynamic imports with timeout
    const initPromise = Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
      import("firebase/auth"),
      import("firebase/storage"),
    ]);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firebase import timeout")), 10000),
    );

    const [firebaseAppModule, firebaseFirestoreModule, firebaseAuthModule, firebaseStorageModule] =
      (await Promise.race([initPromise, timeoutPromise])) as any[];

    // initialize app (use getApps to avoid multiple initializations)
    if (firebaseAppModule.getApps().length === 0) {
      app = firebaseAppModule.initializeApp(firebaseConfig);
    } else {
      app = firebaseAppModule.getApps()[0];
    }

    // Initialize service instances
    db = firebaseFirestoreModule.getFirestore(app);
    auth = firebaseAuthModule.getAuth(app);
    storage = firebaseStorageModule.getStorage(app);

    firebaseInitialized = true;
    return { success: true };
  } catch (error: any) {
    console.warn("Firebase initialization failed:", error);

    // Reset services on failure
    app = null;
    db = null;
    auth = null;
    storage = null;
    firebaseInitialized = false;

    const errorMessage = error instanceof Error ? error.message : "Unknown initialization error";
    return { success: false, error: errorMessage };
  }
};

// Check if Firebase is available and initialized
export const isFirebaseAvailable = () => {
  return firebaseInitialized && db !== null && auth !== null && storage !== null;
};

// Safe getters for Firebase services
export const getFirebaseDb = () => db;
export const getFirebaseAuth = () => auth;
export const getFirebaseStorage = () => storage;

// Get initialization status
export const getFirebaseStatus = () => ({
  initialized: firebaseInitialized,
  hasApp: app !== null,
  hasDb: db !== null,
  hasAuth: auth !== null,
  hasStorage: storage !== null,
});

// Reset Firebase (for testing)
export const resetFirebase = () => {
  app = null;
  db = null;
  auth = null;
  storage = null;
  firebaseInitialized = false;
  console.log("Firebase reset");
};

// Export config for reference
export { firebaseConfig };

// -----------------
// Keep your types below (unchanged)
// -----------------
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: "watches" | "pants" | "jeans" | "kurta" | "health-fitness" | "beauty";
  tags: string[];
  affiliate_link: string;
  clicks: number;
  is_active: boolean;
  discount_percentage: number;
  discount_amount: number;
  created_at: string;
  updated_at: string;
}

// ... keep the rest of your interfaces as they were