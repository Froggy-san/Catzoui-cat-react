import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types.ts'

export const supabaseUrl = 'https://danikyifviurhveealoe.supabase.co'

const supabaseKey = import.meta.env.VITE_CATZOUI_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
