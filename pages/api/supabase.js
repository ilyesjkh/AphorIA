import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jviaipxcbsuwpabbtemc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2aWFpcHhjYnN1d3BhYmJ0ZW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1NzI2MjksImV4cCI6MjAwMjE0ODYyOX0.RVLvcB3vbsO_W5H19IFTq6jqO_W63723-FNHKsjQ7HM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
