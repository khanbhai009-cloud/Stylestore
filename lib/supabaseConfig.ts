export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error("Missing Supabase env variables!");
}