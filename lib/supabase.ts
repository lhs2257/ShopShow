import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: number
  title: string
  product_name: string | null
  thumbnail_url: string | null
  coupang_url: string | null
  my_youtube_url: string | null
  view_count: number
  is_visible: boolean
  synced_at: string
}
