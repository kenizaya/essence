import { createClient } from '@supabase/supabase-js'

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!privateKey) throw new Error(`Expected env var SUPABASE_SERVICE_ROLE_KEY`)

const url = process.env.SUPABASE_URL
if (!url) throw new Error(`Expected env var SUPABASE_URL`)

export const supabaseClient = createClient(url, privateKey)
