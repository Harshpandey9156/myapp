import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://viazkhowsyyeaybldyve.supabase.co',
  'sb_publishable_6JKjkfmAizsvFrWPyYmdWw_d65v_Pnj',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
