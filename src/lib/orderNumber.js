// 4-digit order number logic
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function getNextOrderNumber() {
  // Get the latest order number
  const { data, error } = await supabase
    .from('orders')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1);
  if (error) throw error;
  let next = 1;
  if (data && data.length > 0) {
    next = (data[0].order_number % 9999) + 1;
  }
  return next;
}
