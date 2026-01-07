import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pfezzjooguixoyawuzhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZXp6am9vZ3VpeG95YXd1emhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDQ5MjMsImV4cCI6MjA4MzIyMDkyM30.g6uJdiwWYTqNrplu4_gqc4_cVCIN2KdvgT0zzBQYu_Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);