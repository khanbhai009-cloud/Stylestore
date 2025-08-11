import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabaseConfig";

// 1. Main Client (Server + Browser compatible)
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

// 2. Lazy Initialization (Browser-only)
let supabaseClient: SupabaseClient | null = null;
let supabaseInitialized = false;

export const initializeSupabaseServices = async () => {
  if (typeof window === "undefined") {
    return { 
      success: false, 
      error: "Browser mein hi Supabase initialize ho sakta hai" 
    };
  }

  if (supabaseInitialized) return { success: true };

  try {
    console.log("🚀 Supabase shuru kar rahe hain...");
    supabaseClient = createClient(supabaseConfig.url, supabaseConfig.anonKey);
    
    // Connection test (5 second timeout)
    await Promise.race([
      supabaseClient.from("products").select("*").limit(1),
      new Promise((_, reject) => 
        setTimeout(() => reject("Connection timeout"), 5000)
      )
    ]);

    supabaseInitialized = true;
    console.log("✅ Supabase taiyar hai!");
    return { success: true };
  } catch (error) {
    console.error("❌ Supabase startup fail:", error);
    supabaseClient = null;
    supabaseInitialized = false;
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Pata nahi error kya hai" 
    };
  }
};

// Helper Functions
export const isSupabaseAvailable = () => supabaseInitialized && !!supabaseClient;
export const getSupabaseClient = () => supabaseClient;
export const resetSupabase = () => {
  supabaseClient = null;
  supabaseInitialized = false;
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
