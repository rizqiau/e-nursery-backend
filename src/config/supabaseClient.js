const { createClient } = require("@supabase/supabase-js");

// Ganti dengan data kamu
const SUPABASE_URL = "https://mkdgwhelfqcodgwktras.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZGd3aGVsZnFjb2Rnd2t0cmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5ODgyMTYsImV4cCI6MjA1OTU2NDIxNn0.jGxE3rpGxIXJZCUXbzpLQKIcu4527j25IJ_pjrENiG4"; // anon key kamu

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
