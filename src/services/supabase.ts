import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types.ts";

export const supabaseUrl = "https://danikyifviurhveealoe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbmlreWlmdml1cmh2ZWVhbG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMDE3NDEsImV4cCI6MjAyMTU3Nzc0MX0.MDUlo1uZ0BWdbVBgMfYIqJ-B_emR6pbLlnZEKsb-qQw";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
