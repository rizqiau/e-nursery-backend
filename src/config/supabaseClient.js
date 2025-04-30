const { createClient } = require("@supabase/supabase-js");

// Ganti dengan data kamu
const SUPABASE_URL = "https://mkdgwhelfqcodgwktras.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZGd3aGVsZnFjb2Rnd2t0cmFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk4ODIxNiwiZXhwIjoyMDU5NTY0MjE2fQ.hs1PvKwKItsNGA0hds1hPeezFfTqR-08ovNpHM-UGCs";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
