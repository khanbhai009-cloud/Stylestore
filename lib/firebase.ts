// Supabase configuration
const supabaseConfig = {
  url: "https://mmzwfdymdsqsxfbhuxtz.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tendmZHltZHNxc3hmYmh1eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTIwMzksImV4cCI6MjA3MDQ2ODAzOX0.ELZED7ojvvUtZgZTIdUmOaJ8vPE9v_Ox5GdBlXeEkuc",
}

// Supabase services - initially null
let supabaseClient: any = null
let supabaseInitialized = false

// Lazy initialization function with better error handling
export const initializeSupabaseServices = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "Supabase can only be initialized in the browser" }
    }

    if (supabaseInitialized) {
      return { success: true }
    }

    console.log("🔥 Starting Supabase initialization...")

    // Dynamic import with timeout
    const initPromise = import("@supabase/supabase-js")
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Supabase import timeout")), 10000),
    )

    const { createClient } = (await Promise.race([initPromise, timeoutPromise])) as any

    console.log("📦 Supabase module loaded successfully")

    // Initialize client
    supabaseClient = createClient(supabaseConfig.url, supabaseConfig.anonKey)
    console.log("🚀 Supabase client initialized")

    // Test connection with timeout
    console.log("🔍 Testing Supabase connection...")
    const testPromise = supabaseClient.from('products').select('*').limit(1)
    const connectionTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection test timeout")), 5000),
    )

    await Promise.race([testPromise, connectionTimeout])

    supabaseInitialized = true
    console.log("✅ Supabase services initialized and tested successfully")

    return { success: true }
  } catch (error) {
    console.warn("❌ Supabase initialization failed:", error)

    // Reset services on failure
    supabaseClient = null
    supabaseInitialized = false

    const errorMessage = error instanceof Error ? error.message : "Unknown initialization error"
    return { success: false, error: errorMessage }
  }
}

// Check if Supabase is available and initialized
export const isSupabaseAvailable = () => {
  return supabaseInitialized && supabaseClient !== null
}

// Safe getter for Supabase client
export const getSupabaseClient = () => supabaseClient

// Get initialization status
export const getSupabaseStatus = () => ({
  initialized: supabaseInitialized,
  hasClient: supabaseClient !== null,
})

// Reset Supabase (for testing)
export const resetSupabase = () => {
  supabaseClient = null
  supabaseInitialized = false
  console.log("🔄 Supabase reset")
}

// Export config for reference
export { supabaseConfig }

// Types for our data models (same as before)
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