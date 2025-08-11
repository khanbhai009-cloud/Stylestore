import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabaseConfig";

// ======================
// 1. CORE CLIENT (Universal)
// ======================
export const supabase = createClient(
  supabaseConfig.url, 
  supabaseConfig.anonKey,
  {
    auth: {
      persistSession: true, // Recommended for browser
      autoRefreshToken: true
    }
  }
);

// ======================
// 2. BROWSER-SPECIFIC CLIENT
// ======================
let browserClient: SupabaseClient | null = null;
let isBrowserInitialized = false;

export const initBrowserClient = async () => {
  // Early returns for SSR and re-initialization
  if (typeof window === "undefined") {
    return { 
      success: false, 
      error: "Browser features unavailable in SSR" 
    };
  }
  if (isBrowserInitialized) return { success: true };

  try {
    browserClient = createClient(
      supabaseConfig.url,
      supabaseConfig.anonKey,
      {
        auth: {
          persistSession: true,
          flowType: 'pkce' // More secure for browser
        }
      }
    );

    // Health check with timeout
    const { error } = await Promise.race([
      browserClient.from("products").select("*").limit(1),
      new Promise((_, reject) => 
        setTimeout(() => reject("Connection timeout"), 3000) // Reduced timeout
      )
    ]);

    if (error) throw error;

    isBrowserInitialized = true;
    return { success: true };
  } catch (error) {
    handleError(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Initialization failed"
    };
  }
};

// ======================
// HELPER FUNCTIONS
// ======================
const handleError = (error: unknown) => {
  console.error("Supabase Error:", error);
  browserClient = null;
  isBrowserInitialized = false;
};

export const getBrowserClient = (): SupabaseClient => {
  if (!browserClient) throw new Error("Browser client not initialized");
  return browserClient;
};

export const resetBrowserClient = () => {
  browserClient?.auth.signOut(); // Clear session
  browserClient = null;
  isBrowserInitialized = false;
};

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
