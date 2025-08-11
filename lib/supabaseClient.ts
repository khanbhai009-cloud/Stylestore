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

// Types (same as before)
export interface Product {
  id: string;
  name: string;
  // ... (remaining types unchanged)
}