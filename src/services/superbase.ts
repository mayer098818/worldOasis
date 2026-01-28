
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lfvrvjnnobpkhjbgprup.supabase.co'
const supabaseKey = 'sb_publishable_xUZjt7B7i4q6-udwawza-A_Qb2b6MlU'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase