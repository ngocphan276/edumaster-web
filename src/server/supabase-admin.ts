import express from 'express';
import { createClient } from '@supabase/supabase-js';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export { supabaseAdmin };
