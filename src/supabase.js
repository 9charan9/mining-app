import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ptsqjebucjwnfipsbosu.supabase.co"
const supabaseKey = "sb_publishable_xVbAV84t_lO8BuT7IVOnbg_O9isj6mc"

export const supabase = createClient(supabaseUrl, supabaseKey)
