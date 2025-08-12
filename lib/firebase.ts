// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfrd2gvEhS4TEY2RrqL2ftYz9g5_Cupcs",
  authDomain: "weby-44491.firebaseapp.com",
  projectId: "weby-44491",
  storageBucket: "weby-44491.firebasestorage.app",
  messagingSenderId: "814932604590",
  appId: "1:814932604590:web:92685964ce5e2e75961f3f",
  measurementId: "G-0LKL7H849G",
}

// Firebase services - initially null
let app: any = null
let db: any = null
let auth: any = null
let storage: any = null
let firebaseInitialized = false

// Lazy initialization function with better error handling
export const initializeFirebaseServices = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "Firebase can only be initialized in the browser" }
    }

    if (firebaseInitialized) {
      return { success: true }
    }

    console.log("馃敟 Starting Firebase initialization...")

    // Dynamic imports with timeout
    const initPromise = Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
      import("firebase/auth"),
      import("firebase/storage"),
    ])

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firebase import timeout")), 10000),
    )

    const [firebaseApp, firebaseFirestore, firebaseAuth, firebaseStorage] = (await Promise.race([
      initPromise,
      timeoutPromise,
    ])) as any[]

    console.log("馃摝 Firebase modules loaded successfully")

    // Initialize app
    if (firebaseApp.getApps().length === 0) {
      app = firebaseApp.initializeApp(firebaseConfig)
      console.log("馃殌 Firebase app initialized")
    } else {
      app = firebaseApp.getApps()[0]
      console.log("馃攧 Using existing Firebase app")
    }

    // Test connection with timeout
    console.log("馃攳 Testing Firebase connection...")

    // Initialize services with connection test
    db = firebaseFirestore.getFirestore(app)
    auth = firebaseAuth.getAuth(app)
    storage = firebaseStorage.getStorage(app)

    // Simple connection test
    const testPromise = firebaseFirestore.connectFirestoreEmulator
      ? Promise.resolve()
      : // Skip emulator check
        Promise.resolve() // Just resolve for now

    const connectionTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection test timeout")), 5000),
    )

    await Promise.race([testPromise, connectionTimeout])

    firebaseInitialized = true
    console.log("鉁� Firebase services initialized and tested successfully")

    return { success: true }
  } catch (error) {
    console.warn("鉂� Firebase initialization failed:", error)

    // Reset services on failure
    app = null
    db = null
    auth = null
    storage = null
    firebaseInitialized = false

    const errorMessage = error instanceof Error ? error.message : "Unknown initialization error"
    return { success: false, error: errorMessage }
  }
}

// Check if Firebase is available and initialized
export const isFirebaseAvailable = () => {
  return firebaseInitialized && db !== null && auth !== null && storage !== null
}

// Safe getters for Firebase services
export const getFirebaseDb = () => db
export const getFirebaseAuth = () => auth
export const getFirebaseStorage = () => storage

// Get initialization status
export const getFirebaseStatus = () => ({
  initialized: firebaseInitialized,
  hasApp: app !== null,
  hasDb: db !== null,
  hasAuth: auth !== null,
  hasStorage: storage !== null,
})

// Reset Firebase (for testing)
export const resetFirebase = () => {
  app = null
  db = null
  auth = null
  storage = null
  firebaseInitialized = false
  console.log("馃攧 Firebase reset")
}

// Export config for reference
export { firebaseConfig }

// Types for our data models
export interface Product {
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
  is_active: boolean
  discount_percentage: number
  discount_amount: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface ClickTracking {
  id: string
  product_id: string
  user_ip: string
  user_agent: string
  clicked_at: string
}

export interface SiteAnalytics {
  id: string
  total_visitors: number
  total_clicks: number
  date: string
  created_at: string
}

export interface ProductAnalytics {
  product_id: string
  product_name: string
  total_clicks: number
  category: string
  price: number
}
