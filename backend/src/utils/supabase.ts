import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import type { Database } from "../types/supabase-schema";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default supabase;
