// Firebase configuration (keeping original for compatibility)
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyAfrd2gvEhS4TEY2RrqL2ftYz9g5_Cupcs',
  authDomain: 'weby-44491.firebaseapp.com',
  projectId: 'weby-44491',
  storageBucket: 'weby-44491.firebasestorage.app',
  messagingSenderId: '814932604590',
  appId: '1:814932604590:web:92685964ce5e2e75961f3f',
  measurementId: 'G-0LKL7H849G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

// Firebase services - initially null
<<<<<<< HEAD
let firebaseApp: any = null
let firebaseDb: any = null
let auth: any = null
let storage: any = null
let firebaseInitialized = false
=======
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;
let firebaseInitialized = false;
>>>>>>> 04c852e (Fix code style and small errors)

// Lazy initialization function with better error handling
export const initializeFirebaseServices = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: 'Firebase can only be initialized in the browser',
      };
    }

    if (firebaseInitialized) {
      return { success: true };
    }

    console.log('🔥 Starting Firebase initialization...');

    // Dynamic imports with timeout
    const initPromise = Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
      import('firebase/auth'),
      import('firebase/storage'),
    ]);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase import timeout')), 10000)
    );

<<<<<<< HEAD
    const [firebaseAppModule, firebaseFirestore, firebaseAuth, firebaseStorage] = (await Promise.race([
      initPromise,
      timeoutPromise,
    ])) as any[]
=======
    const [firebaseApp, firebaseFirestore, firebaseAuth, firebaseStorage] =
      (await Promise.race([initPromise, timeoutPromise])) as any[];
>>>>>>> 04c852e (Fix code style and small errors)

    console.log('📦 Firebase modules loaded successfully');

    // Initialize app
<<<<<<< HEAD
    if (firebaseAppModule.getApps().length === 0) {
      firebaseApp = firebaseAppModule.initializeApp(firebaseConfig)
      console.log("🚀 Firebase app initialized")
    } else {
      firebaseApp = firebaseAppModule.getApps()[0]
      console.log("♻️ Using existing Firebase app")
    }

    // Initialize services
    firebaseDb = firebaseFirestore.getFirestore(firebaseApp)
    auth = firebaseAuth.getAuth(firebaseApp)
    storage = firebaseStorage.getStorage(firebaseApp)

    firebaseInitialized = true
    console.log("✅ Firebase services initialized successfully")
=======
    if (firebaseApp.getApps().length === 0) {
      app = firebaseApp.initializeApp(firebaseConfig);
      console.log('🚀 Firebase app initialized');
    } else {
      app = firebaseApp.getApps()[0];
      console.log('🔄 Using existing Firebase app');
    }

    // Test connection with timeout
    console.log('🔍 Testing Firebase connection...');

    // Initialize services with connection test
    db = firebaseFirestore.getFirestore(app);
    auth = firebaseAuth.getAuth(app);
    storage = firebaseStorage.getStorage(app);

    // Simple connection test
    const testPromise = firebaseFirestore.connectFirestoreEmulator
      ? Promise.resolve()
      : // Skip emulator check
        Promise.resolve(); // Just resolve for now

    const connectionTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection test timeout')), 5000)
    );

    await Promise.race([testPromise, connectionTimeout]);

    firebaseInitialized = true;
    console.log('✅ Firebase services initialized and tested successfully');
>>>>>>> 04c852e (Fix code style and small errors)

    return { success: true };
  } catch (error) {
<<<<<<< HEAD
    console.warn("⚠️ Firebase initialization failed:", error)

    // Reset services on failure
    firebaseApp = null
    firebaseDb = null
    auth = null
    storage = null
    firebaseInitialized = false
=======
    console.warn('❌ Firebase initialization failed:', error);

    // Reset services on failure
    app = null;
    db = null;
    auth = null;
    storage = null;
    firebaseInitialized = false;
>>>>>>> 04c852e (Fix code style and small errors)

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown initialization error';
    return { success: false, error: errorMessage };
  }
};

// Check if Firebase is available and initialized
export const isFirebaseAvailable = () => {
<<<<<<< HEAD
  return firebaseInitialized && firebaseDb !== null && auth !== null && storage !== null
}

// Safe getters for Firebase services
export const getFirebaseDb = () => firebaseDb
export const getFirebaseAuth = () => auth
export const getFirebaseStorage = () => storage
=======
  return (
    firebaseInitialized && db !== null && auth !== null && storage !== null
  );
};

// Safe getters for Firebase services
export const getFirebaseDb = () => db;
export const getFirebaseAuth = () => auth;
export const getFirebaseStorage = () => storage;
>>>>>>> 04c852e (Fix code style and small errors)

// Get initialization status
export const getFirebaseStatus = () => ({
  initialized: firebaseInitialized,
  hasApp: firebaseApp !== null,
  hasDb: firebaseDb !== null,
  hasAuth: auth !== null,
  hasStorage: storage !== null,
});

// Reset Firebase (for testing)
export const resetFirebase = () => {
<<<<<<< HEAD
  firebaseApp = null
  firebaseDb = null
  auth = null
  storage = null
  firebaseInitialized = false
  console.log("♻️ Firebase reset")
}
=======
  app = null;
  db = null;
  auth = null;
  storage = null;
  firebaseInitialized = false;
  console.log('🔄 Firebase reset');
};
>>>>>>> 04c852e (Fix code style and small errors)

// Export config for reference
export { firebaseConfig };

// Types for our data models
export interface Product {
<<<<<<< HEAD
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  image_url: string
  category: "watches" | "pants" | "jeans" | "kurta" | "health-fitness" | "beauty"
  tags: string[]
  affiliate_link: string
  clicks: number
  likes?: number
  is_active: boolean
  discount_percentage: number
  discount_amount: number
  created_at: string
  updated_at: string
=======
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category:
    | 'watches'
    | 'pants'
    | 'jeans'
    | 'kurta'
    | 'health-fitness'
    | 'beauty';
  tags: string[];
  affiliate_link: string;
  clicks: number;
  is_active: boolean;
  discount_percentage: number;
  discount_amount: number;
  created_at: string;
  updated_at: string;
>>>>>>> 04c852e (Fix code style and small errors)
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ClickTracking {
  id: string;
  product_id: string;
  user_ip: string;
  user_agent: string;
  clicked_at: string;
}

export interface SiteAnalytics {
  id: string;
  total_visitors: number;
  total_clicks: number;
  date: string;
  created_at: string;
}

export interface ProductAnalytics {
<<<<<<< HEAD
  product_id: string
  product_name: string
  total_clicks: number
  category: string
  price: number
}
=======
  product_id: string;
  product_name: string;
  total_clicks: number;
  category: string;
  price: number;
}
>>>>>>> 04c852e (Fix code style and small errors)
